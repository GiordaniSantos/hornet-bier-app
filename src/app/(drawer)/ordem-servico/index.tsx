import { router, Stack } from 'expo-router';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { Container } from '@/src/components/Container';
import { FontAwesome5 } from '@expo/vector-icons';
import ListOrdemServico from '@/src/components/lists/ListOrdemServico';

export default function Home() {
  const ordensServico = [
    {
      id: '1',
      numeroOs: '131.26.2024',
      status: 'ABERTO',
      cliente: 'DublinBier',
      valorTotal: 280.00,
      dataEntrada: '23/12/2024',
      dataSaida: '24/12/2024',
    },
    {
      id: '2',
      numeroOs: '131.26.2024',
      status: 'EM ANDAMENTO',
      cliente: 'Indústria e Comércio de Chopeiras Ribeirão Preto ( MEMO )',
      valorTotal: 280.00,
      dataEntrada: '23/12/2024',
      dataSaida: '24/12/2024',
    },
    {
      id: '3',
      numeroOs: '131.26.2024',
      status: 'FECHADO',
      cliente: 'Indústria e Comércio de Chopeiras Ribeirão Preto ( MEMO )',
      valorTotal: 280.00,
      dataEntrada: '23/12/2024',
      dataSaida: '24/12/2024',
    },
  ];

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <View style={styles.container}>
          <FlatList
            data={ordensServico}
            renderItem={({ item }) => <ListOrdemServico ordemServico={item} />}
            keyExtractor={item => item.id}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => {router.push("/ordem-servico/create")}} activeOpacity={0.7}>
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
