import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { showSweetAlert } from '../sweetAlert';
import api from '@/src/services/api';
import { ShowAlertErroResponseApi } from '../ShowAlertErrorResponseApi';

interface Pagamento {
  id: number;
  status: string;
  tipo_taxa: string;
  valor: string;
  itens: number;
  created_at: string;
}

interface ListPagamentoProps {
  pagamento: Pagamento;
}

export default function ListPagamento({pagamento}: ListPagamentoProps) {
  const getStatusStyle = (status:string) => {
    switch (status) {
      case 'Pago':
        return styles.colorIsPaid;
      case 'Não Pago':
        return styles.colorNotPaid;
      default:
        return {};
    }
  };

  const deletePagamento = async (id:number) => {
    try {
      await api.delete(`/pagamento/${id}`)
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
      router.replace("/pagamentos")
    } catch (e:any) {
      ShowAlertErroResponseApi(e);
    }
  }

  const setStatus = async (id:number) => {
    try {
      await api.get(`/set-status-pagamento/${id}`)
      showSweetAlert({
        title: 'Sucesso!',
        text: 'Status alterado com sucesso!',
        showCancelButton: false,
        cancelButtonText: 'Não, cancelar',
        confirmButtonText: 'Ok',
        onConfirm: () => {},
        onClose: () => {},
        type: 'success',
      });
      router.replace("/pagamentos")
    } catch (e:any) {
      ShowAlertErroResponseApi(e);
    }
  }

  return (
    <View style={styles.card}>
      <Text style={[styles.btnStatus, getStatusStyle(pagamento.status)]}>{pagamento.status}</Text>
      <View style={{padding:16}}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Pagamento #{pagamento.id}</Text>
            <Text style={styles.titleCliente}>{pagamento.created_at}</Text>
          </View>
        </View>
        <Text style={styles.item}>Valor: R$ {pagamento.valor}</Text>
        <Text style={styles.date}>
          Taxa Cobrada: {pagamento.tipo_taxa} | {pagamento.itens == 1 ? pagamento.itens + ' item' : pagamento.itens + ' itens'}
        </Text>
        <View style={styles.containerButtons}>
          <Link href={`/pagamentos/view/${pagamento.id}`} style={styles.button} asChild>
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
                deletePagamento(pagamento.id)
              },
              onClose: () => {},
              type: 'info',
            });
          }}>
            <FontAwesome5 name="trash" size={14} color={'#000'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setStatus(pagamento.id)}>
            <FontAwesome5 name="check" size={14} color={'#000'} />
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
  titleCliente: {
    backgroundColor: '#f8f9fa',
    color: '#343a40',
    fontWeight: '700',
    fontSize: 14,
    padding: 4,
    borderRadius: 8,
  },
  colorIsPaid: {
    backgroundColor: '#28a745'
  },
  colorNotPaid: {
    backgroundColor: '#858796'
  },
  btnStatus: {
    color: '#fff',
    fontSize: 14,
    paddingTop: 8,
    paddingRight: 20,
    paddingBottom: 8,
    paddingLeft: 20,
    borderRadius: 8,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    textTransform: 'uppercase'
  },
  item: {
    marginTop: 12,
    marginBottom: 4,
    color: '#6c757d',
    fontSize: 14,
  },
  date: {
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
  addButton: {
    position: 'absolute',
    right: 15,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
