import { router, Stack } from 'expo-router';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { Container } from '@/src/components/Container';
import { FontAwesome5 } from '@expo/vector-icons';
import ListModel from '@/src/components/lists/ListModel';

export default function Problemas() {
  const problemas = [
    {
      id: 1,
      nome: 'Cooler Queimado 15x15x50',
      dataCriacao: '24/12/2024',
    },   
    {
      id: 2,
      nome: 'Fabricação Chopeira',
      dataCriacao: '24/12/2024',
    },
  ];

  return (
    <>
      <Stack.Screen options={{ title: 'Problemas' }} />
      <Container>
        <View style={styles.container}>
          <FlatList
            data={problemas}
            renderItem={({ item }) => <ListModel model={item} path={'problemas'} />}
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
