import { Stack } from 'expo-router';
import { StyleSheet, View, ScrollView, ActivityIndicator, Text } from 'react-native';
import { Container } from '@/src/components/Container';
import FormOrdemServico from '@/src/components/forms/FormOrdemServico';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import api from '@/src/services/api';
import { showSweetAlert } from '@/src/components/sweetAlert';

export default function EditOrdemServico() {
    const { id } = useLocalSearchParams();

    const [ordemServico, setOrdemServico] = useState(null);
    const [recursos, setRecursos] = useState(null);
    const [loadingRecursos, setLoadingRecursos] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getRecursos = async () => {
            setLoadingRecursos(true);
            await api.get(`/ordem-servico-recursos?withStatus=true`)
                .then(response => {
                    setRecursos(response.data)
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
                    setLoadingRecursos(false);
                });
        }

        const fetchData = async () => {
            setLoading(true);
            await api.get(`/ordem-servico/${id}`)
                .then(response => {
                    setOrdemServico(response.data)
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
        getRecursos()
        fetchData()
    }, []);

    if (loadingRecursos && loading) {
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
