import { Stack } from 'expo-router';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Container } from '@/src/components/Container';
import { useLocalSearchParams } from 'expo-router';
import Detail from '@/src/components/details/Detail';
import { useEffect, useState } from 'react';
import api from '@/src/services/api';
import { showSweetAlert } from '@/src/components/sweetAlert';
import { formatDateTime } from '@/src/utils/format-date-time';

interface ClienteData {
  label: string;
  value: any;
}

export default function ViewOS() {
  const { id } = useLocalSearchParams();

  const [dados, setDados] = useState<ClienteData[]>([]);
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await api.get(`/cliente/${id}`)
        .then(response => {
          setCliente(response.data)
          const clienteDados: ClienteData[] = [
            { label: 'ID:', value: response.data.id },
            { label: 'Nome (Razão Social):', value: response.data.nome },
            { label: 'Nome Contato:', value: response.data.nome_contato },
            { label: 'E-mail:', value: response.data.email },
            { label: 'CPF/CNPJ:', value: response.data.cpf_cnpj },
            { label: 'Cidade:', value: response.data.cidade },
            { label: 'Celular Principal:', value: response.data.celular },
            { label: 'Celular Secundário:', value: response.data.celular_secundario },
            { label: 'Telefone:', value: response.data.telefone },
            { label: 'Data de Criação:', value: formatDateTime(response.data.created_at) },
            { label: 'Data Modificação:', value: formatDateTime(response.data.updated_at) },
          ];
          setDados(clienteDados);
        })
        .catch(e => {
          const errorMessage = e.response && e.response.data && e.response.data.message ? e.response.data.message : 'Ocorreu um erro inesperado.';
          
          showSweetAlert({
            title: 'Erro',
            text: errorMessage,
            showCancelButton: false,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Ok',
            onConfirm: () => {},
            onClose: () => {},
            type: 'danger',
          });
        }).finally(() => {
          setLoading(false);
        });
    };
    fetchData()
  }, []);

  if (loading) {
    return (
      <Container>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ff3a00" />
          <Text>Carregando...</Text>
        </View>
      </Container>
    );
  }

  if (!cliente) {
    return (
      <Container>
        <View style={styles.errorContainer}>
          <Text>Cliente não encontrado.</Text>
        </View>
      </Container>
    );
  }

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
