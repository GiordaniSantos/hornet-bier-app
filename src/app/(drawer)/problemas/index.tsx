import { router, Stack } from 'expo-router';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Container } from '@/src/components/Container';
import { FontAwesome5 } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function Problemas() {

  return (
    <>
      <Stack.Screen options={{ title: 'Problemas' }} />
      <Container>
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={{padding:16}}>
              <View style={styles.header}>
                <View>
                  <Text style={styles.title}>Cooler Queimado 15x15x50</Text>
                </View>
              </View>
              <Text style={styles.author}>Data de Criação: 18/12/2024</Text>
              <View style={styles.containerButtons}>
                <Link href="/problemas/edit/1234" style={styles.button} asChild>
                  <FontAwesome5 name="edit" size={14} color={'#000'} />
                </Link>
                <TouchableOpacity style={styles.button} onPress={() => {/* Navigate to project */}}>
                  <FontAwesome5 name="trash" size={14} color={'#000'} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.card}>
            <View style={{padding:16}}>
              <View style={styles.header}>
                <View>
                  <Text style={styles.title}>Fabricação Chopeira</Text>
                </View>
              </View>
              <Text style={styles.author}>Data de Criação: 10/12/2024</Text>
              <View style={styles.containerButtons}>
                <TouchableOpacity style={styles.button} onPress={() => {/* Navigate to project */}}>
                  <FontAwesome5 name="edit" size={14} color={'#000'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {/* Navigate to project */}}>
                  <FontAwesome5 name="trash" size={14} color={'#000'} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
  card: {
    borderRadius: 15,
    height: 160,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginBottom: 15,
    position: 'relative',
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  badgeContainer: {
    marginBottom: 12,
  },
  badgeSecondary: {
    backgroundColor: '#6c757d',
    color: '#fff',
    fontSize: 14,
    padding: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  badgeOpen: {
    backgroundColor: '#f8f9fa',
    color: '#343a40',
    fontWeight: '700',
    fontSize: 14,
    padding: 4,
    borderRadius: 8,
  },
  colorApproved: {
    backgroundColor: '#28a745'
  },
  colorClosed: {
    backgroundColor: '#ad3a13'
  },
  btnStatus: {
    color: '#fff',
    fontSize: 14,
    paddingTop: 8,
    paddingRight: 20,
    paddingBottom: 8,
    paddingLeft: 20,
    borderRadius: 8,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  author: {
    marginTop: 4,
    color: '#6c757d',
    fontSize: 14,
  },
  date: {
    color: '#6c757d',
    fontSize: 14,
  },
  containerButtons: {
    display: 'flex', 
    flexDirection: 'row'
  },
  button: {
    marginTop: 20,
    marginRight: 10,
    backgroundColor: 'transparent',
    borderColor: '#ff3a00',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
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
