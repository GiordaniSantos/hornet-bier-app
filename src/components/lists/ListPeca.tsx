import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Link } from 'expo-router';

interface Peca {
    id: number;
    nome: string;
    valorUnitario: number;
    dataCriacao: string;
}

interface ListPecaProps {
    peca: Peca;
}

export default function ListPeca({peca}: ListPecaProps) {

    return (
        <View style={styles.card}>
            <View style={{padding:16}}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>{peca.nome}</Text>
                    </View>
                </View>
                <Text style={styles.item}>Valor total: R${peca.valorUnitario.toFixed(2)}</Text>
                <Text style={styles.item}>Data de Criação: {peca.dataCriacao}</Text>
                <View style={styles.containerButtons}>
                    <Link href={`/pecas/edit/${peca.id}`} style={styles.button} asChild>
                        <FontAwesome5 name="edit" size={14} color={'#000'} />
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
    marginTop: 12,
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
