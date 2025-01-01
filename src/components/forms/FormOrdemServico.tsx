import { StyleSheet, View, Text, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from 'react';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { moedaApplyMask } from '@/src/utils/masks';

type Item = { id: number; piece: string; quantity: number };

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
  
interface FormOrdemServicoProps {
    ordemServico?: OrdemServico;
}

export default function FormOrdemServico({ordemServico}: FormOrdemServicoProps) {
    const { control, handleSubmit, setValue, formState: { errors } } = useForm<formData>({
        defaultValues: {
            cliente: ordemServico?.cliente,
            marca: ordemServico?.marca,
            modelo: ordemServico?.modelo,
            serie: ordemServico?.serie,
            numeroMotor: ordemServico?.numeroMotor,
            problemas: ordemServico?.problemas,
            servicos: ordemServico?.servicos,
            items: ordemServico?.items || [{ id: 0, piece: '', quantity: 0 }],
            valorMaoDeObra: moedaApplyMask(ordemServico?.valorMaoDeObra),
            dataEntrada: ordemServico?.dataEntrada,
            dataSaida: ordemServico?.dataSaida,
            observacao: ordemServico?.observacao
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

    const [items, setItems] = useState([{ id: 0, piece: '', quantity: 0 }]);

    const pieces = [
        { value: 2, label: 'Compressor 1/4 - R$550,00' },
        { value: 3, label: 'Compressor 1/3 - R$750,00' },
        { value: 4, label: 'Compressor 1/2 - R$750,00' },
        // Adicione mais opções conforme necessário
    ];

    useEffect(() => {
        if (ordemServico?.items && ordemServico.items.length > 0) {
            setItems(ordemServico.items);
        }
     
        if (ordemServico?.dataEntrada) {
            setStartDate(new Date(ordemServico.dataEntrada));
        }
        if (ordemServico?.dataSaida) {
            setEndDate(new Date(ordemServico.dataSaida));
        }
        
    }, [ordemServico?.items]);

    const clientes = [
        { value: 2, label: 'Maniba Cervejaria' },
        { value: 3, label: 'Dirlei ( Particular )' },
        { value: 4, label: 'Rodrigo ( Particular )' },
        { value: 5, label: 'Dr Chopp' },
        { value: 6, label: 'Rothenburg Industria e Comercio de Cervejas Especiais LTDA' },
    ]

    const marcas = [
        { value: 2, label: 'Memo' },
        { value: 3, label: 'Gell Chopp' },
        { value: 4, label: 'Bauer' },
        { value: 5, label: 'TSI' },
        { value: 6, label: 'Elts' },
    ]

    const data = [
        { label: 'Compressor', value: 1 },
        { label: 'Bobina Solenoide', value: 2 },
        { label: 'Protetor Térmico', value: 3 },
        { label: 'Relé', value: 4 },
        { label: 'Capacitador de Partida', value: 5 },
        { label: 'Capacitor Permanente', value: 6 },
        { label: 'Ventilador', value: 7 },
        { label: 'Boiler', value: 8 },
    ];

    const addItem = () => {
        setItems([...items, { id: items.length + 1, piece: '', quantity: 0 }]);
        setValue('items', [...items, { id: items.length + 1, piece: '', quantity: 0 }]);
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

    const onSubmit = (data: formData) => {
        console.log(data)
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
                        {errors.cliente && <Text style={styles.textError}>Preencha este campo!</Text>}
                    </>
                )}
                name="cliente"
            />
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
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
                render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.container}>
                        <MultiSelect
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            search
                            data={data}
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
                            data={data}
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
                                            data={pieces}
                                            search
                                            maxHeight={300}
                                            labelField="label"
                                            valueField="value"
                                            placeholder={'Selecione'}
                                            searchPlaceholder="Pesquise..."
                                            value={value}
                                            onChange={item => {
                                                onChange(item.value);
                                                item.piece = item.value;
                                            }}
                                            renderLeftIcon={() => (
                                                <MaterialCommunityIcons style={styles.icon} name="screw-flat-top" size={20} color={'black'} />
                                            )}
                                        />
                                    )}
                                    name={`items[${index}].piece`}
                                    defaultValue={item.piece}
                                />
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={[styles.input, styles.cell, {marginBottom: 0}]}
                                            placeholder="Digite a quantidade"
                                            keyboardType="numeric"
                                            onBlur={onBlur}
                                            onChangeText={(text) => {
                                                const intValue = parseInt(text, 10);
                                                onChange(isNaN(intValue) ? undefined : intValue);
                                            }}
                                            value={value ? String(value) : ''}
                                        />
                                    )}
                                    name={`items[${index}].quantity`}
                                    defaultValue={item.quantity}
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
                    </>
                )}
                name="valorMaoDeObra"
            />
            <Controller
                control={control}
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
