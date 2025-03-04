import React, { useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { ShowAlertErroResponseApi } from "./ShowAlertErrorResponseApi";
import api from "../services/api";

interface data {
    value: string;
    label: string;
}

interface ModalTaxaPagamentoProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: (value: number) => void;
}

const ModalTaxaPagamento = ({ visible, onClose, onConfirm } : ModalTaxaPagamentoProps) => {
    const [selectedValue, setSelectedValue] = useState(2);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<data[]>([]);
    

    const getOptionsTaxa = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/pagamento/taxa/get-taxas-cobranca`);

            setData(response.data);
        
        } catch (e:any) {
            ShowAlertErroResponseApi(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getOptionsTaxa();
    }, []);

    const handleConfirm = () => {
        onConfirm(selectedValue);
        onClose();
    };

    return (
        <Modal animationType="fade" visible={visible} transparent={true}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Cobrar Taxa?</Text>
                    <Dropdown
                        style={[styles.picker, styles.dropdown, {marginBottom: 20}]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={data}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={'Selecione o cliente'}
                        searchPlaceholder="Pesquise..."
                        value={2}
                        onChange={item => {
                            setSelectedValue(item.value)
                        }}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={onClose} style={styles.button}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleConfirm} style={[styles.button, {backgroundColor: '#28a745'}]}>
                            <Text style={styles.buttonText}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "90%",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
    picker: {
        height: 50,
        width: "100%",
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    button: {
        backgroundColor: "#6e7881",
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    selectedStyle: {
        borderRadius: 12,
    },
});

export default ModalTaxaPagamento;