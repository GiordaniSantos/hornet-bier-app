import { Stack } from 'expo-router';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Container } from '@/src/components/Container';
import FormServico from '@/src/components/forms/FormServico';

export default function CreateServico() {
  return (
    <>
      <Stack.Screen options={{ title: 'Criar Serviço' }} />
      <Container>
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.containerForm}>
              <FormServico />
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
