import { Stack } from 'expo-router';
import { StyleSheet, View, Text, TouchableOpacity, Button, ScrollView } from 'react-native';
import { Container } from '@/src/components/Container';
import { useLocalSearchParams } from 'expo-router';

export default function ViewOS() {
    const { id } = useLocalSearchParams();

    const dados = [
        { label: 'ID:', value: id },
        { label: 'Nome (Razão Social):', value: 'Indústria e Comércio de Chopeiras Ribeirão Preto ( MEMO )' },
        { label: 'Nome Contato:', value: 'Bauer' },
        { label: 'Modelo:', value: 'Nayara' },
        { label: 'E-mail:', value: 'sac@memo.ind.br' },
        { label: 'CPF/CNPJ:', value: '03.670.744/0001-01' },
        { label: 'Cidade:', value: 'Ribeirão Preto, São Paulo' },
        { label: 'Celular Principal:', value: '(16) 98222-0605' },
        { label: 'Celular Secundário:', value: '(16) 98138-0424' },
        { label: 'Telefone:', value: '(16) 3969-9797' },
        { label: 'Data de Criação:', value: '23/12/2024 às 23:31h' },
        { label: 'Data Modificação:', value: '24/12/2024 às 09:52h' },
    ];
  
    return (
        <>
            <Stack.Screen options={{ title: 'Detalhes do Cliente' }} />
            <Container>
                <View style={styles.container}>
                    <View style={styles.containerTable}>
                        <ScrollView>
                            {dados.map((item, index) => (
                                <View key={index} style={styles.row}>
                                    <Text style={styles.label}>{item.label}</Text>
                                    <Text style={styles.value}>{item.value}</Text>
                                </View>
                            ))}
                        </ScrollView>
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
  containerTable: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
  value: {
    fontSize: 16,
    flex: 2,
  },
});
