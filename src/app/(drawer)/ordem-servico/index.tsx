import { router, Stack } from 'expo-router';
import { StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Container } from '@/src/components/Container';
import { FontAwesome5 } from '@expo/vector-icons';
import ListOrdemServico from '@/src/components/lists/ListOrdemServico';
import { useEffect, useState } from 'react';
import api from '@/src/services/api';
import Loading from '@/src/components/LoadingPage';
import { ShowAlertErroResponseApi } from '@/src/components/ShowAlertErrorResponseApi';

interface OrdemServico {
  id: number;
  numero: string;
  status: string;
  valor_total: string;
  data_entrada: string;
  data_saida: string;
  cliente_nome: string;
}

export default function Home() {
  const [data, setData] = useState<OrdemServico[]>([]);
  const [page, setPage] = useState(1);
  const [hasMoreData, SetHasMoreData] = useState(true);
  const [loading, setLoading] = useState(false);

	const fetchData = async () => {
    if (!hasMoreData || loading) return;
    setLoading(true);
    try {
      const response = await api.get(`/ordem-servico?page=${page}`);
      const current = response.data.data;
      setData(prev => [...prev, ...current]);
      
      if(response.data.next_page_url){
        setPage(prev => prev + 1);
      }else{
        SetHasMoreData(false);
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
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <FlatList
          data={data}
          renderItem={({ item }) => <ListOrdemServico ordemServico={item} />}
          keyExtractor={item => item.id.toString()}
          onEndReached={fetchData}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            <Loading loading={hasMoreData} />
          }
        />
        <TouchableOpacity style={styles.addButton} onPress={() => {router.push("/ordem-servico/create")}} activeOpacity={0.7}>
          <FontAwesome5 name="plus" size={20} color={'#FFF'} />
        </TouchableOpacity>
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
