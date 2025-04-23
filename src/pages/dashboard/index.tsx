import { Container } from "../../components/container";
import { Graphics } from "../../components/graphics";

import { Link } from "react-router-dom";

import adicionarProduto from "../../assets/imagens/AdicionarProduto.png";
import adicionarOff from "../../assets/imagens/CriarOferta.png";
import listarProduto from "../../assets/imagens/ListarProduto.png";
import vendasProduto from "../../assets/imagens/VendasProdutos.png";
import entradaProduto from "../../assets/imagens/EntradaProdutos.png";

export function Dashboard(){

    return(
        <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 h-auto justify-items-start">
                <div className="w-full cursor-pointer bg-[#fffaef] hover:bg-[#fee8c1] rounded">
                    <Link to={"/painel-acspet/registrar-produto"} className="flex gap-2">
                        <img src={adicionarProduto} alt="Adicionar produto na loja" className="h-18 border-[#785539] border-1 rounded"/>
                        <div>
                            <strong className="text-lx text-[#785539]">Adicionar produto na loja</strong>
                            <p className="text-xs">Adicionar novos produtos como: Ração, Brinquedo, Medicamento, entre outros acessórios para pet.</p>
                        </div>
                    </Link>
                </div>

                <div className="w-full cursor-pointer bg-[#fffaef] hover:bg-[#fee8c1] rounded">
                    <Link to={"/painel-acspet/registrar-produto"} className="flex gap-2">
                        <img src={listarProduto} alt="Listar produtos cadastrados" className="h-18 border-[#785539] border-1 rounded"/>
                        <div>
                            <strong className="text-lx text-[#785539]">Lista de produtos cadastrados</strong>
                            <p className="text-xs">Listar todos os produtos já cadastrado na base de dados.</p>
                        </div>
                    </Link>
                </div>

                <div className="w-full cursor-pointer bg-[#fffaef] hover:bg-[#fee8c1] rounded">
                    <Link to={"/painel-acspet/registrar-produto"} className="flex gap-2">
                        <img src={adicionarOff} alt="Colocar produto em promoção" className="h-18 border-[#785539] border-1 rounded"/>
                        <div>
                            <strong className="text-lx text-[#785539]">Adicionar promoção ou cupons de desconto</strong>
                            <p className="text-xs">Adicionar um produto específico em promoção temporariamente ou com cupons de desconto.</p>
                        </div>
                    </Link>
                </div>

                <div className="w-full cursor-pointer bg-[#fffaef] hover:bg-[#fee8c1] rounded">
                    <Link to={"/painel-acspet/registrar-produto"} className="flex gap-2">
                        <img src={entradaProduto} alt="Entrada de produtos no estoque" className="h-18 border-[#785539] border-1 rounded"/>
                        <div>
                            <strong className="text-lx text-[#785539]">Entrada de produtos</strong>
                            <p className="text-xs">Adicionar lotes de produtos no estoque, entrada de produtos.</p>
                        </div>
                    </Link>
                </div>

                <div className="w-full cursor-pointer bg-[#fffaef] hover:bg-[#fee8c1] rounded">
                    <Link to={"/painel-acspet/registrar-produto"} className="flex gap-2">
                        <img src={vendasProduto} alt="Vendas de produtos" className="h-18 border-[#785539] border-1 rounded"/>
                        <div>
                            <strong className="text-lx text-[#785539]">Histórico de vendas</strong>
                            <p className="text-xs">Históricos de produtos vendidos da loja.</p>
                        </div>
                    </Link>
                </div>
            </div>

            <Graphics/>
        </Container>
    );
}