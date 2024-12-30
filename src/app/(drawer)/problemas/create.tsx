import { Stack } from 'expo-router';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Container } from '@/src/components/Container';
import FormProblema from '@/src/components/forms/FormProblema';

export default function CreateProblema() {
  return (
    <>
      <Stack.Screen options={{ title: 'Criar Problema' }} />
      <Container>
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.containerForm}>
              <FormProblema />
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
