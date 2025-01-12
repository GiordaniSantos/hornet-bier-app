import { StyleSheet, View, Text, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from 'react';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { moedaApplyMask } from '@/src/utils/masks';
import { convertValor } from '@/src/utils/format-valor-to-real';
import api from '@/src/services/api';
import { showSweetAlert } from '../sweetAlert';
import { router } from 'expo-router';

type Item = { id: number; peca_id: number | null; quantidade: string; valor_unitario: string };

type formData = {
    cliente: number | undefined;
    marca: number | undefined;
    modelo: string;
    serie: string;
    numeroMotor: string;
    problemas: undefined;
    servicos: undefined;
    items: Item[] | undefined;
    valorMaoDeObra: string;
    dataEntrada: string;
    dataSaida: string;
    observacao: string;
}

interface OrdemServico {
    id: number;
    cliente: number | undefined;
    marca: number | undefined;
    modelo: string;
    serie: string;
    numero_motor: string;
    problemas: undefined;
    servicos: undefined;
    pecas: Item[] | undefined;
    valorMaoDeObra: string;
    dataEntrada: string;
    dataSaida: string;
    observacao: string;
}

interface ResponseApi {
    id: number;
    nome: string;
} 

interface ResponseApiPeca {
    id: number;
    nome: string;
    valor_unitario: string;
} 

interface Recursos {
    clientes: ResponseApi[];
    problemas: ResponseApi[];
    pecas: ResponseApiPeca[];
    servicos: ResponseApi[];
    marcas: ResponseApi[];
}
interface FormOrdemServicoProps {
    ordemServico?: OrdemServico;
    recursos:  Recursos
}

export default function FormOrdemServico({ordemServico, recursos}: FormOrdemServicoProps) {
    const { control, handleSubmit, setValue, getValues, formState: { errors } } = useForm<formData>({
        defaultValues: {
            cliente: ordemServico?.cliente,
            marca: ordemServico?.marca,
            modelo: ordemServico?.modelo || '',
            serie: ordemServico?.serie || '',
            numeroMotor: ordemServico?.numero_motor || '',
            problemas: ordemServico?.problemas,
            servicos: ordemServico?.servicos,
            items: ordemServico?.pecas || [{ id: 0, peca_id: null, quantidade: '', valor_unitario: '0' }],
            valorMaoDeObra: ordemServico && ordemServico.valorMaoDeObra ? convertValor(ordemServico.valorMaoDeObra) : '0',
            dataEntrada: ordemServico?.dataEntrada || '',
            dataSaida: ordemServico?.dataSaida || '',
            observacao: ordemServico?.observacao || ''
        },
    })

    const [selectedProblema, setSelectedProblema] = useState([]);
    const [selectedServico, setSelectedServico] = useState([]);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(() => {
        const today = new Date();
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + 10);
        return futureDate;
    });
    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);

    const [items, setItems] = useState([{ id: 0, peca_id: null, quantidade: '', valor_unitario: '0' }]);

    useEffect(() => {
        if (ordemServico?.pecas && ordemServico.pecas.length > 0) {
            setItems(ordemServico.pecas);
        }
     
        if (ordemServico?.dataEntrada) {
            setStartDate(new Date(ordemServico.dataEntrada + 'T00:00:00'));
        }
        if (ordemServico?.dataSaida) {
            setEndDate(new Date(ordemServico.dataSaida + 'T00:00:00'));
        }
        
    }, [ordemServico?.pecas]);

    const pecas = recursos.pecas.map(peca => ({
        value: peca.id,
        label: `${peca.nome} - R$${convertValor(peca.valor_unitario)}`,
        valor_unitario: peca.valor_unitario
    }))

    const clientes = recursos.clientes.map(cliente => ({
        value: cliente.id,
        label: cliente.nome
    }))

    const marcas = recursos.marcas.map(marca => ({
        value: marca.id,
        label: marca.nome
    }))

    const problemas = recursos.problemas.map(problema => ({
        value: problema.id,
        label: problema.nome
    }))

    const servicos = recursos.servicos.map(servico => ({
        value: servico.id,
        label: servico.nome
    }))

    const addItem = () => {
        const newItem = { id: items.length + 1, peca_id: null, quantidade: '', valor_unitario: '0' };
        const updatedItems = [...items, newItem];
        
        setItems(updatedItems);
        setValue('items', updatedItems);
    };

    const removeItem = (id : number) => {
        const newItems = items.filter(item => item.id !== id);
        setItems(newItems);
        setValue('items', newItems);
    };

    const onChangeStart = (event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        setShowStart(false);
        setStartDate(currentDate);
    };

    const onChangeEnd = (event, selectedDate) => {
        const currentDate = selectedDate || endDate;
        setShowEnd(false);
        setEndDate(currentDate);
    };

    const showStartDatepicker = () => {
        setShowStart(true);
    };

    const showEndDatepicker = () => {
        setShowEnd(true);
    };

    const createOrUpdateOrdemServico = async (data:formData, isCreate:boolean) => {
        const url = isCreate ? `/ordem-servico` : `/ordem-servico/${ordemServico?.id}`;
        const successMessage = isCreate ? 'Ordem de Serviço criada com sucesso!' : 'Ordem de Serviço atualizada com sucesso!';
    
        try {
            if (isCreate) {
                await api.post(url, {
                    cliente_id: data.cliente,
                    marca_id: data.marca,
                    modelo: data.modelo,
                    serie: data.serie,
                    numero_motor: data.numeroMotor,
                    problema_id: data.problemas,
                    servico_id: data.servicos,
                    pecas: data.items,
                    valor: data.valorMaoDeObra,
                    data_entrada: data.dataEntrada,
                    data_saida: data.dataSaida,
                    observacao: data.observacao
                });
            } else {
                await api.put(url, {
                    idOs: ordemServico?.id,
                    cliente_id: data.cliente,
                    marca_id: data.marca,
                    modelo: data.modelo,
                    serie: data.serie,
                    numero_motor: data.numeroMotor,
                    problema_id: data.problemas,
                    servico_id: data.servicos,
                    pecas: data.items,
                    valor: data.valorMaoDeObra,
                    data_entrada: data.dataEntrada,
                    data_saida: data.dataSaida,
                    observacao: data.observacao
                });
            }
    
            showSweetAlert({
                title: 'Sucesso!',
                text: successMessage,
                showCancelButton: false,
                cancelButtonText: 'Não, cancelar',
                confirmButtonText: 'Ok',
                onConfirm: () => {},
                onClose: () => {},
                type: 'success',
            });
            router.push('/ordem-servico')
        } catch (e: any) {
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
        }
    }

    const onSubmit = (data: formData) => {
        if(!ordemServico){
          createOrUpdateOrdemServico(data, true)
          return
        }
        createOrUpdateOrdemServico(data, false)
    }

    return (
        <>
            <Controller
                control={control}
                rules={{
                    required: true
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Dropdown
                            style={[styles.picker, styles.dropdown, {marginBottom: 20}]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={clientes}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={'Selecione o cliente'}
                            searchPlaceholder="Pesquise..."
                            value={value}
                            onChange={item => {
                                onChange(item.value);
                            }}
                            renderLeftIcon={() => (
                                <FontAwesome name="user" style={styles.icon} size={20} color="black" />
                            )}
                        />
                        {errors.cliente && <Text style={styles.textError}>Selecione um item da lista!</Text>}
                    </>
                )}
                name="cliente"
            />
            <Controller
                control={control}
                rules={{
                    required: true
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Dropdown
                            style={[styles.picker, styles.dropdown, {marginBottom: 20}]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={marcas}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={'Selecione a marca'}
                            searchPlaceholder="Pesquise..."
                            value={value}
                            onChange={item => {
                                onChange(item.value);
                            }}
                            renderLeftIcon={() => (
                                <MaterialCommunityIcons style={styles.icon} name="office-building" size={20} color="black" />
                            )}
                        />
                        {errors.marca && <Text style={styles.textError}>Selecione um item da lista!</Text>}
                    </>
                )}
                name="marca"
            />
            <Controller
                control={control}
                rules={{
                    maxLength: 300
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text style={[styles.label, {width: 65}]}>Modelo</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                         {errors.modelo && <Text style={styles.textError}>No máximo 300 caracteres!</Text>}
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
                rules={{
                    maxLength: 300
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text style={[styles.label, {width: 145}]}>Número do Motor</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                        {errors.numeroMotor && <Text style={styles.textError}>No máximo 300 caracteres!</Text>}
                    </>
                )}
                name="numeroMotor"
            />
            <Controller
                control={control}
                rules={{
                    required: true
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.container}>
                        <MultiSelect
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            search
                            data={problemas}
                            labelField="label"
                            valueField="value"
                            placeholder="Problemas(s) Apresentado(s)"
                            searchPlaceholder="Pesquise..."
                            value={ordemServico?.problemas ? value : selectedProblema}
                            onChange={item => {
                                setSelectedProblema(item);
                                onChange(item);
                            }}
                            renderLeftIcon={() => (
                                <MaterialCommunityIcons style={styles.icon} name="exclamation-thick" size={20} color="black" />
                            )}
                            selectedStyle={styles.selectedStyle}
                        />
                        {errors.problemas && <Text style={styles.textError}>Selecione um item da lista!</Text>}
                    </View>
                )}
                name="problemas"
            />
             <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.container}>
                        <MultiSelect
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            search
                            data={servicos}
                            labelField="label"
                            valueField="value"
                            placeholder="Serviço(s) Prestado(s)"
                            searchPlaceholder="Pesquise..."
                            value={ordemServico?.servicos ? value : selectedServico}
                            onChange={item => {
                                setSelectedServico(item);
                                onChange(item);
                            }}
                            renderLeftIcon={() => (
                                <MaterialCommunityIcons style={styles.icon} name="briefcase-variant" size={20} color="black" />
                            )}
                            selectedStyle={styles.selectedStyle}
                        />
                    </View>
                )}
                name="servicos"
            />
            <ScrollView style={styles.container}>
                <View style={styles.table}>
                    <View style={styles.row}>
                        <Text style={[styles.header, styles.cell]}>Peça</Text>
                        <Text style={[styles.header, styles.cell]}>Quantidade</Text>
                    </View>
                    {items.map((item, index) => (
                        <View key={item.id}>
                            <View style={styles.row}>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Dropdown
                                            style={[styles.picker, styles.cell, styles.dropdown]}
                                            placeholderStyle={styles.placeholderStyle}
                                            selectedTextStyle={styles.selectedTextStyle}
                                            inputSearchStyle={styles.inputSearchStyle}
                                            iconStyle={styles.iconStyle}
                                            data={pecas}
                                            search
                                            maxHeight={300}
                                            labelField="label"
                                            valueField="value"
                                            placeholder={'Selecione'}
                                            searchPlaceholder="Pesquise..."
                                            value={value}
                                            onChange={item => {
                                                onChange(item.value);

                                                const updatedItems = [...items];
                                                updatedItems[index].peca_id = item.value;
                                                updatedItems[index].valor_unitario = item.valor_unitario;
                                                setItems(updatedItems);
                                                
                                                setValue(`items[${index}].peca_id`, item.value);
                                                setValue(`items[${index}].valor_unitario`, item.valor_unitario);
                                            }}
                                            renderLeftIcon={() => (
                                                <MaterialCommunityIcons style={styles.icon} name="screw-flat-top" size={20} color={'black'} />
                                            )}
                                        />
                                    )}
                                    name={`items[${index}].peca_id`}
                                    defaultValue={item.peca_id}
                                />
                                <Controller
                                    control={control}
                                    rules={{
                                        validate: value => {
                                            const pecaId = getValues(`items[${index}].peca_id`);
                                            return pecaId ? (value ? true : 'Quantidade é obrigatória quando uma peça é selecionada.') : true;
                                        }
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <View style={styles.cell}>
                                            <TextInput
                                                style={[styles.input, {marginBottom: 0}]}
                                                placeholder="Digite a quantidade"
                                                keyboardType="numeric"
                                                onBlur={onBlur}
                                                onChangeText={(text) => {
                                                    const intValue = parseInt(text, 10);
                                                    onChange(isNaN(intValue) ? undefined : intValue);

                                                    const updatedItems = [...items];
                                                    updatedItems[index].quantidade = isNaN(intValue) ? '' : intValue;
                                                    setItems(updatedItems);
                                                }}
                                                value={value ? String(value) : ''}
                                            />
                                            {errors.items && errors.items[index] && errors.items[index].quantidade && (
                                                <Text style={{ color: 'red' }}>{errors.items[index].quantidade.message}</Text>
                                            )}
                                        </View>
                                    )}
                                    name={`items[${index}].quantidade`}
                                    defaultValue={item.quantidade}
                                />
                               
                            </View>
                            {index === 0 ? (
                                ( 
                                    <View style={{flex: 1, marginBottom: 20}}>
                                        <Button title="Adicionar" color="#1cc88a" onPress={addItem} />
                                    </View>
                                )
                            ) : (
                                ( 
                                    <View style={{flex: 1, marginBottom: 20}}>
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
                rules={{
                    required: true
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text style={[styles.label, {width: 180}]}>Valor Mão de Obra (R$)</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            keyboardType='numeric'
                            onChangeText={text => {
                                const apenasNumeros = text.replace(/\D/g, '');

                                const valorEmReais = parseFloat(apenasNumeros) / 100;

                                const valueMoeda = moedaApplyMask(valorEmReais);
                                onChange(valueMoeda);
                            }}
                            value={value ? value.toString() : ''}
                        />
                        {errors.valorMaoDeObra && <Text style={styles.textError}>Preencha este campo!</Text>}
                    </>
                )}
                name="valorMaoDeObra"
            />
            <Controller
                control={control}
                rules={{
                    //required: true
                }}
                render={({ field: { onChange, value } }) => (
                    <>
                        <Text style={[styles.label, {width: 130}]}>Data de Entrada</Text>
                        <TouchableOpacity onPress={showStartDatepicker}>
                            <TextInput
                                style={styles.input}
                                value={startDate.toLocaleDateString('pt-BR')}
                                editable={false}
                            />
                        </TouchableOpacity>
                        {showStart  && (
                            <DateTimePicker
                                value={startDate}
                                mode="date"
                                is24Hour={true}
                                onChange={(event, selectedDate) => {
                                    onChange(selectedDate);
                                    onChangeStart(event, selectedDate);
                                }}
                            />
                        )}
                        {errors.dataEntrada && <Text style={styles.textError}>Preencha este campo!</Text>}
                    </>
                )}
                name="dataEntrada"
                defaultValue={startDate}
            />
            <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                    <>
                        <Text style={[styles.label, {width: 240}]}>Data de Saída/Previsão de Saída</Text>
                        <TouchableOpacity onPress={showEndDatepicker}>
                            <TextInput
                                style={styles.input}
                                value={endDate.toLocaleDateString('pt-BR')}
                                editable={false}
                            />
                        </TouchableOpacity>
                        {showEnd && (
                            <DateTimePicker
                                value={endDate}
                                mode="date"
                                is24Hour={true}
                                onChange={(event, selectedDate) => {
                                    onChange(selectedDate);
                                    onChangeEnd(event, selectedDate);
                                }}
                            />
                        )}
                    </>
                )}
                name="dataSaida"
                defaultValue={endDate}
            />
            <Controller
                control={control}
                rules={{
                    maxLength: 1000
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Text style={[styles.label, {width: 105}]}>Observações</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                        {errors.observacao && <Text style={styles.textError}>No máximo 1000 caracteres!</Text>}
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
        marginBottom: 25
    },
    table: {
        paddingTop: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderTopWidth: 1,
        borderTopColor: '#ccc'
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
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 10,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    selectedStyle: {
        borderRadius: 12,
    },
});
