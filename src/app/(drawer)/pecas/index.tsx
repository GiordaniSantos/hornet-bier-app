import { router, Stack } from 'expo-router';
import { StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Container } from '@/src/components/Container';
import { FontAwesome5 } from '@expo/vector-icons';
import ListPeca from '@/src/components/lists/ListPeca';
import { useEffect, useState } from 'react';
import api from '@/src/services/api';
import Loading from '@/src/components/LoadingPage';
import { ShowAlertErroResponseApi } from '@/src/components/ShowAlertErrorResponseApi';
import SearchBar from '@/src/components/SearchBar';
import { Controller, useForm } from 'react-hook-form';

interface Peca {
  id: number;
  nome: string;
  valor_unitario: string;
  created_at: string;
}

export default function Pecas() {
  const { control, handleSubmit, reset, watch } = useForm();
  const [data, setData] = useState<Peca[]>([]);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [loading, setLoading] = useState(false);

	const fetchData = async (searchTerm = '') => {
    if(!hasMoreData) return
    setLoading(true);
    try {
      const response = await api.get(`/peca?page=${page}&termo=${searchTerm}`);

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

  const onSubmit = (data: { searchTerm: string }) => {
    const { searchTerm } = data;
    setData([]);
    setPage(1);
    setHasMoreData(true);
    fetchData(searchTerm);
  };

  const clearFilter = () => {
    reset();
    setData([]);
    setPage(1);
    setHasMoreData(true);
    fetchData();
  };

  useEffect(() => {
    fetchData('');
  }, []);

  const searchTermAtual = watch('searchTerm');

  return (
    <>
      <Stack.Screen options={{ title: 'Pecas' }} />
      <Container>
        <Controller
          control={control}
          name="searchTerm"
          defaultValue=""
          render={({ field: { onChange, onBlur, value } }) => (
            <SearchBar
              onChange={onChange}
              onBlur={onBlur}
              onSubmit={onSubmit}
              value={value}
              handleSubmit={handleSubmit}
              clearFilter={clearFilter}
            />
          )}
        />
        <FlatList
          data={data}
          renderItem={({ item }) => <ListPeca peca={item} />}
          keyExtractor={item => item.id.toString()}
          onEndReached={() => fetchData(searchTermAtual)}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            <Loading loading={loading} />
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
  input: {
		height: 50,
		borderColor: '#ccc',
		borderRadius: 5,
		borderWidth: 1,
		paddingHorizontal: 10,
		paddingVertical: 10,
		margin: 10,
		backgroundColor: '#fff'
	},
});
