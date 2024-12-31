import { Stack } from 'expo-router';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Container } from '@/src/components/Container';
import FormPeca from '@/src/components/forms/FormPeca';
import { useLocalSearchParams } from 'expo-router';

export default function EditPeca() {
    const { id } = useLocalSearchParams();

    const peca = {
        nome: 'Indústria e Comércio de Chopeiras Ribeirão Preto ( MEMO )',
        valorUnitario: 1550
    }

    return (
        <>
            <Stack.Screen options={{ title: 'Editar Peca' }} />
            <Container>
                <View style={styles.container}>
                <ScrollView>
                    <View style={styles.containerForm}>
                        <FormPeca peca={peca} />
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
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
  }
});
