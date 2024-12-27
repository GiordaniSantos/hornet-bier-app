import { Stack } from "expo-router";

export default function ClientesLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="view/[id]" options={{ title: 'Detalhe da OS' }} />
        </Stack>
    );
}