import { Input, InputPricess, SelectCustom, Textarea } from "../input"
import { ButtonDefault } from "../../utils/buttons"
import {
    selectAnimal,
    selectAge,
    selectSizeGrains,
    selectWeightProduct,
    selectTextureProduct,
    selectDye,
    selectIndication
} from "../../utils/formProducts"

import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { addDoc, collection } from "firebase/firestore"
import { db } from "../../services/firebaseConnection"

import { toastCustom } from "../../utils/toastCustom"

const schema = z.object({
    name: z.string().nonempty("O nome do produto é obrigatório!"),
    animal: z.string().nonempty("Você precisa selecionar a espécie do pet!"),
    type: z.string().nonempty("O tipo do produto é obrigatório!"),
    age: z.string().nonempty("Você precisa selecionar uma idade para o pet!"),
    sizeGrains: z.string().nonempty("O tamanho do grão do produto é obrigatório!"),
    weightProduct: z.string().nonempty("O peso do produto é obrigatório!"),
    flavor:z.string().nonempty("O sabor do produto é obrigatório!"),
    textureProduct:z.string().nonempty("É obrigatório informar a textura do produto!"),
    dye:z.string().nonempty("É obrigatório informar se o produto contém corante!"),
    indication:z.string().nonempty("É obrigatório informar qual é a indicação do produto!"),
    amount:z.string().nonempty("É obrigatório informar a quantidade de produto em estoque!"),
    purchasePrice:z.string().nonempty("É obrigatório informar um valor positivo e unitário pago pelo produto em estoque!"),
    sellingPrice: z.string().nonempty("É obrigatório informar um valor positivo e unitário de venda do produto em estoque!"),
    description:z.string().nonempty("É obrigatório informar uma descrição sobre o produto!"),
});

type FormData = z.infer<typeof schema>;

interface FoodPetProps{
    type: string;
}

export function FoodPet({type}: FoodPetProps){

    const { user } = useContext(AuthContext);

    const {control, register, handleSubmit, formState:{errors}, reset} = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues:{
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
                message: " valor do produto em estoque não pode ser maior do que o valor de venda.",
                typeToast: "error"
            });

            return;
        }

        addDoc(collection(db,"foods"), {
            name: data.name,
            animal: data.animal,
            type: data.type,
            age: data.age,
            sizeGrains: data.sizeGrains,
            weightProduct: data.weightProduct,
            flavor: data.flavor,
            textureProduct: data.textureProduct,
            dye: data.dye,
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
                        
                            <SelectCustom 
                                name="sizeGrains"
                                label="Tamanho do grão"
                                control={control}
                                options={selectSizeGrains}
                                error={errors.sizeGrains?.message}
                            />

                            <SelectCustom
                                name="weightProduct"
                                label="Peso do produto"
                                control={control}
                                options={selectWeightProduct}
                                error={errors.weightProduct?.message}
                            />

                            <Input 
                                name="flavor"
                                type="text"
                                label="Sabor do produto"
                                register={register}
                                error={errors.flavor?.message}
                                placeholder="Informe o sabor do produto."
                            />

                            <SelectCustom
                                name="textureProduct"
                                label="Testura do produto"
                                control={control}
                                options={selectTextureProduct}
                                error={errors.textureProduct?.message}
                            />

                            <SelectCustom 
                                name="dye"
                                label="Produto contém corante?"
                                control={control}
                                options={selectDye}
                                error={errors.dye?.message}
                            />

                            <SelectCustom
                                name="indication"
                                label="Indicação do produto"
                                control={control}
                                options={selectIndication}
                                error={errors.indication?.message}
                            />

                            <Input 
                                name="amount"
                                type="number"
                                label="Quantidade do produto em estoque"
                                register={register}
                                error={errors.amount?.message}
                                placeholder="Informe a quantidade do produto."
                            />

                            <InputPricess 
                                name="purchasePrice"
                                type="text"
                                label="Valor de compra do produto"
                                register={register}
                                error={errors.purchasePrice?.message}
                                placeholder="Informe o valor pago pelo produto."
                            />

                            <InputPricess 
                                name="sellingPrice"
                                type="text"
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
                    
                    <ButtonDefault title="Cadastrar Produto"/>
                </form>
            </div>
        </>
    );
}