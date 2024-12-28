import { Stack } from 'expo-router';
import { StyleSheet, View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import { Container } from '@/src/components/Container';
import { useForm, Controller } from "react-hook-form"

type formData = {
  nome: string;
  nomeContato: string
}

export default function CreateOS() {
  const { control, handleSubmit, formState: { errors } } = useForm<formData>({
    defaultValues: {
      nome: "",
      nomeContato: "",
    },
  })

  const onSubmit = (data: formData) => console.log(data)

  return (
    <>
      <Stack.Screen options={{ title: 'Criar Cliente' }} />
      <Container>
          <View style={styles.container}>
            <View style={styles.containerTable}>
              <ScrollView>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <Text style={[styles.label, {width: 155}]}>Nome (Razão Social)</Text>
                      <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </>
                  )}
                  name="nome"
                />
                {errors.nome && <Text>This is required.</Text>}

                <Controller
                  control={control}
                  rules={{
                    maxLength: 100,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <Text style={[styles.label, {width: 135}]}>Nome do Contato</Text>
                      <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </>
                  )}
                  name="nomeContato"
                />
                <View style={styles.buttonSave}>
                  <Button title="Cadastrar" color={'#0f5d39'} onPress={handleSubmit(onSubmit)} />
                </View>
              </ScrollView>
            </View>
          </View>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerTable: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buttonSave: {
    marginTop: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: -10,
    marginLeft: 10,
    backgroundColor: '#FFF',
    width: 50,
    textAlign: 'center',
    zIndex: 1
  },
  value: {
    fontSize: 16,
    flex: 2,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 20,
  },
});
