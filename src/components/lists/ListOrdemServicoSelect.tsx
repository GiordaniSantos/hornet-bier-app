import { StyleSheet, View, Text } from 'react-native';
import { convertValor } from '@/src/utils/format-valor-to-real';
import React, { useState } from 'react';
import Checkbox from 'expo-checkbox';

interface OrdemServico {
    id: number;
    numero: string;
    status: string;
    valor_total: string;
    data_entrada: string;
    data_saida: string;
    cliente_nome: string;
}

interface ListOrdemServicoProps {
    ordemServico: OrdemServico;
    setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function ListOrdemServicoSelect({ordemServico, setSelectedIds}: ListOrdemServicoProps) {
    const [isChecked, setChecked] = useState(false);

    const handleCheckboxChange = () => {
        setChecked(!isChecked);
        if (!isChecked) {
            setSelectedIds(prevIds => [...prevIds, ordemServico.id]);
        } else {
            setSelectedIds(prevIds => prevIds.filter(id => id !== ordemServico.id));
        }
    };

    const getStatusStyle = (status:string) => {
        switch (status) {
            case 'Aberto':
                return styles.colorApproved;
            case 'Em Andamento':
                return styles.colorProgress;
            case 'Fechado':
                return styles.colorClosed;
            case 'Não Executado':
                return styles.colorClosed;
            default:
                return {};
        }
    };

    return (
        <View style={styles.card}>
            <Text style={[styles.btnStatus, getStatusStyle(ordemServico.status)]}>{ordemServico.status}</Text>
            <View style={{padding:16}}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>{ordemServico.numero}</Text>
                        <Text style={styles.titleCliente}>{ordemServico.cliente_nome}</Text>
                    </View>
                </View>
                <Text style={styles.item}>Valor total: R${convertValor(ordemServico.valor_total)}</Text>
                <Text style={styles.date}>
                    Entrada em: {ordemServico.data_entrada ? ordemServico.data_entrada : 'N/I'} | Saída: {ordemServico.data_saida ? ordemServico.data_saida : 'N/I'}
                </Text>
                <Checkbox
                    style={styles.checkbox}
                    value={isChecked}
                    onValueChange={handleCheckboxChange}
                    color={isChecked ? '#4630EB' : undefined}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        height: 'auto',
        overflow: 'hidden',
        backgroundColor: '#fff',
        marginBottom: 10,
        marginTop: 10,
        marginRight: 15,
        marginLeft: 15,
        position: 'relative',
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    titleCliente: {
        backgroundColor: '#f8f9fa',
        color: '#343a40',
        fontWeight: '700',
        fontSize: 14,
        padding: 4,
        borderRadius: 8,
    },
    colorApproved: {
        backgroundColor: '#28a745'
    },
    colorClosed: {
        backgroundColor: '#ad3a13'
    },
    colorProgress: {
        backgroundColor: 'rgb(255,200,50)'
    },
    btnStatus: {
        color: '#fff',
        fontSize: 14,
        paddingTop: 8,
        paddingRight: 20,
        paddingBottom: 8,
        paddingLeft: 20,
        borderRadius: 8,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        textTransform: 'uppercase'
    },
    item: {
        marginTop: 12,
        marginBottom: 4,
        color: '#6c757d',
        fontSize: 14,
    },
    date: {
        color: '#6c757d',
        fontSize: 14,
    },
    containerButtons: {
        display: 'flex', 
        flexDirection: 'row',
        marginBottom: 5
    },
    button: {
        marginTop: 20,
        marginRight: 10,
        backgroundColor: 'transparent',
        borderColor: '#ff3a00',
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    addButton: {
        position: 'absolute',
        right: 15,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkbox: {
        marginTop: 15,
        marginLeft: 5,
        marginBottom: 3
    },
});
