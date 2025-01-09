import { Stack } from 'expo-router';
import { StyleSheet, View, ScrollView, ActivityIndicator, Text } from 'react-native';
import { Container } from '@/src/components/Container';
import FormServico from '@/src/components/forms/FormServico';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import api from '@/src/services/api';
import { showSweetAlert } from '@/src/components/sweetAlert';

export default function EditServico() {
    const { id } = useLocalSearchParams();

    const [servico, setServico] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await api.get(`/servico/${id}`)
                .then(response => {
                    setServico(response.data)
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
    
    if (!servico) {
        return (
            <Container>
                <View style={styles.errorContainer}>
                    <Text>Serviço não encontrado.</Text>
                </View>
            </Container>
        );
    }

    return (
        <>
            <Stack.Screen options={{ title: 'Editar Serviço' }} />
            <Container>
                <View style={styles.container}>
                <ScrollView>
                    <View style={styles.containerForm}>
                        <FormServico servico={servico} />
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
