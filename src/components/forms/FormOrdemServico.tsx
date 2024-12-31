import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { useForm, Controller } from "react-hook-form";

type formData = {
    cliente: string;
    marca: string;
    modelo: string;
    serie: string;
    numeroMotor: string;
    problemas: string;
    servicos: string;
    valorMaoDeObra: string;
    dataEntrada: string;
    dataSaida: string;
    observacao: string;
}

interface OrdemServico {
    cliente: string;
    marca: string;
    modelo: string;
    serie: string;
    numeroMotor: string;
    problemas: string;
    servicos: string;
    valorMaoDeObra: string;
    dataEntrada: string;
    dataSaida: string;
    observacao: string;
}
  
interface FormOrdemServicoProps {
    ordemServico?: OrdemServico;
}

export default function FormOrdemServico({ordemServico}: FormOrdemServicoProps) {

    const { control, handleSubmit, formState: { errors } } = useForm<formData>({
        defaultValues: {
            cliente: ordemServico?.cliente || ""
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
                    maxLength: 250
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text style={[styles.label, {width: 58}]}>Cliente</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                        {errors.cliente && errors.cliente.type == "required" && <Text style={styles.textError}>Preencha este campo!</Text>}
                        {errors.cliente && errors.cliente.type == "maxLength" && <Text style={styles.textError}>No máximo 250 caracteres!</Text>}
                    </>
                )}
                name="cliente"
            />
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text style={[styles.label, {width: 55}]}>Marca</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    </>
                )}
                name="marca"
            />
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text style={[styles.label, {width: 65}]}>Modelo</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    </>
                )}
                name="modelo"
            />
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text style={[styles.label, {width: 50}]}>Série</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    </>
                )}
                name="serie"
            />
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text style={[styles.label, {width: 145}]}>Número do Motor</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    </>
                )}
                name="numeroMotor"
            />
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text style={[styles.label, {width: 220}]}>Problemas(s) Apresentado(s)</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    </>
                )}
                name="problemas"
            />
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text style={[styles.label, {width: 160}]}>Serviço(s) Prestado(s)</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    </>
                )}
                name="servicos"
            />
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text style={[styles.label, {width: 180}]}>Valor Mão de Obra (R$)</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    </>
                )}
                name="valorMaoDeObra"
            />
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text style={[styles.label, {width: 130}]}>Data de Entrada</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    </>
                )}
                name="dataEntrada"
            />
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text style={[styles.label, {width: 240}]}>Data de Saída/Previsão de Saída</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    </>
                )}
                name="dataSaida"
            />
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text style={[styles.label, {width: 105}]}>Observações</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    </>
                )}
                name="observacao"
            />
            <View style={styles.buttonSave}>
                <Button title={ordemServico ? "Atualizar" : "Cadastrar"} color={'#1cc88a'} onPress={handleSubmit(onSubmit)} />
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
