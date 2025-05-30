// react e react router dom.
import { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

// Logotype do site.
import LogoType from "../../assets/imagens/Logo-AcsPet.png";

// Components complementares.
import { Container } from "../../components/container";
import { Input } from "../../components/input";

// Firebase.
import { auth } from "../../services/firebaseConnection";
import { createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth"; 

// Context modificando informações do usuário.
import { AuthContext } from "../../contexts/AuthContext";

// Validação de formulários.
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
    name: z.string().nonempty("Nome completo é um campo obrigatório!"),
    email: z.string().email("Insira um e-mail válido!").nonempty("O campo e-mail é obrigatório!"),
    password: z.string().nonempty("O campo de senha é obrigatório!").min(8,"A senha precisa ter mais de 8 digitos"),
});

type FormData = z.infer<typeof schema>

export function Register(){

    const navigate = useNavigate();

    const { handleInfoUser } = useContext(AuthContext);

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

    async function onSubmit(data: FormData){
        createUserWithEmailAndPassword(auth, data.email, data.password).then(async (user) => {
            await updateProfile(user.user, {
                displayName: data.name
            });

            // Atualizando usuários no context após o cadastro.
            handleInfoUser({
                uid: user.user.uid,
                name: data.name,
                email: data.email
            });

            navigate("/painel-acspet",{replace: true});
        })
        .catch(() => {
            console.log("Ocorreu um erro!");
        })
    }

    return(
        <Container>
            <div className="flex flex-col w-full min-h-screen justify-center items-center gap-4">
                <Link to={"/"}>
                    <img className="h-90" src={LogoType} alt="Logo do site"/>
                </Link>

                <form className="bg-white w-full max-w-xl roudned-lg p-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <Input type={"text"} placeholder={"Digite seu nome completo"} name={"name"} register={register} error={errors.name?.message}/>
                    </div>

                    <div className="mb-3">
                        <Input type={"text"} placeholder={"Digite um e-mail"} name={"email"} register={register} error={errors.email?.message}/>
                    </div>

                    <div className="mb-3">
                        <Input type={"password"} placeholder={"Digite uma senha"} name={"password"} register={register} error={errors.password?.message}/>
                    </div>

                    <button type="submit" className="w-full mt-3 text-center font-bold rounded uppercase text-xs p-2.5 cursor-pointer bg-[#f2d1ae] text-[#313131] hover:bg-[#785539] hover:text-[#fff] transition duration-300">Registrar</button>
                </form>

                <Link to={"/login"}>
                    Já possui uma conta? Faça login!
                </Link>
            </div>
        </Container>
    );
}