import { router, Stack } from 'expo-router';
import { StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Container } from '@/src/components/Container';
import { FontAwesome5 } from '@expo/vector-icons';
import ListPeca from '@/src/components/lists/ListPeca';
import { useEffect, useState } from 'react';
import api from '@/src/services/api';
import Loading from '@/src/components/LoadingPage';
import { ShowAlertErroResponseApi } from '@/src/components/ShowAlertErrorResponseApi';

interface Peca {
  id: number;
  nome: string;
  valor_unitario: string;
  created_at: string;
}

export default function Pecas() {
  const [data, setData] = useState<Peca[]>([]);
  const [page, setPage] = useState(1);
  const [hasMoreData, SetHasMoreData] = useState(true);
  const [loading, setLoading] = useState(false);

	const fetchData = async () => {
    if (!hasMoreData || loading) return;
    setLoading(true);
    try {
      const response = await api.get(`/peca?page=${page}`);
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
      <Stack.Screen options={{ title: 'Pecas' }} />
      <Container>
        <FlatList
          data={data}
          renderItem={({ item }) => <ListPeca peca={item} />}
          keyExtractor={item => item.id.toString()}
          onEndReached={fetchData}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            <Loading loading={hasMoreData} />
          }
        />
        <TouchableOpacity style={styles.addButton} onPress={() => {router.push("/pecas/create")}} activeOpacity={0.7}>
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
