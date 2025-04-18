// Container padronizado.
import { Container } from "../../components/container";

// Button personalizado.
import { ButtonConfirm } from "../../utils/buttons";

export function Home(){
    return(
        <Container>
            <section className="flex w-full max-w-3xl mx-auto p-4 rounded-lg bg-white justify-center items-center gap-2">
                <input className="w-full border-2 border-[#785539] rounded-lg h-10 px-3 outline-none" type="text" placeholder="Digite o nome do produto para seu pet..." />
                <button className="bg-[#785539] h-10 px-8 rounded-lg text-[#f2d1ae] font-medium text-lg">Buscar</button>
            </section>

            {/* Max: 4 item / Med: 2 item / Min: 1 item */}
            <main className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                <section className="w-full bg-white rounded-lg">
                    <span className="absolute z-1 bg-[#ffea00] text-[#000] font-bold text-xs rounded-r-md p-1.5 mt-2.5">-20%</span>
                    <img className="w-full z-0 rounded-lg mb-2 max-h-72" src="https://m.media-amazon.com/images/I/411RhsWdXGL._AC_UF1000,1000_QL80_.jpg" alt="Torre de bolinha para gatos" />
                    
                    <p className="font-bold text-zinc-700 mt-1 px-2 line-clamp-3">Torre de bolinhas para gatos brincar, três bolinhas em uma torre para os gatos brincar como nunca e bla.</p>
                    
                    <div className="border-t-3 border-[#f2d1ae] px-2 pb-2 mt-1.5">
                        <strong className="text-zinc-700 font-bold text-xs line-through">R$ 57,59</strong>
                        <div className="flex flex-col">
                            <strong className="text-[#785539] text-2xl font-bold">R$ 47,99</strong>
                            <span className="text-xs font-bold text-zinc-500">À vista no PIX</span>
                        </div>
                        <ButtonConfirm title="Comprar"/>
                    </div>
                </section>
            </main>
        </Container>
    );
}