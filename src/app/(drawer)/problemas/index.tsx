import { router, Stack } from 'expo-router';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { Container } from '@/src/components/Container';
import { FontAwesome5 } from '@expo/vector-icons';
import ListModel from '@/src/components/lists/ListModel';
import { showSweetAlert } from '@/src/components/sweetAlert';
import { useEffect, useState } from 'react';
import api from '@/src/services/api';

export default function Problemas() {
  const [data, setData] = useState(null);

	const fetchData = async () => {
    try {
      const response = await api.get(`/problema`);
      setData(response.data.data);
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
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: 'Problemas' }} />
      <Container>
        <View style={styles.container}>
          <FlatList
            data={data}
            renderItem={({ item }) => <ListModel model={item} path={'problemas'} url={'problema'} onRefresh={fetchData} />}
            keyExtractor={item => item.id}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => {router.push("/problemas/create")}} activeOpacity={0.7}>
          <FontAwesome5 name="plus" size={20} color={'#FFF'} />
        </TouchableOpacity>
      </Container>
    </>
  );
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
