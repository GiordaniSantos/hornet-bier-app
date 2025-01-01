import { router, Stack } from 'expo-router';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { Container } from '@/src/components/Container';
import { FontAwesome5 } from '@expo/vector-icons';
import ListModel from '@/src/components/lists/ListModel';

export default function Marcas() {
  const marcas = [
    {
      id: 1,
      nome: 'Ice Box',
      dataCriacao: '24/12/2024',
    },   
    {
      id: 2,
      nome: 'Menila',
      dataCriacao: '24/12/2024',
    },
  ];

  return (
    <>
      <Stack.Screen options={{ title: 'Marcas' }} />
      <Container>
        <View style={styles.container}>
          <FlatList
            data={marcas}
            renderItem={({ item }) => <ListModel model={item} path={'marcas'} />}
            keyExtractor={item => item.id}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => {router.push("/marcas/create")}} activeOpacity={0.7}>
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
