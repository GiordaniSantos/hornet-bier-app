import { Stack } from 'expo-router';
import { StyleSheet, View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import { Container } from '@/src/components/Container';
import { useForm, Controller } from "react-hook-form";

type formData = {
  nome: string;
  nomeContato: string;
  email: string;
  cpfCnpj: string;
  cidade: string;
  celular: string;
  celularSecundario: string;
  telefone: string;
}

export default function CreateOS() {
  const { control, handleSubmit, formState: { errors } } = useForm<formData>({
    defaultValues: {
      nome: "",
      nomeContato: "",
      email: "",
      cpfCnpj: "",
      cidade: "",
      celular: "",
      celularSecundario: "",
      telefone: ""
    },
  })

  const onSubmit = (data: formData) => {
    console.log(data)
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Criar Cliente' }} />
      <Container>
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.containerTable}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    maxLength: 250
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
                      {errors.nome && errors.nome.type == "required" && <Text style={styles.textError}>Preencha este campo!</Text>}
                      {errors.nome && errors.nome.type == "maxLength" && <Text style={styles.textError}>No máximo 250 caracteres!</Text>}
                    </>
                  )}
                  name="nome"
                />
                <Controller
                  control={control}
                  rules={{
                    maxLength: 250,
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
                      {errors.nomeContato && <Text style={styles.textError}>No máximo 250 caracteres!</Text>}
                    </>
                  )}
                  name="nomeContato"
                />
                <Controller
                  control={control}
                  rules={{
                    maxLength: 100,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Digite um email válido!"
                    }
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <Text style={[styles.label]}>Email</Text>
                      <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                      {errors.email && <Text style={styles.textError}>Digite um email válido!</Text>}
                    </>
                  )}
                  name="email"
                />
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <Text style={[styles.label, {width: 80}]}>CPF/CNPJ</Text>
                      <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </>
                  )}
                  name="cpfCnpj"
                />
                <Controller
                  control={control}
                  rules={{
                    maxLength: 200,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <Text style={[styles.label, {width: 60}]}>Cidade</Text>
                      <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                      {errors.cidade && <Text style={styles.textError}>No máximo 200 caracteres!</Text>}
                    </>
                  )}
                  name="cidade"
                />
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <Text style={[styles.label, {width: 125}]}>Celular Principal</Text>
                      <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </>
                  )}
                  name="celular"
                />
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <Text style={[styles.label, {width: 140}]}>Celular Secundário</Text>
                      <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </>
                  )}
                  name="celularSecundario"
                />
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <Text style={[styles.label, {width: 70}]}>Telefone</Text>
                      <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </>
                  )}
                  name="telefone"
                />
                <View style={styles.buttonSave}>
                  <Button title="Cadastrar" color={'#1cc88a'} onPress={handleSubmit(onSubmit)} />
                </View>
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
    marginTop: 5,
  },
  textError: {
    marginTop: -15,
    marginBottom: 8,
    color: '#fc0303'
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
