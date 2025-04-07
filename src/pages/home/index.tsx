// Container padronizado.
import { Container } from "../../components/container";

export function Home(){
    return(
        <Container>
            <section className="flex w-full max-w-3xl mx-auto p-4 rounded-lg bg-white justify-center items-center gap-2">
                <input className="w-full border-2 border-[#65391d] rounded-lg h-10 px-3 outline-none" type="text" placeholder="Digite o nome do produto para seu pet..." />
                <button className="bg-[#65391d] h-10 px-8 rounded-lg text-[#f2d1ae] font-medium text-lg">Buscar</button>
            </section>

            <h1 className="font-bold text-center mt-6 text-2xl mb-4">
                Encontre produtos que seu pet vai amar
            </h1>

            {/* Max: 4 item / Med: 2 item / Min: 1 item */}
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <section className="w-full bg-white rounded-lg">
                    <img className="w-full rounded-lg mb-2 max-h-72 hover:scale-108 transition-all" src="https://m.media-amazon.com/images/I/411RhsWdXGL._AC_UF1000,1000_QL80_.jpg" alt="Torre de bolinha para gatos" />
                    
                    <p className="font-bold text-zinc-800 mt-1 px-2">Torre de bolinhas</p>
                    
                    <div className="border-t-2 border-[#f2d1ae] px-2 pb-2">
                        <strong className="text-zinc-700 font-bold text-xl">R$ 47,99</strong>
                    </div>
                </section>
            </main>
        </Container>
    );
}