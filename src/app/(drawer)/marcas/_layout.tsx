import { Stack } from "expo-router";

export default function MarcasLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="create" options={{ title: 'Criar novo Marca' }} />
            <Stack.Screen name="edit/[id]" options={{ title: 'Editar Marca' }} />
        </Stack>
    );
}