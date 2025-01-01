import { Stack } from 'expo-router';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Container } from '@/src/components/Container';
import FormProblema from '@/src/components/forms/FormProblema';
import { useLocalSearchParams } from 'expo-router';

export default function EditProblema() {
    const { id } = useLocalSearchParams();

    const problema = {
        nome: 'Indústria e Comércio de Chopeiras Ribeirão Preto ( MEMO )',
    }

    return (
        <>
            <Stack.Screen options={{ title: 'Editar Problema' }} />
            <Container>
                <View style={styles.container}>
                <ScrollView>
                    <View style={styles.containerForm}>
                        <FormProblema problema={problema} />
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
