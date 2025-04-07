import { Link } from "react-router-dom";

// Logotype do site.
import logoType from "../../assets/imagens/Logo-gato.png";

// Components complementares.
import { Container } from "../../components/container";
import { Input } from "../../components/input";

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

    const {register, handleSubmit, formState: { errors }} = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    });

    function onSubmit(data: FormData){

    }

    return(
        <Container>
            <div className="flex flex-col w-full min-h-screen justify-center items-center gap-4">
                <Link to={"/"} className="mb-6 max-w-sm w-full">
                    <img className="w-full" src={logoType} alt="Logo do site" />
                </Link>

                <form className="bg-white max-w-xl w-full rounded-lg" onSubmit={handleSubmit(onSubmit)}>
                    <Input type={"text"} placeholder={"Digite seu e-mail"} name={"email"} error={errors.email?.message} register={register}/>
                    <Input type={"password"} placeholder={"Digite sua senha"} name={"password"} error={errors.password?.message} register={register}/>

                    <button>Acessar</button>
                </form>
            </div>
        </Container>
    );
}