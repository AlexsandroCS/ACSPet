// Import de hooks.
import { useEffect, useState } from "react";

// Imports do chart.
import { Bar, Doughnut } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
  
// Componentes necessários do gráfico
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
);

interface LessFoodsProps{
    id: string;
    name: string;
    type: string;
    amount: number;
    date: Date;
}

// Conexão / firebase
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

export function Graphics(){

    const [listLessFoods, setListLessFoods] = useState<LessFoodsProps[]>([]);
    const [listBestSellerFoods, setListBestSellerFoods] = useState<LessFoodsProps[]>([]);

    useEffect(() => {
        function lessProduct(){
            const foodsRef = collection(db, "foods");
            const queryRef = query(foodsRef, orderBy("amount", "asc"));

            getDocs(queryRef)
            .then((snapshot) => {
                let listLessFoods = [] as LessFoodsProps[];
                let listBestSellerFoods = [] as LessFoodsProps[];

                snapshot.forEach( doc => {
                    if(doc.data().amount <= 200){
                        listLessFoods.push({
                            id: doc.id,
                            name: doc.data().name,
                            type: doc.data().type,
                            amount: doc.data().amount,
                            date: doc.data().date,
                        });
                    }
                    
                    if(listBestSellerFoods.length < 5){
                        listBestSellerFoods.push({
                            id: doc.id,
                            name: doc.data().name,
                            type: doc.data().type,
                            amount: doc.data().amount,
                            date: doc.data().date,
                        });
                    }
                });

                setListLessFoods(listLessFoods);
                setListBestSellerFoods(listBestSellerFoods);
            })
            .catch(() => {

            })
        }

        lessProduct();
    },[]);

    const dataBar = {
        labels: listLessFoods.map(food => food.name),
        datasets: [
            {
                label: "Rações restantes",
                data: listLessFoods.map(food => food.amount),
                backgroundColor: ["#ff6384"],
            },
        ]
    };

    const dataDoughnut = {
        labels: listBestSellerFoods.map(best => best.name),
        datasets: [
            {
                label: "Vendidos",
                data: listBestSellerFoods.map(best => best.amount),
                backgroundColor: ["#33CC33FF", "#CE1A92FF", "#1A7ECFFF", "#DAD730FF", "#E4402AFF"],
                hoverOffset: 4
            },
        ]
    };

    return(
        <div className="my-10 grid grid-cols-1 md:grid-cols-2 justify-between">
            <div className="w-full h-100 flex flex-col justify-center items-center">
                <p className="mt-10 font-bold text-[#785539]">Produtos mais vendidos</p>
                <Doughnut data={dataDoughnut}/>
            </div>

            <div className="w-full h-100 flex flex-col justify-center items-center">
                <p className="mt-10 font-bold text-[#785539]">Produtos acabando no estoque</p>
                <Bar data={dataBar}/>
            </div>
        </div>
    );
}