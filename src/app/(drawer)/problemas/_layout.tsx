import { Stack } from "expo-router";

export default function ProblemasLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="create" options={{ title: 'Criar novo Problema' }} />
            <Stack.Screen name="edit/[id]" options={{ title: 'Editar Problema' }} />
        </Stack>
    );
}