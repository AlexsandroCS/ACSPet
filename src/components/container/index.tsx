import { ReactNode } from "react";

export function Container({children}: {children: ReactNode}){
    return(
        <div className="w-full max-w-6/7 mx-auto px-4 pb-1 bg-white">
            {children}
        </div>
    );
}