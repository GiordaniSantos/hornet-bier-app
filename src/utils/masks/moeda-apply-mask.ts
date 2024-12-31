export function moedaApplyMask(value: number) {
    // Verifica se o valor é válido
    if (isNaN(value)) return '';

    // Formata o número para o padrão brasileiro sem o símbolo de moeda
    return value.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}