import { Stack } from 'expo-router';
import { StyleSheet, View, ScrollView, ActivityIndicator, Text } from 'react-native';
import { Container } from '@/src/components/Container';
import { useLocalSearchParams } from 'expo-router';
import FormMarca from '@/src/components/forms/FormMarca';
import { useEffect, useState } from 'react';
import api from '@/src/services/api';
import { ShowAlertErroResponseApi } from '@/src/components/ShowAlertErrorResponseApi';

export default function EditMarca() {
    const { id } = useLocalSearchParams();

    const [marca, setMarca] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await api.get(`/marca/${id}`)
                .then(response => {
                    setMarca(response.data)
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
    
    if (!marca) {
        return (
            <Container>
                <View style={styles.errorContainer}>
                    <Text>Marca não encontrada.</Text>
                </View>
            </Container>
        );
    }

    return (
        <>
            <Stack.Screen options={{ title: 'Editar Marca' }} />
            <Container>
                <View style={styles.container}>
                <ScrollView>
                    <View style={styles.containerForm}>
                        <FormMarca marca={marca} />
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
