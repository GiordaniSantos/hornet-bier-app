import { Stack } from "expo-router";

export default function OSLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="edit/[id]" options={{ title: 'Editar Ordem de Serviço' }} />
            <Stack.Screen name="view/[id]" options={{ title: 'Detalhes da Ordem de Serviço' }} />
            <Stack.Screen name="create" options={{ title: 'Criar Ordem de Serviço' }} />
            <Stack.Screen name="select" options={{ title: 'Selecione' }} />
        </Stack>
    );
}