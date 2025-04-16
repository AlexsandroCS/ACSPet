// react e react router dom.
import { useEffect } from "react";
import { Link, replace, useNavigate } from "react-router-dom";

// Logotype do site.
import logoType from "../../assets/imagens/Logo-AcsPet.png";

// Components complementares.
import { Container } from "../../components/container";
import { Input } from "../../components/input";

// Button Personalizado.
import { ButtonDefault } from "../../utils/buttons";

// Firebase.
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection"; 

// Import da validação de formulários.
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
    email: z.string().email("Insira um e-mail válido!").nonempty("O campo e-mail é obrigatório!"),
    password: z.string().nonempty("O campo de senha é obrigatório!")
});

type FormData = z.infer<typeof schema>

export function Login(){

    const navigate = useNavigate();

    const {register, handleSubmit, formState: { errors }} = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    });

    useEffect(() => {
        // Se usuário estiver logado e for para página de login, deslogue o usuário.
        async function handleLogout(){
            await signOut(auth);
        }

        handleLogout();
    },[]);

    function onSubmit(data: FormData){
        signInWithEmailAndPassword(auth, data.email, data.password).then((user) => {
            navigate("/painel-acspet", {replace: true})
        })
        .catch((error) => {
            console.log("Login ou Senha inválida!");
        })
    }

    return(
        <Container>
            <div className="flex flex-col w-full min-h-screen justify-center items-center gap-4">
                <Link to={"/"} className="mb-6 max-w-sm w-full">
                    <img className="w-full" src={logoType} alt="Logo do site" />
                </Link>

                <form className="bg-white max-w-xl w-full rounded-lg p-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <Input type={"text"} placeholder={"Digite seu e-mail"} name={"email"} error={errors.email?.message} register={register}/>
                    </div>
                    <div className="mb-3">
                        <Input type={"password"} placeholder={"Digite sua senha"} name={"password"} error={errors.password?.message} register={register}/>
                    </div>

                    <ButtonDefault title="Acessar"/>
                </form>

                <Link to={"/registrar"}>
                    Ainda não possui uma conta? Cadastre-se!
                </Link>
            </div>
        </Container>
    );
}