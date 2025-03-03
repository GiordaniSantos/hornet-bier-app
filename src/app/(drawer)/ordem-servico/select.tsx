import { StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';
import { Container } from '@/src/components/Container';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import ListOrdemServicoSelect from '@/src/components/lists/ListOrdemServicoSelect';
import { useEffect, useState } from 'react';
import api from '@/src/services/api';
import Loading from '@/src/components/LoadingPage';
import { Dropdown } from 'react-native-element-dropdown';
import { ShowAlertErroResponseApi } from '@/src/components/ShowAlertErrorResponseApi';
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

export default function Select() {
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState<OrdemServico[]>([]);
    const [clientes, setClientes] = useState<{ value: number; label: string }[]>([]);    
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [clienteId, setClienteId] = useState<number | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const fetchClientes = async () => {
        try {
            const response = await api.get(`/select-clientes`);
            const clientesFormatados = response.data.map((cliente: Cliente) => ({
                value: cliente.id,
                label: cliente.nome
            }));
            setClientes(clientesFormatados);
        } catch (e:any) {
            ShowAlertErroResponseApi(e);
        }
    }

    const fetchData = async () => {
        if(!hasMoreData || clienteId === null) return
        setLoading(true);
        try {
          const response = await api.get(`/ordem-servico?page=${page}&cliente_id=${clienteId}`);
    
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

    const enviarOrcamentosWhatsapp = async (ids : number[]) => {
        try {
            const response = await api.post(`/ordem-servico/get-url-multiplo-orcamento-whatsapp`, {ids: ids});
            const url = response.data.url;
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            }
        } catch (e:any) {
            ShowAlertErroResponseApi(e);
        }
    };

    const enviarLinkPagamentoOrcamentosWhatsapp = async (ids : number[], taxa : number) => {
        try {
            const response = await api.post(`/pagamento/get-link-multiplo-pagamento-whatsapp?taxa=${taxa}`, {ids: ids});
            const url = response.data.url;
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            }
        } catch (e:any) {
            ShowAlertErroResponseApi(e);
        }
    };

    const handleConfirmLinkPagamento = (taxaSelecionada:number) => {
        enviarLinkPagamentoOrcamentosWhatsapp(selectedIds, taxaSelecionada);
    };

    const filterData = async (value : number) => {
        setClienteId(value)
        setData([]);
        setPage(1);
        setHasMoreData(true);
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    useEffect(() => {
        fetchData();
    }, [clienteId]);

    return (
        <>
            <Container>
                <Dropdown
                    style={[styles.picker, styles.dropdown, {marginBottom: 20}]}
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
                        filterData(item.value);
                    }}
                    renderLeftIcon={() => (
                        <FontAwesome5 name="user" style={styles.icon} size={20} color="black" />
                    )}
                />
                <FlatList
                    data={data}
                    renderItem={({ item }) => <ListOrdemServicoSelect ordemServico={item} selectedIds={selectedIds} setSelectedIds={setSelectedIds} />}
                    keyExtractor={item => item.id.toString()}
                    onEndReached={fetchData}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={
                        <Loading loading={loading} />
                    }
                />
                {selectedIds.length >= 1 && 
                    (
                        <>
                            <TouchableOpacity style={styles.paymentButton} onPress={() => {setModalVisible(true)}} activeOpacity={0.7}>
                                <MaterialIcons name="attach-money" size={20} color={'#FFF'} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.whatsappButton} onPress={() => {enviarOrcamentosWhatsapp(selectedIds)}} activeOpacity={0.7}>
                                <FontAwesome5 name="whatsapp" size={20} color={'#FFF'} />
                            </TouchableOpacity>
                        </>
                    )
                }
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
    paymentButton: {
        position: 'absolute',
        right: 15,
        bottom: 90,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    whatsappButton: {
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
        height: 50,
    },
    dropdown: {
        height: 50,
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
