import { Stack } from 'expo-router';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Container } from '@/src/components/Container';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.header}>
              <View>
                <Text style={styles.title}>131.26.2024</Text>
                <Text style={styles.badgeOpen}>DublinBier</Text>
              </View>
              <Text style={[styles.badgeApproved, styles.colorApproved]}>ABERTO</Text>
            </View>
            <Text style={styles.author}>Valor total: R$280,00</Text>
            <Text style={styles.date}>
              Entrada em: 23/12/2024 | Saída: 24/12/2024
            </Text>
            <View style={styles.containerButtons}>
              <TouchableOpacity style={styles.button} onPress={() => {/* Navigate to project */}}>
                <FontAwesome5 name="edit" size={14} color={'#000'} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => {/* Navigate to project */}}>
                <FontAwesome5 name="eye" size={14} color={'#000'} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => {/* Navigate to project */}}>
                <FontAwesome5 name="trash" size={14} color={'#000'} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => {/* Navigate to project */}}>
                <FontAwesome5 name="whatsapp" size={14} color={'#000'} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.header}>
              <View>
                <Text style={styles.title}>129.35.2024</Text>
                <Text style={styles.badgeOpen}>Indústria e Comércio de Chopeiras Ribeirão Preto ( MEMO )</Text>
              </View>
              <Text style={[styles.badgeApproved, styles.colorClosed]}>FECHADO</Text>
            </View>
            <Text style={styles.author}>Valor total: R$280,00</Text>
            <Text style={styles.date}>
              Entrada em: 23/12/2024 | Saída: 24/12/2024
            </Text>
            <View style={styles.containerButtons}>
              <TouchableOpacity style={styles.button} onPress={() => {/* Navigate to project */}}>
                <FontAwesome5 name="edit" size={14} color={'#000'} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => {/* Navigate to project */}}>
                <FontAwesome5 name="eye" size={14} color={'#000'} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => {/* Navigate to project */}}>
                <FontAwesome5 name="trash" size={14} color={'#000'} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => {/* Navigate to project */}}>
                <FontAwesome5 name="whatsapp" size={14} color={'#000'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    height: 210,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    backgroundColor: '#fff',
    padding: 16,
    margin: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
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
  badgeApproved: {
    color: '#fff',
    fontSize: 14,
    padding: 5,
    borderRadius: 8,
  },
  author: {
    marginTop: 12,
    marginBottom: 4,
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
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
});
