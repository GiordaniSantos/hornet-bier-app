import { StyleSheet, View, Text, TextInput, Button, ScrollView, Picker } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { useState } from 'react';

type formData = {
    cliente: string;
    marca: string;
    modelo: string;
    serie: string;
    numeroMotor: string;
    problemas: string;
    servicos: string;
    valorMaoDeObra: string;
    dataEntrada: string;
    dataSaida: string;
    observacao: string;
}

interface OrdemServico {
    cliente: string;
    marca: string;
    modelo: string;
    serie: string;
    numeroMotor: string;
    problemas: string;
    servicos: string;
    valorMaoDeObra: string;
    dataEntrada: string;
    dataSaida: string;
    observacao: string;
}
  
interface FormOrdemServicoProps {
    ordemServico?: OrdemServico;
}

export default function FormOrdemServico({ordemServico}: FormOrdemServicoProps) {

    const [items, setItems] = useState([{ id: 0, piece: '', quantity: '' }]);
    const pieces = [
        { value: '2', label: 'Compressor 1/4 - R$550,00' },
        { value: '3', label: 'Compressor 1/3 - R$750,00' },
        { value: '4', label: 'Compressor 1/2 - R$750,00' },
        // Adicione mais opções conforme necessário
    ];

    const addItem = () => {
        setItems([...items, { id: items.length, piece: '', quantity: '' }]);
    };

    const removeItem = (id) => {
        const newItems = items.filter(item => item.id !== id);
        setItems(newItems);
    };

    const { control, handleSubmit, formState: { errors } } = useForm<formData>({
        defaultValues: {
            cliente: ordemServico?.cliente || ""
        },
    })

    const onSubmit = (data: formData) => {
        console.log(data)
    }

    return (
        <>
            <Controller
                control={control}
                rules={{
                    required: true,
                    maxLength: 250
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text style={[styles.label, {width: 58}]}>Cliente</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                        {errors.cliente && errors.cliente.type == "required" && <Text style={styles.textError}>Preencha este campo!</Text>}
                        {errors.cliente && errors.cliente.type == "maxLength" && <Text style={styles.textError}>No máximo 250 caracteres!</Text>}
                    </>
                )}
                name="cliente"
            />
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text style={[styles.label, {width: 55}]}>Marca</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    </>
                )}
                name="marca"
            />
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text style={[styles.label, {width: 65}]}>Modelo</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    </>
                )}
                name="modelo"
            />
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text style={[styles.label, {width: 50}]}>Série</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    </>
                )}
                name="serie"
            />
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text style={[styles.label, {width: 145}]}>Número do Motor</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    </>
                )}
                name="numeroMotor"
            />
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text style={[styles.label, {width: 220}]}>Problemas(s) Apresentado(s)</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    </>
                )}
                name="problemas"
            />
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text style={[styles.label, {width: 160}]}>Serviço(s) Prestado(s)</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    </>
                )}
                name="servicos"
            />
            <ScrollView style={styles.container}>
                <View style={styles.table}>
                    <View style={styles.row}>
                        <Text style={[styles.header, styles.cell]}>Peça</Text>
                        <Text style={[styles.header, styles.cell]}>Quantidade</Text>
                        <Text style={[styles.header, {flex: 1}]}>Ação</Text>
                    </View>
                    {items.map((item, index) => (
                    <View key={item.id} style={styles.row}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Picker
                                selectedValue={value}
                                style={[styles.picker, styles.cell]}
                                onValueChange={(value) => {
                                    onChange(value);
                                    item.piece = value; // Atualiza o estado local
                                }}
                                >
                                <Picker.Item label="Selecione a peça" value="" />
                                {pieces.map(piece => (
                                    <Picker.Item key={piece.value} label={piece.label} value={piece.value} />
                                ))}
                                </Picker>
                            )}
                            name={`items[${index}].piece`}
                            defaultValue={item.piece}
                        />
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                style={[styles.input, styles.cell]}
                                placeholder="Digite a quantidade"
                                keyboardType="numeric"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                />
                            )}
                            name={`items[${index}].quantity`}
                            defaultValue={item.quantity}
                        />
                        {index === 0 ? (
                           ( 
                            <View style={{flex: 1, padding: 10}}>
                               <Button title="Adicionar" color="#1cc88a" onPress={addItem} />
                            </View>
                            )
                        ) : (
                            ( 
                            <View style={{flex: 1, padding: 10}}>
                                <Button title="Remover" color="#e74a3b" onPress={() => removeItem(item.id)} />
                            </View>
                            )
                        )}
                    </View>
                    ))}
                </View>
            </ScrollView>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text style={[styles.label, {width: 180}]}>Valor Mão de Obra (R$)</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    </>
                )}
                name="valorMaoDeObra"
            />
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text style={[styles.label, {width: 130}]}>Data de Entrada</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    </>
                )}
                name="dataEntrada"
            />
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text style={[styles.label, {width: 240}]}>Data de Saída/Previsão de Saída</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    </>
                )}
                name="dataSaida"
            />
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text style={[styles.label, {width: 105}]}>Observações</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    </>
                )}
                name="observacao"
            />
            <View style={styles.buttonSave}>
                <Button title={ordemServico ? "Atualizar" : "Cadastrar"} color={'#1cc88a'} onPress={handleSubmit(onSubmit)} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    table: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    header: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cell: {
        flex: 2,
        padding: 5,
    },
    picker: {
        height: 50,
    },
    inputQuantidade: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 5,
    },
    buttonSave: {
        marginTop: 5,
    },
    textError: {
        marginTop: -15,
        marginBottom: 8,
        color: '#fc0303'
    },
    label: {
        fontSize: 16,
        marginBottom: -10,
        marginLeft: 10,
        backgroundColor: '#FFF',
        width: 50,
        textAlign: 'center',
        zIndex: 1
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderRadius: 5,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 20,
    },
});
