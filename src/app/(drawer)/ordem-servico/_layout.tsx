import { Stack } from "expo-router";

export default function OSLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="view/[id]" options={{ title: 'Detalhe da OS' }} />
            <Stack.Screen name="create" options={{ title: 'Criar OS' }} />
        </Stack>
    );
}