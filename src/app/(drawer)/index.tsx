import { Stack } from 'expo-router';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Container } from '@/src/components/Container';
import Icon from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useEffect, useState } from 'react';
import api from '@/src/services/api';
import { showSweetAlert } from '@/src/components/sweetAlert';
import { useAppSelector } from '@/src/store';
import { ShowAlertErroResponseApi } from '@/src/components/ShowAlertErrorResponseApi';

interface ApiResponse {
    totalOrdemServicos: number;
    totalClientes: number;
    totalUsers: number;
    totalValorOrdemServicos: string;
    totalValorMaoDeObra: string;
    totalValorPecas: string;
}

export default function Home() {
	const authData = useAppSelector((state) => state.auth);
	const [data, setData] = useState<ApiResponse | null>(null);

	useEffect(() => {
        const fetchData = async () => {
			await api.get(`/relatorio`)
				.then(response => {
					setData(response.data)
				})
				.catch(e => {
					ShowAlertErroResponseApi(e);
				});
        };
		if(authData.token){
			fetchData();
		}
    }, [authData.token]);

	return (
		<>
			<Stack.Screen options={{ title: 'Início' }} />
			<Container>
				<ScrollView>
					<View style={styles.container}>
						<View style={styles.rowCards}>
							<View style={[styles.card, styles.elevation]}>
								<View style={styles.cardBody}>
									<View style={styles.itens}>
										<View>
											<Text style={styles.title}>Faturamento Bruto</Text>
											<Text style={styles.numero}>{data ? `R$${data.totalValorOrdemServicos}` : 'Carregando...'}</Text>
										</View>
										<View>
											<Icon size={32} style={styles.icon} name={'money'}></Icon>
										</View>
									</View>
								</View>
							</View>
						</View>
						<View style={styles.rowCards}>
							<View style={[styles.card, styles.elevation]}>
								<View style={styles.cardBody}>
									<View style={styles.itens}>
										<View>
											<Text style={styles.title}>Faturamento por Mão de Obra</Text>
											<Text style={styles.numero}>{data ? `R$${data.totalValorMaoDeObra}` : 'Carregando...'}</Text>
										</View>
										<View>
											<FontAwesome5 size={32} style={styles.icon} name={'wallet'}></FontAwesome5>
										</View>
									</View>
								</View>
							</View>
						</View>
						<View style={styles.rowCards}>
							<View style={[styles.card, styles.elevation]}>
								<View style={styles.cardBody}>
									<View style={styles.itens}>
										<View>
											<Text style={styles.title}>Custo com Peças</Text>
											<Text style={styles.numero}>{data ? `R$${data.totalValorPecas}` : 'Carregando...'}</Text>
										</View>
										<View>
											<FontAwesome5 size={32} style={styles.icon} name={'cash-register'}></FontAwesome5>
										</View>
									</View>
								</View>
							</View>
						</View>
						<View style={styles.rowCards}>
							<View style={[styles.card, styles.elevation]}>
								<View style={styles.cardBody}>
									<View style={styles.itens}>
										<View>
											<Text style={styles.title}>Total de Ordens de Serviços</Text>
											<Text style={styles.numero}>{data ? data.totalOrdemServicos.toString() : 'Carregando...'}</Text>
										</View>
										<View>
											<Icon size={32} style={styles.icon} name={'gear'}></Icon>
										</View>
									</View>
								</View>
							</View>
						</View>
						<View style={styles.rowCards}>
							<View style={[styles.card, styles.elevation]}>
								<View style={styles.cardBody}>
									<View style={styles.itens}>
										<View>
											<Text style={styles.title}>Total de Clientes</Text>
											<Text style={styles.numero}>{data ? data.totalClientes.toString() : 'Carregando...'}</Text>
										</View>
										<View>
											<Icon size={32} style={styles.icon} name={'users'}></Icon>
										</View>
									</View>
								</View>
							</View>
						</View>
						<View style={styles.rowCards}>
							<View style={[styles.card, styles.elevation]}>
								<View style={styles.cardBody}>
									<View style={styles.itens}>
										<View>
											<Text style={styles.title}>Usuários Administrativos</Text>
											<Text style={styles.numero}>{data ? data.totalUsers.toString() : 'Carregando...'}</Text>
										</View>
										<View>
											<Icon size={32} style={styles.icon} name={'user'}></Icon>
										</View>
									</View>
								</View>
							</View>
						</View>
					</View>
				</ScrollView>
			</Container>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
        flex: 1
	},
	rowCards:{
        display: 'flex', 
        flexDirection: 'row'
    }, 
	header:{
        justifyContent: "space-between",
        flexDirection: "row",
        marginBottom: -35,
    },
    elevation: {
        elevation: 18,
        shadowColor: 'rgba(58,59,69)',
    },
    cardHeader:{
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#f8f9fc',
        borderBottomColor: '#e3e6f0',
        borderBottomWidth: 1
    },
    card:{
        height:90,
        backgroundColor: '#fff',
        borderTopColor: '#e3e6f0',
        borderBottomColor: '#e3e6f0',
        borderRightColor: '#e3e6f0',
        borderWidth: 1,
        margin: 10,
        borderLeftColor: '#000',
        borderLeftWidth: 4,
        flex: 1,
        borderRadius: 5,
    },
	cardBody:{
        padding: 20
    },
	itens:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
	title:{
        fontSize: 11,
        color: '#000',
        fontWeight: '700',
    },
    numero:{
        color: '#5a5c69',
        fontWeight: '700',
        fontSize: 20
    },
    icon:{
        color: '#dddfeb',
        fontWeight: '900',
        fontSize: 32
    },
});
