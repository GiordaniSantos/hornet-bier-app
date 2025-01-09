import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import api from '@/src/services/api';
import { showSweetAlert } from '../sweetAlert';
import { router } from 'expo-router';

type formData = {
  nome: string;
}

interface Servico {
  nome: string;
  id: number;
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

  const createOrUpdateServico = async (data:formData, isCreate:boolean) => {
    const url = isCreate ? `/servico` : `/servico/${servico?.id}`;
    const successMessage = isCreate ? 'Serviço criado com sucesso!' : 'Serviço atualizado com sucesso!';

    try {
      if (isCreate) {
        await api.post(url, {
          nome: data.nome,
        });
      } else {
        await api.put(url, {
          nome: data.nome,
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
      router.push('/servicos')
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
    if(!servico){
      createOrUpdateServico(data, true)
     return
    }
    createOrUpdateServico(data, false)
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
