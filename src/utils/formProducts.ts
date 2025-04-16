// Select options animal.
const selectAnimal = [
    {value: "", label: "Selecione"},
    {value: "Gato", label: "Gato"},
    {value: "Cachorro", label: "Cachorro"},
    {value: "Pássaro", label: "Pássaro"},
    {value: "Roedor", label: "Roedor"},
    {value: "Peixe", label: "Peixe"},
    {value: "Lagarto", label: "Lagarto"},
    {value: "Tartaruga", label: "Tartaruga"},
];

// Select options type.
const selectType = [
    {value: "", label: "Selecione"},
    {value: "Ração", label: "Ração"},
    {value: "Alimentação", label: "Alimentação"},
    {value: "Brinquedo", label: "Brinquedo"},
    {value: "Arranhador", label: "Arranhador"},
    {value: "Remédio", label: "Remédio"},
    {value: "Higiene e Limpeza", label: "Higiene e Limpeza"},
    {value: "Roupas, Cama e Almofada", label: "Roupas, Cama e Almofada"},
    {value: "Utilitários", label: "Utilitários"},
];

// Select options age.
const selectAge = [
    {value: "", label: "Selecione"},
    {value: "Todas idades", label: "Todas idades"},
    {value: "Filhote", label: "Filhote"},
    {value: "Adulto", label: "Adulto"},
    {value: "Idoso", label: "Idoso"},
];

// Select options size grains.
const selectSizeGrains = [
    {value: "", label: "Selecione"},
    {value: "Pequeno", label: "Pequeno"},
    {value: "Médio", label: "Médio"},
    {value: "Grande", label: "Grande"},
];

// Select options weight product.
const selectWeightProduct = [
    { value: "", label: "Selecione" },
    ...[50, 70, 100, 500].map(g => ({ value: `${g}g`, label: `${g}g` })),
    ...Array.from({ length: 20 }, (_, i) => ({
        value: `${i+1}Kg`,
        label: `${i+1}Kg` 
    }))
];

// Select options texture product.
const selectTextureProduct = [
    {value: "", label: "Selecione"},
    {value: "Macio", label: "Macio"},
    {value: "Crocante", label: "Crocante"},
    {value: "Pastoso", label: "Pastoso"},
];

// Select dye product.
const selectDye = [
    {value: "", label: "Selecione"},
    {value: "Sim", label: "Sim"},
    {value: "Não", label: "Não"},
];

// Select indication food.
const selectIndication = [
    {value: "", label: "Selecione"},
    {value: "Agrado", label: "Agrado"},
    {value: "Petisco", label: "Petisco"},
    {value: "Recompensa", label: "Recompensa"},
    {value: "Terapéutico", label: "Terapéutico"}
];

// Select color toys.
const selectColor = [
    {value: "", label: "Selecione"},
    {value: "Branco", label: "Branco"},
    {value: "Preto", label: "Preto"},
    {value: "Cinza", label: "Cinza"},
    {value: "Vermelho", label: "Vermelho"},
    {value: "Azul", label: "Azul"},
    {value: "Amarelo", label: "Amarelo"},
    {value: "Laranja", label: "Laranja"},
    {value: "Verde", label: "Verde"},
    {value: "Rosa", label: "Rosa"},
    {value: "Sortido", label: "Sortido"},
    {value: "Colorido", label: "Colorido"},
];

// Select material toys.
const selectMaterial = [
    {value: "", label: "Selecione"},
    {value: "Plástico", label: "Plástico"},
    {value: "Silicone", label: "Silicone"},
    {value: "Penas", label: "Penas"},
    {value: "Poliestireno", label: "Poliestireno"},
    {value: "Polipropileno", label: "Polipropileno"},
    {value: "Poliéster", label: "Poliéster"},
    {value: "Elástico", label: "Elástico"},
    {value: "Plástico e Penas", label: "Plástico e Penas"},
    {value: "Silicone e Penas", label: "Silicone e Penas"},
];

// Select indication toys.
const selectIndicationToy = [
    {value: "", label: "Selecione"},
    {value: "Divertir", label: "Divertir"},
    {value: "Estimular", label: "Estimular"},
    {value: "Recompensa", label: "Recompensa"},
    {value: "Terapéutico", label: "Terapéutico"}
];

export {
    selectAnimal,
    selectType,
    selectAge,
    selectSizeGrains,
    selectWeightProduct,
    selectTextureProduct,
    selectDye,
    selectIndication,
    selectColor,
    selectMaterial,
    selectIndicationToy
};