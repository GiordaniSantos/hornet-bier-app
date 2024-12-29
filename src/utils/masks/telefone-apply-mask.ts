export function telefoneApplyMask(value: string) {
    return value.replace(/(\d{2})(\d{4})(\d{4})/,"($1) $2-$3")
}