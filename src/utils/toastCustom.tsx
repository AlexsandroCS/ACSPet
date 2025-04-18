import toast from "react-hot-toast";
import { FiAlertCircle, FiCheckCircle, FiXCircle } from "react-icons/fi";

interface ToastCustomProps{
    nameUser: any;
    typeProduct: string;
    message: string;
    typeToast: string;
}

const typeToastList = [
    {value: "success", components: <FiCheckCircle color="green" size={22}/>},
    {value: "error", components: <FiXCircle color="red" size={22}/>},
    {value: "warning", components: <FiAlertCircle color="orange" size={22}/>}
];

export function toastCustom({nameUser, typeProduct, message, typeToast}: ToastCustomProps){
    toast.custom((t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-[#785539] rounded-lg pointer-events-auto flex`}>
            <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                        <img
                            className="h-10 w-10 rounded-full"
                            // Adicionar uma imagem de usuário ...
                            src=""
                            alt=""
                        />
                    </div>
                    <div className="ml-3 flex-1">
                        <p className="text-sx font-bold text-[#FFF]">{nameUser}</p>
                        <p className="mt-1 text-sm text-[#F3E5D7] flex gap-1">{typeToastList.find((icon) => icon.value === typeToast)?.components} { typeProduct } { message }</p>
                    </div>
                </div>
            </div>
            
            <div className="flex border-l-2 border-[#8a6649]">
                <button
                    className="w-full rounded-r-lg p-4 flex items-center justify-center text-sm font-bold text-[#F3E5D7] hover:text-[#FFF] focus:outline-none"
                    onClick={() => toast.dismiss(t.id)}
                >
                Fechar
                </button>
            </div>
        </div>
    ),{duration: 13000});
}