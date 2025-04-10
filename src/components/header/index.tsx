import { Link } from "react-router-dom";

// Import do ícones.
import { FiUser, FiShoppingCart } from "react-icons/fi";

// Logotype do site.
import logoType from "../../assets/imagens/Logo-AcsPet.png";

import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export function Header(){

    const {signed, loadingAuth} = useContext(AuthContext);

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
                            <div className="border-2 rounded-full p-1 border-[#785539]">
                                <FiUser size={30} color="#785539" />
                            </div>
                            <span>Painel</span>
                        </div>
                    </Link>
                )}
                
                {/* Deslogado */}
                { !loadingAuth && !signed && (
                    
                    <div className="flex gap-6">

                        <div className="flex h-30 justify-between items-center">
                            <div className="border-2 rounded-full p-1 border-[#785539]">
                                <FiUser size={30} color="#785539"/>
                            </div>

                            <div className="flex flex-col justify-center items-start ml-1.5">
                                <span className="text-[12px] text-[#000000] font-bold">
                                    <Link to={"/login"} className="text-[#785539] uppercase hover:underline mr-1">Entrar </Link>
                                    ou<br />
                                    <Link to={"/registrar"} className="text-[#785539] uppercase hover:underline">Cadastre-se</Link>
                                </span>
                            </div>
                        </div>

                        <div className="flex h-30 justify-center items-center">
                            <div className="flex flex-col justify-center items-center">
                                <Link to={"#"} className="relative">
                                    <FiShoppingCart size={30} color="#785539"/>
                                    <span className="absolute -right-2 -top-2 bg-[#ff0062] rounded-full w-6 h-6 flex items-center justify-center text-white font-bold text-[14px]">2</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </div>
    );
}