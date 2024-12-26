import { Stack } from 'expo-router';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Container } from '@/src/components/Container';
import { ScreenContent } from '@/src/components/ScreenContent';

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
              <Text style={styles.badgeApproved}>ABERTO</Text>
            </View>
            <Text style={styles.author}>Valor total: R$280,00</Text>
            <Text style={styles.date}>
              Entrada em: 23/12/2024 | Saída: 24/12/2024
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => {/* Navigate to project */}}>
              <Text style={styles.buttonText}>Saiba Mais</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            <View style={styles.header}>
              <View>
                <Text style={styles.title}>129.35.2024</Text>
                <Text style={styles.badgeOpen}>Indústria e Comércio de Chopeiras Ribeirão Preto ( MEMO )</Text>
              </View>
              <Text style={styles.badgeApproved}>FECHADO</Text>
            </View>
            <Text style={styles.author}>Valor total: R$280,00</Text>
            <Text style={styles.date}>
              Entrada em: 23/12/2024 | Saída: 24/12/2024
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => {/* Navigate to project */}}>
              <Text style={styles.buttonText}>Saiba Mais</Text>
            </TouchableOpacity>
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
    height: 280,
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
  badgeApproved: {
    backgroundColor: '#28a745',
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
  button: {
    marginTop: 16,
    backgroundColor: 'transparent',
    borderColor: '#28a745',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#28a745',
    fontSize: 16,
  },
});
