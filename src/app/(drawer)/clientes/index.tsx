import { router, Stack } from 'expo-router';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { Container } from '@/src/components/Container';
import { FontAwesome5 } from '@expo/vector-icons';
import ListCliente from '@/src/components/lists/ListCliente';

export default function Clientes() {
  const clientes = [
    {
      id: 1,
      nome: 'Indústria e Comércio de Chopeiras Ribeirão Preto ( MEMO )',
      nomeContato: 'Mônica',
      cpfCnpj: '07.874.061/0001-27',
    },   
    {
      id: 2,
      nome: 'Indústria e Comércio de Chopeiras Ribeirão Preto ( MEMO )',
      nomeContato: 'Mônica',
      cpfCnpj: '07.874.061/0001-27',
    }, 
  ];

  return (
    <>
      <Stack.Screen options={{ title: 'Clientes' }} />
      <Container>
        <View style={styles.container}>
          <FlatList
            data={clientes}
            renderItem={({ item }) => <ListCliente cliente={item} />}
            keyExtractor={item => item.id}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => {router.push("/clientes/create")}} activeOpacity={0.7}>
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
