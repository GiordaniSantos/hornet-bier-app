import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { moedaApplyMask } from '@/src/utils/masks';

type formData = {
    nome: string;
    valorUnitario: number;
}

interface Peca {
    nome: string;
    valorUnitario: number;
}
  
interface FormPecaProps {
    peca?: Peca;
}

export default function FormPeca({peca}: FormPecaProps) {

    const { control, handleSubmit, formState: { errors } } = useForm<formData>({
        defaultValues: {
            nome: peca?.nome || "",
            valorUnitario: peca?.valorUnitario || 0
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
                        <Text style={[styles.label, {width: 55}]}>Nome</Text>
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
                    required: true,
                    maxLength: 250
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text style={[styles.label, {width: 142}]}>Valor Unitário (R$)</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            keyboardType='numeric'
                            onChangeText={text => {
                                const apenasNumeros = text.replace(/\D/g, '');

                                const valorEmReais = parseFloat(apenasNumeros) / 100;

                                const valueMoeda = moedaApplyMask(valorEmReais);
                                onChange(valueMoeda);
                            }}
                            value={value ? value.toString() : ''}
                        />
                        {errors.valorUnitario && errors.valorUnitario.type == "required" && <Text style={styles.textError}>Preencha este campo!</Text>}
                        {errors.valorUnitario && errors.valorUnitario.type == "maxLength" && <Text style={styles.textError}>No máximo 250 caracteres!</Text>}
                    </>
                )}
                name="valorUnitario"
            />
            <View style={styles.buttonSave}>
                <Button title={peca ? "Atualizar" : "Cadastrar"} color={'#1cc88a'} onPress={handleSubmit(onSubmit)} />
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
