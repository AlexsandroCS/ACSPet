import { useState, useEffect } from "react";

import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

import { Link } from "react-router-dom";

// Container padronizado.
import { Container } from "../../components/container";

// Button personalizado.
import { ButtonConfirm } from "../../utils/buttons";

interface ProductsProps{
    id: string;
    name: string;
    type: string;
    sellingPrice: string | number;
    registrantId: string;
    url: string;
}

export function Home(){

    const [product, setProduct] = useState<ProductsProps[]>([]);
    
    useEffect(() => {
        function loadProducts(){
            const productsRef = collection(db, "foods")
            const queryRef = query(productsRef, orderBy("date", "desc"))
            
            getDocs(queryRef)
            .then((snapshot) => {
                let listProducts = [] as ProductsProps[];
                
                snapshot.forEach( doc => {
                    listProducts.push({
                        id: doc.id,
                        name: doc.data().name,
                        type: doc.data().type,
                        sellingPrice: doc.data().sellingPrice,
                        registrantId: doc.data().registrantId,
                        url: doc.data().url
                    })
                })
                
                setProduct(listProducts);
            })
            .catch(() => {
                // Mensagem de erro toast...
            })
        }

        loadProducts();
    },[])
    
    // Layout Shift.
    const [loadingImage, setLoadingImage] = useState<string[]>([]);
    
    function handleLoadingImage(id: string){
        setLoadingImage((images) => [...images, id])
    }

    return(
        <Container>
            <section className="flex w-full max-w-3xl mx-auto p-4 rounded-lg bg-white justify-center items-center gap-2">
                <input className="w-full border-2 border-[#785539] rounded-lg h-10 px-3 outline-none" type="text" placeholder="Digite o nome do produto para seu pet..." />
                <button className="bg-[#785539] h-10 px-8 rounded-lg text-[#f2d1ae] font-medium text-lg">Buscar</button>
            </section>

            {/* Max: 6 item / Med: 4 item / Min: 2 item */}
            <main className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {
                    product.map((product, index) => (
                        <section className="w-full bg-white rounded-lg" key={index}>
                            <Link to={`/produto/${product.type}/${product.id}`}>
                                <span className="absolute z-1 bg-[#ffea00] text-[#000] font-bold text-xs rounded-r-md p-1.5 mt-2.5">-20%</span>
                                <div 
                                    className="w-full h-72 rounded-lg bg-[#f2d1ae]" 
                                    style={{display: loadingImage.includes(product.id) ? "none" : "block"}}
                                />
                                
                                <img 
                                    className="w-full z-0 rounded-lg mb-2 max-h-72" 
                                    style={{display: loadingImage.includes(product.id) ? "block" : "none"}} 
                                    src={product.url} 
                                    alt={product.name} 
                                    onLoad={() => handleLoadingImage(product.id)}
                                />
                                
                                <p className="font-bold text-zinc-700 mt-1 px-2 line-clamp-3">{product.name}</p>
                                
                                <div className="border-t-3 border-[#f2d1ae] px-2 pb-2 mt-1.5">
                                    <strong className="text-zinc-700 font-bold text-xs line-through">{product.sellingPrice.toLocaleString("pt-BR",{style: "currency", currency: "BRL"})}</strong>
                                    <div className="flex flex-col">
                                        <strong className="text-[#785539] text-2xl font-bold">{product.sellingPrice.toLocaleString("pt-BR",{style: "currency", currency: "BRL"})}</strong>
                                        <span className="text-xs font-bold text-zinc-500">À vista no PIX</span>
                                    </div>
                                    <ButtonConfirm title="Comprar"/>
                                </div>
                            </Link>
                        </section>
                    ))
                }
            </main>
        </Container>
    );
}