import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { cpfApplyMask, cnpjApplyMask, celularApplyMask, telefoneApplyMask } from '@/src/utils/masks';
import api from '@/src/services/api';
import { showSweetAlert } from '../sweetAlert';
import { router } from 'expo-router';

type formData = {
    nome: string;
    nome_contato: string;
    email: string;
    cpf_cnpj: string;
    cidade: string;
    celular: string;
    celular_secundario: string;
    telefone: string;
}

interface Cliente {
    id: number;
    nome: string;
    nome_contato?: string;
    email?: string;
    cpf_cnpj?: string;
    cidade?: string;
    celular?: string;
    celular_secundario?: string;
    telefone?: string;
}
  
interface FormClienteProps {
    cliente?: Cliente;
}

export default function FormCliente({cliente}: FormClienteProps) {

    const { control, handleSubmit, formState: { errors } } = useForm<formData>({
        defaultValues: {
            nome: cliente?.nome || "",
            nome_contato: cliente?.nome_contato || "",
            email: cliente?.email || "",
            cpf_cnpj: cliente?.cpf_cnpj || "",
            cidade: cliente?.cidade || "",
            celular: cliente?.celular || "",
            celular_secundario: cliente?.celular_secundario || "",
            telefone: cliente?.telefone || ""
        },
    })

    const createOrUpdateCliente = async (data:formData, isCreate:boolean) => {
        const url = isCreate ? `/cliente` : `/cliente/${cliente?.id}`;
        const successMessage = isCreate ? 'Cliente criado com sucesso!' : 'Cliente atualizado com sucesso!';
    
        try {
            if (isCreate) {
                await api.post(url, {
                    nome: data.nome,
                    nome_contato: data.nome_contato,
                    email: data.email,
                    cpf_cnpj: data.cpf_cnpj,
                    cidade: data.cidade,
                    celular: data.celular,
                    celular_secundario: data.celular_secundario,
                    telefone: data.telefone
                });
            } else {
                await api.put(url, {
                    nome: data.nome,
                    nome_contato: data.nome_contato,
                    email: data.email,
                    cpf_cnpj: data.cpf_cnpj,
                    cidade: data.cidade,
                    celular: data.celular,
                    celular_secundario: data.celular_secundario,
                    telefone: data.telefone
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
            router.push('/clientes')
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
        if(!cliente){
          createOrUpdateCliente(data, true)
          return
        }
        createOrUpdateCliente(data, false)
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
                        {errors.nome_contato && <Text style={styles.textError}>No máximo 250 caracteres!</Text>}
                    </>
                )}
                name="nome_contato"
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
                rules={{
                    minLength: 11,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text style={[styles.label, {width: 80}]}>CPF/CNPJ</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                const onlyNumbers = text.replace(/\D/g, "")
                                
                                if (onlyNumbers.length > 14) {
                                    return;
                                }

                                if(onlyNumbers.length == 11){
                                    const cpf = cpfApplyMask(onlyNumbers)
                                    return onChange(cpf)
                                }
                                
                                if(onlyNumbers.length == 14){
                                    const cnpj = cnpjApplyMask(onlyNumbers)
                                    return onChange(cnpj)
                                }

                                onChange(onlyNumbers);
                            }}
                            value={value}
                        />
                        {errors.cpf_cnpj && <Text style={styles.textError}>O campo deve ter no mínimo 11 caracteres!</Text>}
                    </>
                )}
                name="cpf_cnpj"
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
                rules={{
                    minLength: 15,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text style={[styles.label, {width: 125}]}>Celular Principal</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            keyboardType="numeric"
                            maxLength={15}
                            onChangeText={(text) => {
                                const onlyNumbers = text.replace(/\D/g, "")
                            
                                onChange(celularApplyMask(onlyNumbers));
                            }}
                            value={value}
                        />
                        {errors.celular && <Text style={styles.textError}>O campo deve ter no mínimo 15 caracteres!</Text>}
                    </>
                )}
                name="celular"
            />
            <Controller
                control={control}
                rules={{
                    minLength: 15,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text style={[styles.label, {width: 140}]}>Celular Secundário</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            keyboardType="numeric"
                            maxLength={15}
                            onChangeText={(text) => {
                                const onlyNumbers = text.replace(/\D/g, "")
                            
                                onChange(celularApplyMask(onlyNumbers));
                            }}
                            value={value}
                        />
                        {errors.celular_secundario && <Text style={styles.textError}>O campo deve ter no mínimo 15 caracteres!</Text>}
                    </>
                )}
                name="celular_secundario"
            />
            <Controller
                control={control}
                rules={{
                    minLength: 14,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text style={[styles.label, {width: 70}]}>Telefone</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            keyboardType="numeric"
                            maxLength={14}
                            onChangeText={(text) => {
                                const onlyNumbers = text.replace(/\D/g, "")
                            
                                onChange(telefoneApplyMask(onlyNumbers));
                            }}
                            value={value}
                        />
                        {errors.telefone && <Text style={styles.textError}>O campo deve ter no mínimo 14 caracteres!</Text>}
                    </>
                )}
                name="telefone"
            />
            <View style={styles.buttonSave}>
                <Button title={cliente ? "Atualizar" : "Cadastrar"} color={'#1cc88a'} onPress={handleSubmit(onSubmit)} />
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
