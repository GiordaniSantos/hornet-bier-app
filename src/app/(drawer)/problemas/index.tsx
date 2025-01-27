import { router, Stack } from 'expo-router';
import { StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { Container } from '@/src/components/Container';
import { FontAwesome5 } from '@expo/vector-icons';
import ListModel from '@/src/components/lists/ListModel';
import { useEffect, useState } from 'react';
import api from '@/src/services/api';
import Loading from '@/src/components/LoadingPage';
import { ShowAlertErroResponseApi } from '@/src/components/ShowAlertErrorResponseApi';

interface Problema {
  id: number;
  nome: string;
  created_at: string;
}

export default function Problemas() {
  const [data, setData] = useState<Problema[]>([]);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    if(!hasMoreData) return
    setLoading(true);
    try {
      const response = await api.get(`/problema?page=${page}&termo=${searchTerm}`);

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

  const filterData = async (text : string) => {
    setSearchTerm(text);
    setData([]);
    setPage(1);
    setHasMoreData(true);
  }

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  return (
    <>
      <Stack.Screen options={{ title: 'Problemas' }} />
      <Container>
        <TextInput
          placeholder="Buscar peças..."
          value={searchTerm}
          onChangeText={text => filterData(text)}
          style={styles.input}
        />
        <FlatList
          data={data}
          renderItem={({ item }) => <ListModel model={item} path={'problemas'} url={'problema'} />}
          keyExtractor={item => item.id.toString()}
          onEndReached={fetchData}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            <Loading loading={loading} />
          }
        />
        <TouchableOpacity style={styles.addButton} onPress={() => {router.push("/problemas/create")}} activeOpacity={0.7}>
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
