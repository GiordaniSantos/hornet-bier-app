import { Stack } from 'expo-router';
import { StyleSheet, FlatList } from 'react-native';
import { Container } from '@/src/components/Container';
import ListPagamento from '@/src/components/lists/ListPagamento';
import { useEffect, useState } from 'react';
import api from '@/src/services/api';
import Loading from '@/src/components/LoadingPage';
import { ShowAlertErroResponseApi } from '@/src/components/ShowAlertErrorResponseApi';

interface Pagamento {
    id: number;
    status: string;
    tipo_taxa: string;
    valor: string;
    itens: number;
    created_at: string;
}

export default function Pagamentos() {
    const [data, setData] = useState<Pagamento[]>([]);
    const [page, setPage] = useState(1);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [loading, setLoading] = useState(false);

	const fetchData = async () => {
        if(!hasMoreData) return
        setLoading(true);
        try {
            const response = await api.get(`/pagamento?page=${page}`);

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

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Stack.Screen options={{ title: 'Pagamentos' }} />
            <Container>
                <FlatList
                    data={data}
                    renderItem={({ item }) => <ListPagamento pagamento={item} />}
                    keyExtractor={item => item.id.toString()}
                    onEndReached={() => fetchData()}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={
                        <Loading loading={loading} />
                    }
                />
            </Container>
        </>
    );
}

const styles = StyleSheet.create({
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
