import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { showSweetAlert } from '../sweetAlert';
import api from '@/src/services/api';

interface Cliente {
  id: number;
  nome: string;
  nome_contato: string;
  cpf_cnpj: string;
}

interface ListClienteProps {
  cliente: Cliente;
}

export default function ListCliente({cliente}: ListClienteProps) {
  const deleteModel = async (id:number) => {
    try {
      await api.delete(`/cliente/${id}`)
      showSweetAlert({
        title: 'Sucesso!',
        text: 'Registro deletado com sucesso!',
        showCancelButton: false,
        cancelButtonText: 'Não, cancelar',
        confirmButtonText: 'Ok',
        onConfirm: () => {},
        onClose: () => {},
        type: 'success',
      });
      router.replace("/clientes")
    } catch (e:any) {
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

  return (
    <View style={styles.card}>
      <View style={{padding:16}}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>{cliente.nome}</Text>
          </View>
        </View>
        <Text style={styles.item}>Contato: {cliente.nome_contato}</Text>
        <Text style={[styles.item, {marginTop: 3, marginBottom: 0}]}>CNPJ/CPF: {cliente.cpf_cnpj}</Text>
        <View style={styles.containerButtons}>
          <Link href={`/clientes/edit/${cliente.id}`} style={styles.button} asChild>
            <FontAwesome5 name="edit" size={14} color={'#000'} />
          </Link>
          <Link href={`/clientes/view/${cliente.id}`} style={styles.button} asChild>
            <FontAwesome5 name="eye" size={14} color={'#000'} />
          </Link>
          <TouchableOpacity style={styles.button} onPress={() => {
            showSweetAlert({
              title: 'Deletar Registro',
              text: 'Você tem certeza que quer deletar este registro?',
              showCancelButton: true,
              cancelButtonText: 'Não, cancelar',
              confirmButtonText: 'Sim, deletar!',
              onConfirm: () => {
                deleteModel(cliente.id)
              },
              onClose: () => {},
              type: 'info',
            });
          }}>
            <FontAwesome5 name="trash" size={14} color={'#000'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    height: 'auto',
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginBottom: 10,
    marginTop: 10,
    marginRight: 15,
    marginLeft: 15,
    position: 'relative',
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  item: {
    marginTop: 6,
    marginBottom: 4,
    color: '#6c757d',
    fontSize: 14,
  },
  containerButtons: {
    display: 'flex', 
    flexDirection: 'row',
    marginBottom: 5
  },
  button: {
    marginTop: 20,
    marginRight: 10,
    backgroundColor: 'transparent',
    borderColor: '#ff3a00',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
});
