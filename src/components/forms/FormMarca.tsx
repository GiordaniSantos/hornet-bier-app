import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { showSweetAlert } from '../sweetAlert';
import { router } from 'expo-router';
import api from '@/src/services/api';

type formData = {
  nome: string;
}

interface Marca {
  nome: string;
  id: number;
}
  
interface FormMarcaProps {
  marca?: Marca;
}

export default function FormMarca({marca}: FormMarcaProps) {

  const { control, handleSubmit, formState: { errors } } = useForm<formData>({
    defaultValues: {
      nome: marca?.nome || ""
    },
  })

  const createOrUpdateMarca = async (data:formData, isCreate:boolean) => {
    const url = isCreate ? `/marca` : `/marca/${marca?.id}`;
    const successMessage = isCreate ? 'Marca criada com sucesso!' : 'Marca atualizada com sucesso!';

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
      router.push('/marcas')
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
    if(!marca){
      createOrUpdateMarca(data, true)
      return
    }
    createOrUpdateMarca(data, false)
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
          <Button title={marca ? "Atualizar" : "Cadastrar"} color={'#1cc88a'} onPress={handleSubmit(onSubmit)} />
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
