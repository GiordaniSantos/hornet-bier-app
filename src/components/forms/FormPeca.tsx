import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { moedaApplyMask } from '@/src/utils/masks';
import api from '@/src/services/api';
import { showSweetAlert } from '../sweetAlert';
import { router } from 'expo-router';
import { convertValor } from '@/src/utils/format-valor-to-real';

type formData = {
  nome: string;
  valor_unitario: string;
}

interface Peca {
  id: number;
  nome: string;
  valor_unitario: string;
}
  
interface FormPecaProps {
  peca?: Peca;
}

export default function FormPeca({peca}: FormPecaProps) {
  
  const { control, handleSubmit, formState: { errors } } = useForm<formData>({
    defaultValues: {
      nome: peca?.nome || "",
      valor_unitario: peca && peca.valor_unitario ? convertValor(peca.valor_unitario) : '0'
    },
  })

  const createOrUpdatePeca = async (data:formData, isCreate:boolean) => {
    const url = isCreate ? `/peca` : `/peca/${peca?.id}`;
    const successMessage = isCreate ? 'Peça criada com sucesso!' : 'Peça atualizada com sucesso!';

    try {
      if (isCreate) {
        await api.post(url, {
          nome: data.nome,
          valor_unitario: data.valor_unitario
        });
      } else {
        await api.put(url, {
          nome: data.nome,
          valor_unitario: data.valor_unitario
        });
      }

      showSweetAlert({
        title: 'Sucesso!',
        text: successMessage,
        showCancelButton: false,
        cancelButtonText: 'Não, cancelar',
        confirmButtonText: 'Ok',
        onConfirm: () => {},
        onClose: () => {},
        type: 'success',
      });
      router.push('/pecas')
    } catch (e: any) {
      const errorMessage = e.response && e.response.data && e.response.data.message ? e.response.data.message : 'Ocorreu um erro inesperado.';

      showSweetAlert({
        title: 'Erro',
        text: errorMessage,
        showCancelButton: false,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Ok',
        onConfirm: () => {},
        onClose: () => {},
        type: 'danger',
      });
    }
  }

  const onSubmit = (data: formData) => {
    if(!peca){
      createOrUpdatePeca(data, true)
      return
    }
    createOrUpdatePeca(data, false)
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
            {errors.valor_unitario && errors.valor_unitario.type == "required" && <Text style={styles.textError}>Preencha este campo!</Text>}
            {errors.valor_unitario && errors.valor_unitario.type == "maxLength" && <Text style={styles.textError}>No máximo 250 caracteres!</Text>}
          </>
        )}
        name="valor_unitario"
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
