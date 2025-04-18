import { Input, InputPricess, SelectCustom, Textarea } from "../input";
import { ButtonDefault } from "../../utils/buttons";
import { 
    selectAnimal,
    selectAge,
    selectIndicationToy,
    selectColor,
    selectMaterial,
} from "../../utils/formProducts";

import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

import { toastCustom } from "../../utils/toastCustom";

const schema = z.object({
    type: z.string().nonempty("O tipo do produto é obrigatório!"),
    name: z.string().nonempty("O nome do brinquedo é obrigatório!"),
    animal: z.string().nonempty("Você precisa selecionar a espécie do pet!"),
    age: z.string().nonempty("Você precisa selecionar uma idade para o pet!"),
    width: z.string().nonempty("Você precisa informar a largura do brinquedo em 'centimetros'."),
    height: z.string().nonempty("Você precisa informar a altura do brinquedo em 'centimetros'."),
    depth: z.string().nonempty("Você precisa informar a profundidade do brinquedo em 'centimetros'."),
    color: z.string().nonempty("Você precisa selecionar uma cor para o brinquedo!"),
    material: z.string().nonempty("Você precisa informar o material do brinquedo!"),
    packaging:z.string().nonempty("É obrigatório informar a quantidade de brinquedo por embalagem!"),
    indication:z.string().nonempty("É obrigatório informar qual é a indicação do brinquedo!"),
    amount:z.string().nonempty("É obrigatório informar a quantidade de brinquedo em estoque!"),
    purchasePrice:z.string().nonempty("É obrigatório informar um valor positivo e unitário pago pelo brinquedo em estoque!"),
    sellingPrice:z.string().nonempty("É obrigatório informar um valor positivo e unitário de venda do brinquedo em estoque!"),
    description:z.string().nonempty("É obrigatório informar uma descrição sobre o brinquedo!"),
});

type FormData = z.infer<typeof schema>;

interface ToysPetProps{
    type: string;
}

export function ToysPet({type}: ToysPetProps){
    
    const { user } = useContext(AuthContext);

    const {control, register, handleSubmit, formState:{errors}, reset} = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues: {
            type: type
        }
    });

    function onSubmitForm(data: FormData){

        const purchasePrice = parseFloat(data.purchasePrice.replace(/\./g, '').replace(',', '.'));
        const sellingPrice = parseFloat(data.sellingPrice.replace(/\./g, '').replace(',', '.'));

        if(purchasePrice > sellingPrice){
            toastCustom({
                nameUser: user?.name,
                typeProduct: type,
                message: " valor do brinquedo em estoque não pode ser maior do que o valor de venda.",
                typeToast: "error"
            });

            return;
        }
        
        addDoc(collection(db,"toys"), {
            type: data.type,
            name: data.name,
            animal: data.animal,
            age: data.age,
            width: data.width,
            height: data.height,
            depth: data.depth,
            color: data.color,
            material: data.material,
            packaging: data.packaging,
            indication: data.indication,
            amount: data.amount,
            purchasePrice: purchasePrice,
            sellingPrice: sellingPrice,
            description: data.description,
            date: new Date(),
            registrantId: user?.uid
        })
        .then(() => {
            reset();
            
            toastCustom({
                nameUser: user?.name,
                typeProduct: type,
                message: "registrada com sucesso",
                typeToast: "success"
            });

            console.log(data);
        })
        .catch(() => {
            toastCustom({
                nameUser: user?.name,
                typeProduct: type,
                message: "não foi registrada",
                typeToast: "warning"
            });
        })
    }

    return(
        <>
            <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2">
                <form className="w-full" onSubmit={handleSubmit(onSubmitForm)}>
                    <div className="mb-3">

                        <div className="flex flex-wrap w-full relative">
                            <Input 
                                name="name"
                                type="text"
                                label="Nome do produto"
                                register={register}
                                error={errors.name?.message}
                                placeholder="Informe o nome do produto."
                            />

                            <SelectCustom
                                name="animal"
                                label="Espécie do pet"
                                control={control}
                                options={selectAnimal}
                                error={errors.animal?.message}
                            />

                            <SelectCustom
                                name="age"
                                label="Idade do pet"
                                control={control}
                                options={selectAge}
                                error={errors.age?.message}
                            />
                        
                            <Input 
                                name="height"
                                type="text"
                                label="Altura do brinquedo em (cm)"
                                register={register}
                                error={errors.height?.message}
                                placeholder="Informe a altura do brinquedo em cm."
                            />

                            <Input 
                                name="width"
                                type="text"
                                label="Largura do brinquedo em (cm)"
                                register={register}
                                error={errors.width?.message}
                                placeholder="Informe a largura do brinquedo em cm."
                            />

                            <Input 
                                name="depth"
                                type="text"
                                label="Profundidade do brinquedo em (cm)"
                                register={register}
                                error={errors.depth?.message}
                                placeholder="Informe a altura do brinquedo em cm."
                            />

                            <SelectCustom
                                name="material"
                                label="Material do brinquedo"
                                control={control}
                                options={selectMaterial}
                                error={errors.material?.message}
                            />

                            <SelectCustom
                                name="color"
                                label="Cor do brinquedo"
                                control={control}
                                options={selectColor}
                                error={errors.color?.message}
                            />

                            <SelectCustom
                                name="indication"
                                label="Indicação do brinquedo"
                                control={control}
                                options={selectIndicationToy}
                                error={errors.indication?.message}
                            />

                            <Input 
                                name="packaging"
                                type="number"
                                label="Quantidade de brinquedo por embalagem"
                                register={register}
                                error={errors.packaging?.message}
                                placeholder="Informe a quantidade de brinquedo de uma embalagem."
                            />

                            <Input 
                                name="amount"
                                type="number"
                                label="Quantidade do brinquedo em estoque"
                                register={register}
                                error={errors.amount?.message}
                                placeholder="Informe a quantidade de brinquedo."
                            />

                            <InputPricess 
                                name="purchasePrice"
                                type="string"
                                label="Valor de compra do produto"
                                register={register}
                                error={errors.purchasePrice?.message}
                                placeholder="Informe o valor pago pelo produto."
                            />

                            <InputPricess 
                                name="sellingPrice"
                                type="string"
                                label="Valor de venda do produto"
                                register={register}
                                error={errors.sellingPrice?.message}
                                placeholder="Informe o valor de venda do produto."
                            />
                        </div>

                        <Textarea
                            name="description"
                            label="Digite mais informações relevante sobre o produto"
                            register={register}
                            error={errors.description?.message}
                            placeholder="Descrição do produto..."
                        />
                    </div>
                    
                    <ButtonDefault title="Cadastrar brinquedo"/>
                </form>
            </div>
        </>
    );
}