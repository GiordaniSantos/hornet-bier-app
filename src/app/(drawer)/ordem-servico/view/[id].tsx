import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Container } from '@/src/components/Container';
import { useLocalSearchParams } from 'expo-router';
import Detail from '@/src/components/details/Detail';
import { useEffect, useState } from 'react';
import api from '@/src/services/api';
import { formatDateTime } from '@/src/utils/format-date-time';
import { convertValor } from '@/src/utils/format-valor-to-real';
import { ShowAlertErroResponseApi } from '@/src/components/ShowAlertErrorResponseApi';

interface OrdemServicoData {
  label: string;
  value: any;
}

export default function ViewOS() {
  const { id } = useLocalSearchParams();

  const [dados, setDados] = useState<OrdemServicoData[]>([]);
  const [ordemServico, setOrdemServico] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await api.get(`/ordem-servico/view/${id}`)
        .then(response => {
          setOrdemServico(response.data)
          const ordemServicoDados: OrdemServicoData[] = [
            { label: 'ID:', value: response.data.id },
            { label: 'Número da OS:', value: response.data.numero },
            { label: 'Marca:', value: response.data.marca },
            { label: 'Modelo:', value: response.data.modelo },
            { label: 'Série:', value: response.data.serie },
            { label: 'Número do Motor:', value: response.data.numero_motor },
            { label: 'Cliente:', value: response.data.cliente },
            { label: 'Problemas:', value: response.data.problemas },
            { label: 'Peças Utilizadas:', value: response.data.pecas },
            { label: 'Serviços Prestados:', value: response.data.servicos },
            { label: 'Valor Mão de Obra:', value: `R$${convertValor(response.data.valor_mao_de_obra)}` },
            { label: 'Valor Total:', value: `R$${convertValor(response.data.valor_total)}` },
            { label: 'Status:', value: response.data.status },
            { label: 'Data de Entrada:', value: response.data.data_entrada },
            { label: 'Data de Saída:', value: response.data.data_saida },
            { label: 'Observações:', value: response.data.observacao },
            { label: 'Data de Criação da OS:', value: formatDateTime(response.data.data_criacao) },
            { label: 'Data Modificação:', value: formatDateTime(response.data.data_modificacao) },
          ];
          setDados(ordemServicoDados);
        })
        .catch(e => {
          ShowAlertErroResponseApi(e);
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

  if (!ordemServico) {
    return (
      <Container>
        <View style={styles.errorContainer}>
          <Text>Ordem de Servico não encontrada.</Text>
        </View>
      </Container>
    );
  }
  
  return (
    <>
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
