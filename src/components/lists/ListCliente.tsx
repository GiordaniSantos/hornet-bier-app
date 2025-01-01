import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Link } from 'expo-router';

interface Cliente {
    id: number;
    nome: string;
    nomeContato: string;
    cpfCnpj: string;
}

interface ListClienteProps {
    cliente: Cliente;
}

export default function ListCliente({cliente}: ListClienteProps) {

    return (
        <View style={styles.card}>
            <View style={{padding:16}}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>{cliente.nome}</Text>
                    </View>
                </View>
                <Text style={styles.item}>Contato: {cliente.nomeContato}</Text>
                <Text style={[styles.item, {marginTop: 3, marginBottom: 0}]}>CNPJ/CPF: {cliente.cpfCnpj}</Text>
                <View style={styles.containerButtons}>
                    <Link href={`/clientes/edit/${cliente.id}`} style={styles.button} asChild>
                        <FontAwesome5 name="edit" size={14} color={'#000'} />
                    </Link>
                    <Link href={`/clientes/view/${cliente.id}`} style={styles.button} asChild>
                        <FontAwesome5 name="eye" size={14} color={'#000'} />
                    </Link>
                    <TouchableOpacity style={styles.button} onPress={() => {/* Navigate to project */}}>
                        <FontAwesome5 name="trash" size={14} color={'#000'} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    height: 'auto',
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginBottom: 10,
    marginTop: 10,
    marginRight: 15,
    marginLeft: 15,
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
    marginBottom: 8,
  },
  item: {
    marginTop: 6,
    marginBottom: 4,
    color: '#6c757d',
    fontSize: 14,
  },
  containerButtons: {
    display: 'flex', 
    flexDirection: 'row',
    marginBottom: 5
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
});
