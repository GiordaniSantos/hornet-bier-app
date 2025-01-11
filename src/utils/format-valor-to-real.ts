import { moedaApplyMask } from "./masks";

export function convertValor(valor:string){
    const valorEmReais = parseFloat(valor);

    return moedaApplyMask(valorEmReais);
}