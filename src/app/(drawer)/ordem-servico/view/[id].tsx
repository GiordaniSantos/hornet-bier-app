import { Stack } from 'expo-router';
import { StyleSheet, View, Text, TouchableOpacity, Button, ScrollView } from 'react-native';
import { Container } from '@/src/components/Container';
import { useLocalSearchParams } from 'expo-router';
import Detail from '@/src/components/details/Detail';

export default function ViewOS() {
    const { id } = useLocalSearchParams();

    const dados = [
        { label: 'ID:', value: id },
        { label: 'Número da OS:', value: '131.26.2024' },
        { label: 'Marca:', value: 'Bauer' },
        { label: 'Modelo:', value: 'Triângulo' },
        { label: 'Série:', value: '- - - -' },
        { label: 'Número do Motor:', value: '----' },
        { label: 'Cliente:', value: 'DublinBier' },
        { label: 'Problemas:', value: 'Revisão' },
        { label: 'Peças Utilizadas:', value: 'Ventilador - R$98,50 x 1 = R$98,50\n\nValor Total de Peças: R$98,50' },
        { label: 'Serviços Prestados:', value: 'Desmontagem\nLimpeza\nTroca do Ventilador\nAjuste da temperatura de 0 a -1 grau' },
        { label: 'Valor Mão de Obra:', value: 'R$181,50' },
        { label: 'Valor Total:', value: 'R$280,00' },
        { label: 'Status:', value: 'Fechado' },
        { label: 'Data de Entrada:', value: '23/12/2024' },
        { label: 'Data de Saída:', value: '24/12/2024' },
        { label: 'Observações:', value: 'Chopeira Triângulo igual do Bender, motor embraco FFi12HBX' },
        { label: 'Data de Criação da OS:', value: '23/12/2024 às 23:31h' },
        { label: 'Data Modificação:', value: '24/12/2024 às 09:52h' },
    ];
  
    return (
        <>
            <Stack.Screen options={{ title: 'Detalhe da OS' }} />
            <Container>
                <View style={styles.container}>
                  <Detail dados={dados} />  
                </View>
            </Container>
        </>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
