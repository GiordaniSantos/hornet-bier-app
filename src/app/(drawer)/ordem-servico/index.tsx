import { router, Stack } from 'expo-router';
import { StyleSheet, TouchableOpacity, FlatList, Linking } from 'react-native';
import { Container } from '@/src/components/Container';
import { FontAwesome5, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import ListOrdemServico from '@/src/components/lists/ListOrdemServico';
import { useEffect, useState } from 'react';
import api from '@/src/services/api';
import Loading from '@/src/components/LoadingPage';
import { ShowAlertErroResponseApi } from '@/src/components/ShowAlertErrorResponseApi';
import { Dropdown } from 'react-native-element-dropdown';
import ModalTaxaPagamento from '@/src/components/ModalTaxaPagamento';

interface OrdemServico {
  id: number;
  numero: string;
  status: string;
  valor_total: string;
  data_entrada: string;
  data_saida: string;
  cliente_nome: string;
}

interface Cliente {
  id: number;
  nome: string;
}

interface Status {
  value: string;
  descricao: string;
}

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [SelectedId, setSelectedId] = useState();

  const [data, setData] = useState<OrdemServico[]>([]);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [clientes, setClientes] = useState<{ value: number; label: string }[]>([]);
  const [clienteId, setClienteId] = useState<number | null>(null);    
  const [status, setStatus] = useState<{ value: number; label: string }[]>([]);    
  const [statusSelected, setStatusSelected] = useState<string | null>('');

  const enviarLinkPagamentoWhatsapp = async (id : number | undefined, taxa : number) => {
    try {
      const response = await api.get(`/pagamento/get-link-pagamento-whatsapp/${id}?taxa=${taxa}`);
      const url = response.data;
   
      await Linking.openURL(url);
    } catch (e:any) {
      ShowAlertErroResponseApi(e);
    }
  };

  const handleConfirmLinkPagamento = (taxaSelecionada:number) => {
    enviarLinkPagamentoWhatsapp(SelectedId, taxaSelecionada)
  };

  const fetchRecursosFiltro = async () => {
    try {
      const response = await api.get(`/ordem-servico-recursos-filtro`);
      const clientesFormatados = response.data.clientes.map((cliente: Cliente) => ({
        value: cliente.id,
        label: cliente.nome
      }));
      clientesFormatados.unshift({ value: null, label: 'Selecione um cliente' });
      setClientes(clientesFormatados);

      const statusFormatados = response.data.status.map((status: Status) => ({
        value: status.value,
        label: status.descricao
      }));
      statusFormatados.unshift({ value: null, label: 'Selecione um status' });
      setStatus(statusFormatados);
    } catch (e:any) {
        ShowAlertErroResponseApi(e);
    }
  }

	const fetchData = async () => {
    if (!hasMoreData) return;
    setLoading(true);
    try {
      const response = await api.get(`/ordem-servico?page=${page}&cliente_id=${clienteId}&status=${statusSelected}`);

      setData([...data, ...response.data.data]);
      
      if(response.data.next_page_url){
        setPage(page + 1);
      }else{
        setHasMoreData(false);
      }
    } catch (e:any) {
      ShowAlertErroResponseApi(e);
    } finally {
      setLoading(false);
    }
  };

  const filterDataCliente = async (value : number) => {
    setClienteId(value)
    setData([]);
    setPage(1);
    setHasMoreData(true);
  };

  const filterDataStatus = async (value : string) => {
    setStatusSelected(value)
    setData([]);
    setPage(1);
    setHasMoreData(true);
  };

  useEffect(() => {
    fetchRecursosFiltro();
  }, []);

  useEffect(() => {
    fetchData();
  }, [clienteId, statusSelected])

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <Dropdown
          style={[styles.picker, styles.dropdown, {marginBottom: -5}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={clientes}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Selecione o cliente'}
          searchPlaceholder="Pesquise..."
          value={clientes.find(cliente => cliente.value === clienteId) || null}
          onChange={item => {
            filterDataCliente(item.value);
          }}
          renderLeftIcon={() => (
              <FontAwesome5 name="user" style={styles.icon} size={20} color="black" />
          )}
        />
        <Dropdown
          style={[styles.picker, styles.dropdown, {marginBottom: 10}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={status}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Selecione o status'}
          searchPlaceholder="Pesquise..."
          value={statusSelected}
          onChange={item => {
            filterDataStatus(String(item.value));
          }}
          renderLeftIcon={() => (
              <MaterialCommunityIcons name="list-status" style={styles.icon} size={20} color="black" />
          )}
        />
        <FlatList
          data={data}
          renderItem={({ item }) => <ListOrdemServico ordemServico={item} setModalVisible={setModalVisible} setSelectedId={setSelectedId} />}
          keyExtractor={item => item.id.toString()}
          onEndReached={fetchData}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            <Loading loading={loading} />
          }
        />
        <TouchableOpacity style={styles.selectButton} onPress={() => {router.push("/ordem-servico/select")}} activeOpacity={0.7}>
          <AntDesign name="select1" size={20} color={'#FFF'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={() => {router.push("/ordem-servico/create")}} activeOpacity={0.7}>
          <FontAwesome5 name="plus" size={20} color={'#FFF'} />
        </TouchableOpacity>
        <ModalTaxaPagamento
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onConfirm={handleConfirmLinkPagamento}
        />
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  selectButton: {
    position: 'absolute',
    right: 15,
    bottom: 100,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#000',
    justifyContent: 'center',
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
  picker: {
    height: 45,
  },
  dropdown: {
    height: 45,
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 10,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
