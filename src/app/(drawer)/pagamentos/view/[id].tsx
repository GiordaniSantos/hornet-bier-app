import { Stack } from 'expo-router';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Container } from '@/src/components/Container';
import { useLocalSearchParams } from 'expo-router';
import Detail from '@/src/components/details/Detail';
import { useEffect, useState } from 'react';
import api from '@/src/services/api';
import { ShowAlertErroResponseApi } from '@/src/components/ShowAlertErrorResponseApi';

interface PagamentoData {
  label: string;
  value: any;
}

export default function ViewPagamento() {
    const { id } = useLocalSearchParams();

    const [dados, setDados] = useState<PagamentoData[]>([]);
    const [pagamento, setPagamento] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
        setLoading(true);
        await api.get(`/pagamento/${id}`)
            .then(response => {
                setPagamento(response.data)

                const itensFormatados = response.data.itens.join('\n');

                const pagamentoDados: PagamentoData[] = [
                    { label: 'ID:', value: response.data.id },
                    { label: 'Status:', value: response.data.status },
                    { label: 'Itens:', value: itensFormatados },
                    { label: 'Tipo de Taxa Cobrado:', value: response.data.tipo_taxa },
                    { label: 'Taxa:', value: response.data.valor_taxa },
                    { label: 'Total:', value: response.data.valor },
                    { label: 'Tipo de Pagamento:', value: response.data.tipo_pagamento },
                    { label: 'Data de Criação:', value: response.data.created_at },
                    { label: 'Data Modificação:', value: response.data.updated_at },
                ];
                setDados(pagamentoDados);
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

    if (!pagamento) {
        return (
            <Container>
                <View style={styles.errorContainer}>
                    <Text>Pagamento não encontrado.</Text>
                </View>
            </Container>
        );
    }

    return (
        <>
            <Stack.Screen options={{ title: 'Detalhes do Pagamento' }} />
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
