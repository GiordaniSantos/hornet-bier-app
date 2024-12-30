import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { useForm, Controller } from "react-hook-form";

type formData = {
  nome: string;
}

interface Servico {
    nome: string;
  }
  
interface FormServicoProps {
    servico?: Servico;
}

export default function FormServico({servico}: FormServicoProps) {

    const { control, handleSubmit, formState: { errors } } = useForm<formData>({
        defaultValues: {
            nome: servico?.nome || ""
        },
    })

    const onSubmit = (data: formData) => {
        console.log(data)
    }

    return (
        <>
            <Controller
                control={control}
                rules={{
                    required: true,
                    maxLength: 300
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text style={[styles.label, {width: 55}]}>Nome</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                        {errors.nome && errors.nome.type == "required" && <Text style={styles.textError}>Preencha este campo!</Text>}
                        {errors.nome && errors.nome.type == "maxLength" && <Text style={styles.textError}>No máximo 300 caracteres!</Text>}
                    </>
                )}
                name="nome"
            />
            <View style={styles.buttonSave}>
                <Button title={servico ? "Atualizar" : "Cadastrar"} color={'#1cc88a'} onPress={handleSubmit(onSubmit)} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
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
