import { Stack } from 'expo-router';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Container } from '@/src/components/Container';
import FormCliente from '@/src/components/forms/FormCliente';
import { useLocalSearchParams } from 'expo-router';

export default function EditCliente() {
    const { id } = useLocalSearchParams();

    const cliente = {
        nome: 'Indústria e Comércio de Chopeiras Ribeirão Preto ( MEMO )',
        nomeContato: 'Nayara',
        email: 'sac@memo.ind.br',
        cpfCnpj: '03.670.744/0001-01',
        cidade: 'Ribeirão Preto, São Paulo',
        celular: '(16) 98222-0605',
        celularSecundario: '(16) 98138-0424',
        telefone: '(16) 3969-9797'
    }

    return (
        <>
            <Stack.Screen options={{ title: 'Editar Cliente' }} />
            <Container>
                <View style={styles.container}>
                <ScrollView>
                    <View style={styles.containerForm}>
                        <FormCliente cliente={cliente} />
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
