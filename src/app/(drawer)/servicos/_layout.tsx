import { Stack } from "expo-router";

export default function ServicosLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="create" options={{ title: 'Criar novo Servico' }} />
            <Stack.Screen name="edit/[id]" options={{ title: 'Editar Servico' }} />
        </Stack>
    );
}