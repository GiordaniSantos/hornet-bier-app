import { router, Stack } from 'expo-router';
import { StyleSheet, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Container } from '@/src/components/Container';
import { FontAwesome5 } from '@expo/vector-icons';
import ListModel from '@/src/components/lists/ListModel';
import { useEffect, useState } from 'react';
import api from '@/src/services/api';
import { showSweetAlert } from '@/src/components/sweetAlert';

interface Servico {
  id: number;
  nome: string;
  created_at: string;
}

export default function Servicos() {
  const [data, setData] = useState<Servico[]>([]);
  const [page, setPage] = useState(1);
  const [hasMoreData, SetHasMoreData] = useState(true);
  const [loading, setLoading] = useState(false);

	const fetchData = async () => {
    if (!hasMoreData || loading) return;
    setLoading(true);
    try {
      const response = await api.get(`/servico?page=${page}`);
      const current = response.data.data;
      setData(prev => [...prev, ...current]);
      
      if(response.data.next_page_url){
        setPage(prev => prev + 1);
      }else{
        SetHasMoreData(false);
      }
    } catch (e:any) {
      const errorMessage = e.response?.data?.message || 'Ocorreu um erro inesperado.';
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: 'Serviços' }} />
      <Container>
        <FlatList
          data={data}
          renderItem={({ item }) => <ListModel model={item} path={'servicos'} url={'servico'} onRefresh={fetchData} />}
          keyExtractor={item => item.id.toString()}
          onEndReached={fetchData}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            <Loading loading={hasMoreData} />
          }
        />
        <TouchableOpacity style={styles.addButton} onPress={() => {router.push("/servicos/create")}} activeOpacity={0.7}>
          <FontAwesome5 name="plus" size={20} color={'#FFF'} />
        </TouchableOpacity>
      </Container>
    </>
  );
}

function Loading({loading}:{loading:boolean}){
  if(loading){
    return <ActivityIndicator size={'large'} color={'#ff3a00'} style={{marginBottom: 20, marginTop: 15}} />
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
