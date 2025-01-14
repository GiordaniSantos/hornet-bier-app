import { StyleSheet, View, ScrollView, ActivityIndicator, Text } from 'react-native';
import { Container } from '@/src/components/Container';
import FormOrdemServico from '@/src/components/forms/FormOrdemServico';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import api from '@/src/services/api';
import { ShowAlertErroResponseApi } from '@/src/components/ShowAlertErrorResponseApi';

export default function EditOrdemServico() {
    const { id } = useLocalSearchParams();

    const [ordemServico, setOrdemServico] = useState(null);
    const [recursos, setRecursos] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [recursosResponse, ordemServicoResponse] = await Promise.all([
                    api.get(`/ordem-servico-recursos?withStatus=true`),
                    api.get(`/ordem-servico/${id}`)
                ]);
                setRecursos(recursosResponse.data);
                setOrdemServico(ordemServicoResponse.data);
            } catch (e:any) {
                ShowAlertErroResponseApi(e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

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

    if (!ordemServico || !recursos) {
        return (
            <Container>
                <View style={styles.errorContainer}>
                    <Text>Ordem de Servico não encontrada ou recursos não encontrados.</Text>
                </View>
            </Container>
        );
    }

    return (
        <>
            <Container>
                <View style={styles.container}>
                    <ScrollView>
                        <View style={styles.containerForm}>
                            <FormOrdemServico ordemServico={ordemServico} recursos={recursos} />
                        </View>
                    </ScrollView>
                </View>
            </Container>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerForm: {
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: '#fff',
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
