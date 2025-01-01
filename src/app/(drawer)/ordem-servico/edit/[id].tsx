import { Stack } from 'expo-router';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Container } from '@/src/components/Container';
import FormOrdemServico from '@/src/components/forms/FormOrdemServico';
import { useLocalSearchParams } from 'expo-router';

export default function EditOrdemServico() {
    const { id } = useLocalSearchParams();

    const ordemServico = {
        cliente: 2,
        marca: 2,
        modelo: 'Algum',
        serie: '---------',
        numeroMotor: '513200349 FB7AQGIC',
        problemas: [
            1,
            2
        ],
        servicos: [
            3,
            5
        ],
        items: [
            {
                id: 1,
                piece: 2,
                quantity: 25
            },
            {
                id: 2,
                piece: 3,
                quantity: 30
            }
        ],
        valorMaoDeObra: 1500,
        dataEntrada: '2025-01-01T00:00:00',
        dataSaida: '2025-02-28T00:00:00',
        observacao: 'Teste'
    }

    return (
        <>
            <Stack.Screen options={{ title: 'Editar Ordem de Servico' }} />
            <Container>
                <View style={styles.container}>
                <ScrollView>
                    <View style={styles.containerForm}>
                        <FormOrdemServico ordemServico={ordemServico} />
                    </View>
                </ScrollView>
                </View>
            </Container>
        </>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerForm: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
  }
});
