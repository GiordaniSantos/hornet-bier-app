import { Stack } from "expo-router";

export default function PecasLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="create" options={{ title: 'Criar novo Peca' }} />
            <Stack.Screen name="edit/[id]" options={{ title: 'Editar Peca' }} />
        </Stack>
    );
}