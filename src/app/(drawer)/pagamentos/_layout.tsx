import { Stack } from "expo-router";

export default function PagamentosLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="view/[id]" options={{ title: 'Detalhes do Pagamento' }} />
        </Stack>
    );
}