import { Link } from "react-router-dom";

// Import do ícones.
import { FiUser, FiLogIn } from "react-icons/fi";

// Logotype do site.
import logoType from "../../assets/imagens/Logo-AcsPet.png";

export function Header(){

    // Variáveis condicional de login ou dashboard.
    const signed =  false;
    const loadingAuth = false;

    return(
        <div className="w-full flex items-center justify-center h-30 bg-white drop-shadow mb-4">
            <header className="flex w-full max-w-7xl mx-auto px-4 justify-between">
                <Link to={"/"}>
                    <img className="h-30" src={logoType} alt="Logo do site ACSPet" />
                </Link>

                {/* Logado */}
                { !loadingAuth && signed && (
                    <Link to={"/painel-acspet"}>
                        <div className="flex h-30 justify-center items-center flex-col">
                            <div className="border-2 rounded-full p-1 border-[#65391d]">
                                <FiUser size={30} color="#65391d" />
                            </div>
                            <span>Painel</span>
                        </div>
                    </Link>
                )}
                
                {/* Deslogado */}
                { !loadingAuth && !signed && (
                    
                    <div className="flex h-30 justify-center items-center flex-col">
                        <div className="border-2 rounded-full p-1 border-[#65391d]">
                            <FiLogIn size={30} color="#65391d" />
                        </div>
                        <Link to={"/login"}>
                            <span className="text-[12px] hover:underline">Entrar</span>
                        </Link>
                        <Link to={"/registrar"}>
                            <span className="text-[12px] hover:underline">Cadastrar-se</span>
                        </Link>
                    </div>
                )}
            </header>
        </div>
    );
}