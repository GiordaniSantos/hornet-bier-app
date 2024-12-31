import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Link } from 'expo-router';

interface OrdemServico {
    id: string;
    numeroOs: string;
    status: string;
    cliente: string;
    valorTotal: number;
    dataEntrada: string;
    dataSaida: string;
}

interface ListOrdemServicoProps {
    ordemServico: OrdemServico;
}

export default function ListOrdemServico({ordemServico}: ListOrdemServicoProps) {
    const getStatusStyle = (status:string) => {
        switch (status) {
          case 'ABERTO':
            return styles.colorApproved;
          case 'EM ANDAMENTO':
            return styles.colorProgress;
          case 'FECHADO':
            return styles.colorClosed;
          default:
            return {};
        }
    };

    return (
        <View style={styles.card}>
            <Text style={[styles.btnStatus, getStatusStyle(ordemServico.status)]}>{ordemServico.status}</Text>
            <View style={{padding:16}}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>{ordemServico.numeroOs}</Text>
                        <Text style={styles.titleCliente}>{ordemServico.cliente}</Text>
                    </View>
                </View>
                <Text style={styles.item}>Valor total: R${ordemServico.valorTotal.toFixed(2)}</Text>
                <Text style={styles.date}>
                    Entrada em: {ordemServico.dataEntrada} | Saída: {ordemServico.dataSaida}
                </Text>
                <View style={styles.containerButtons}>
                    <Link href={`/ordem-servico/edit/${ordemServico.id}`} style={styles.button} asChild>
                        <FontAwesome5 name="edit" size={14} color={'#000'} />
                    </Link>
                    <Link href={`/ordem-servico/view/${ordemServico.id}`} style={styles.button} asChild>
                        <FontAwesome5 name="eye" size={14} color={'#000'} />
                    </Link>
                    <TouchableOpacity style={styles.button} onPress={() => {/* Navigate to project */}}>
                        <FontAwesome5 name="trash" size={14} color={'#000'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {/* Navigate to project */}}>
                        <FontAwesome5 name="whatsapp" size={14} color={'#000'} />
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
    marginBottom: 8,
  },
  titleCliente: {
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
  colorProgress: {
    backgroundColor: 'rgb(255,200,50)'
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
  item: {
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
