// Componentes reutilisaveis.
import { Container } from "../../../components/container";
import { SelectCustom } from "../../../components/input";

// Ícone.
import { FiUpload } from "react-icons/fi";

// Lista de produtos cadastráveis.
import { selectType} from "../../../utils/formProducts";

// Formulário.
import { useWatch } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { FoodPet } from "../../../components/forms/foodPet";
import { ToysPet } from "../../../components/forms/toysPet";

const componentList = [
    { name: "Ração", components: <FoodPet/> },
    { name: "Brinquedo", components: <ToysPet/> },
]

export function NewProduct(){

    const { control } = useForm();
    const [productType, setProductType] = useState("");

    // Monitora o campo "type" do formulário
    const selectedType = useWatch({ control, name: "type" });

    useEffect(() => {
        if (selectedType !== undefined) {
            setProductType(selectedType);
        }
    }, [selectedType]);

    return(
        <Container>
            <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">
                <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-[#785539] h-32 md:w-48">
                    <div className="absolute cursor-pointer">
                        <FiUpload size={30} color="#785539"/>
                    </div>
                    <div className="cursor-pointer">
                        <input className="opacity-0 cursor-pointer" type="file" accept="image/*" />
                    </div>
                </button>
            </div>
            
            <SelectCustom
                name="type"
                label="Tipo de produto"
                control={control}
                options={selectType}
            />

            {
                componentList.find((type) => type.name === productType)?.components
            }

        </Container>
    );
}