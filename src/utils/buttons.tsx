import { Link } from "react-router-dom";

interface ButtonConfirmProps{
    title: string;
    url?: string;
}

export function ButtonConfirm({title, url}: ButtonConfirmProps){
    return(
        <Link to={`${url}`}>
            <button className="flex flex-row justify-center items-center w-full mt-3 text-center font-bold rounded uppercase text-xs p-2.5 cursor-pointer bg-[#f2d1ae] text-[#313131] hover:bg-[#785539] hover:text-[#fff] transition duration-300">
                {title}
            </button>
        </Link>
    );
}

export function ButtonDefault({title}: ButtonConfirmProps){
    return(
        <button type="submit" className="flex flex-row justify-center items-center w-full mt-3 text-center font-bold rounded uppercase text-xs p-2.5 cursor-pointer bg-[#f2d1ae] text-[#313131] hover:bg-[#785539] hover:text-[#fff] transition duration-300">
            {title}
        </button>
    );
}