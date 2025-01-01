import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Container } from '@/src/components/Container';
import { useLocalSearchParams } from 'expo-router';
import Detail from '@/src/components/details/Detail';

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
});
