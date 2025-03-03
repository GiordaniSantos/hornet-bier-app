import { StyleSheet, View, Text, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { showSweetAlert } from '../sweetAlert';
import api from '@/src/services/api';
import { convertValor } from '@/src/utils/format-valor-to-real';
import { ShowAlertErroResponseApi } from '../ShowAlertErrorResponseApi';

interface OrdemServico {
  id: number;
  numero: string;
  status: string;
  valor_total: string;
  data_entrada: string;
  data_saida: string;
  cliente_nome: string;
}

interface ListOrdemServicoProps {
  ordemServico: OrdemServico;
  setModalVisible: any;
  setSelectedId: any;
}

export default function ListOrdemServico({ordemServico, setModalVisible, setSelectedId}: ListOrdemServicoProps) {
  const getStatusStyle = (status:string) => {
    switch (status) {
      case 'Aberto':
        return styles.colorApproved;
      case 'Em Andamento':
        return styles.colorProgress;
      case 'Fechado':
        return styles.colorClosed;
      case 'Não Executado':
        return styles.colorClosed;
      default:
        return {};
    }
  };

  const deleteOrdemServico = async (id:number) => {
    try {
      await api.delete(`/ordem-servico/${id}`)
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
      router.replace("/ordem-servico")
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

  const enviarOrcamentoWhatsapp = async (id : number) => {
    try {
      const response = await api.get(`/ordem-servico/get-url-orcamento-whatsapp/${id}`);
      const url = response.data;
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    } catch (e:any) {
      ShowAlertErroResponseApi(e);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={[styles.btnStatus, getStatusStyle(ordemServico.status)]}>{ordemServico.status}</Text>
      <View style={{padding:16}}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>{ordemServico.numero}</Text>
            <Text style={styles.titleCliente}>{ordemServico.cliente_nome}</Text>
          </View>
        </View>
        <Text style={styles.item}>Valor total: R${convertValor(ordemServico.valor_total)}</Text>
        <Text style={styles.date}>
          Entrada em: {ordemServico.data_entrada ? ordemServico.data_entrada : 'N/I'} | Saída: {ordemServico.data_saida ? ordemServico.data_saida : 'N/I'}
        </Text>
        <View style={styles.containerButtons}>
          <Link href={`/ordem-servico/edit/${ordemServico.id}`} style={styles.button} asChild>
            <FontAwesome5 name="edit" size={14} color={'#000'} />
          </Link>
          <Link href={`/ordem-servico/view/${ordemServico.id}`} style={styles.button} asChild>
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
                deleteOrdemServico(ordemServico.id)
              },
              onClose: () => {},
              type: 'info',
            });
          }}>
            <FontAwesome5 name="trash" size={14} color={'#000'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {enviarOrcamentoWhatsapp(ordemServico.id)}}>
            <FontAwesome5 name="whatsapp" size={14} color={'#000'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {
            setSelectedId(ordemServico.id)
            setModalVisible(true)
            }}>
            <MaterialIcons name="attach-money" size={16} color={'#000'} />
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
  colorApproved: {
    backgroundColor: '#28a745'
  },
  colorClosed: {
    backgroundColor: '#ad3a13'
  },
  colorProgress: {
    backgroundColor: 'rgb(255,200,50)'
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
