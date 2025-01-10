import { Stack } from 'expo-router';
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';
import { Container } from '@/src/components/Container';
import FormPeca from '@/src/components/forms/FormPeca';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import api from '@/src/services/api';
import { showSweetAlert } from '@/src/components/sweetAlert';
import { Text } from 'react-native';

export default function EditPeca() {
    const { id } = useLocalSearchParams();

    const [peca, setPeca] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await api.get(`/peca/${id}`)
                .then(response => {
                setPeca(response.data)
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

    if (!peca) {
        return (
            <Container>
                <View style={styles.errorContainer}>
                    <Text>Peca não encontrado.</Text>
                </View>
            </Container>
        );
    }

    return (
        <>
            <Stack.Screen options={{ title: 'Editar Peca' }} />
            <Container>
                <View style={styles.container}>
                <ScrollView>
                    <View style={styles.containerForm}>
                        <FormPeca peca={peca} />
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
    borderWidth: 1,
    margin: 10,
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
