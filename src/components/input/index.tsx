import { Control, Controller, FieldValues, RegisterOptions, UseFormRegister, Path } from "react-hook-form";
import Select from "react-select";
import { useCallback } from "react";

// Input.
interface InputProps{
    type: string;
    placeholder: string;
    name: string;
    label?: string;
    register: UseFormRegister<any>;
    error?: string;
    rules?: RegisterOptions;
}

// Textarea.
interface TextareaProps{
    placeholder: string;
    name: string;
    label: string;
    register: UseFormRegister<any>;
    error?: string;
    rules?: RegisterOptions;
}

// Select.
interface OptionProps{
    value: string;
    label: string;
}

interface SelectionCustomProps<T extends FieldValues>{
    name: Path<T>;
    control: Control<T>;
    options: OptionProps[];
    error?: string;
    label: string;
}

export function Input({type, placeholder, name, label, register, rules, error}: InputProps){
    return(
        <div className="mb-3.5 mr-5">
            <label className="mb-2 font-bold text-xs">{label}</label>
            <input
                className={`w-full min-w-[300px] border-2 rounded-md h-11 px-2 text-[#2c2c2c] text-xs font-bold outline-0 ${error ? "border-[#EB0000] hover:border-[#EB0000]" : "border-[#E5E7EB] hover:border-[#785539]"}`}
                type={type}
                placeholder={placeholder}
                {...register(name, rules)}
            />
            {error && <p className="text-[#EB0000FF] my-1 text-sm">{error}</p>}
        </div>
    );
}

export function InputPricess({ type, placeholder, name, label, register, rules, error }: InputProps) {
    const handleKeyUp = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        let value = target.value.replace(/\D/g, '');
        
        // Remove os zeros à esquerda, menos se for o único dígito antes dos centavos.
        value = value.replace(/^0+/, '') || '0';
        
        // Garante pelo menos dois dígitos para os centavos.
        if (value.length === 1) value = '0' + value;
        if (value.length === 0) value = '000';
        
        const cents = value.slice(-2);
        let integerPart = value.slice(0, -2) || '0';
        
        // Adiciona separadores de milhar apenas quando necessário.
        if (integerPart.length > 3) {
            integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }
      
        target.value = integerPart + ',' + cents;
    }, []);
  
    return (
        <div className="mb-3.5 mr-5">
            <label className="mb-2 font-bold text-xs">{label}</label>
            <input
            className={`w-full min-w-[300px] border-2 rounded-md h-11 px-2 text-[#2c2c2c] text-xs font-bold outline-0 ${error ? "border-[#EB0000] hover:border-[#EB0000]" : "border-[#E5E7EB] hover:border-[#785539]"}`}
            type={type}
            placeholder={placeholder}
            onKeyUp={handleKeyUp}
            {...register(name, {
                ...rules,
                    validate: { validCurrency: (v) => /^\d{1,3}(\.\d{3})*,\d{2}$/.test(v) || "Formato inválido"}
                })}
            />
            {error && <p className="text-[#EB0000FF] my-1 text-sm">{error}</p>}
      </div>
    );
}

export function Textarea({placeholder, name, label, register, rules, error}: TextareaProps){
    return(
        <div className="mb-3.5">
            <label className="mb-2 font-bold text-xs">{label}</label>
            <textarea
                className={`w-full border-2 rounded-md h-30 px-2 py-1 text-[#2c2c2c] text-xs font-bold outline-0 ${error ? "border-[#EB0000] hover:border-[#EB0000]" : "border-[#E5E7EB] hover:border-[#785539]"}`}
                placeholder={placeholder}
                {...register(name, rules)}
            />
            {error && <p className="text-[#EB0000FF] my-1 text-sm">{error}</p>}
        </div>
    );
}

export function SelectCustom<T extends FieldValues>({name, label, control, options, error}: SelectionCustomProps<T>){
    return(
        <div className="mb-3.5 mr-5 min-w-[200px] flex-1 ">
            <label className="mb-2 font-bold text-xs">{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        options={options}
                        className="text-[#000] text-xs font-bold"
                        placeholder="Nenhuma opção selecionada."
                        styles={{
                            control: (base, { isFocused }) => ({
                                ...base,
                                cursor: "pointer",
                                border: `2px solid ${error ? "#EB0000" : "#E5E7EB"}`,
                                borderRadius: "0.375rem",
                                height: "44px",
                                "&:hover": { borderColor: "#785539" },
                                boxShadow: isFocused ? "none" : "none",
                                }),
                                option: (base) => ({
                                ...base,
                                cursor: "pointer",
                                backgroundColor: "white",
                                color: "#785539",
                                "&:hover": { backgroundColor: "#F3E5D7" },
                            }),
                        }}
                        onChange={(option) => field.onChange(option?.value)} value={options.find((opt) => opt.value === field.value)}
                    />
                )}
            />
            {error && (
                <p className="text-[#EB0000FF] my-1 text-sm">{error}</p>
            )}
        </div>
    );
}