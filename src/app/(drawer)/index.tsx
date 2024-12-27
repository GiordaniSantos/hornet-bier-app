import { Stack } from 'expo-router';
import { StyleSheet, View, Text, TouchableOpacity, Button, ScrollView } from 'react-native';
import { Container } from '@/src/components/Container';
import { FontAwesome5 } from '@expo/vector-icons';
import Modal from "react-native-modal";
import { useState } from 'react';

export default function Home() {
  const dados = [
    { label: 'ID:', value: '131' },
    { label: 'Número da OS:', value: '131.26.2024' },
    { label: 'Marca:', value: 'Bauer' },
    { label: 'Modelo:', value: 'Triângulo' },
    { label: 'Série:', value: '- - - -' },
    { label: 'Número do Motor:', value: '----' },
    { label: 'Cliente:', value: 'DublinBier' },
    { label: 'Problemas:', value: 'Revisão' },
    { label: 'Peças Utilizadas:', value: 'Ventilador - R$98,50 x 1 = R$98,50\n\nValor Total de Peças: R$98,50' },
    { label: 'Serviços Prestados:', value: 'Desmontagem\nLimpeza\nTroca do Ventilador\nAjuste da temperatura de 0 a -1 grau' },
    { label: 'Valor Mão de Obra:', value: 'R$181,50' },
    { label: 'Valor Total:', value: 'R$280,00' },
    { label: 'Status:', value: 'Fechado' },
    { label: 'Data de Entrada:', value: '23/12/2024' },
    { label: 'Data de Saída:', value: '24/12/2024' },
    { label: 'Observações:', value: 'Chopeira Triângulo igual do Bender, motor embraco FFi12HBX' },
    { label: 'Data de Criação da OS:', value: '23/12/2024 às 23:31h' },
    { label: 'Data Modificação:', value: '24/12/2024 às 09:52h' },
  ];

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={[styles.badgeApproved, styles.colorApproved]}>ABERTO</Text>
            <View style={{padding:16}}>
              <View style={styles.header}>
                <View>
                  <Text style={styles.title}>131.26.2024</Text>
                  <Text style={styles.badgeOpen}>DublinBier</Text>
                </View>
              </View>
              <Text style={styles.author}>Valor total: R$280,00</Text>
              <Text style={styles.date}>
                Entrada em: 23/12/2024 | Saída: 24/12/2024
              </Text>
              <View style={styles.containerButtons}>
                <TouchableOpacity style={styles.button} onPress={() => {/* Navigate to project */}}>
                  <FontAwesome5 name="edit" size={14} color={'#000'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={toggleModal}>
                  <FontAwesome5 name="eye" size={14} color={'#000'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {/* Navigate to project */}}>
                  <FontAwesome5 name="trash" size={14} color={'#000'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {/* Navigate to project */}}>
                  <FontAwesome5 name="whatsapp" size={14} color={'#000'} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.card}>
            <Text style={[styles.badgeApproved, styles.colorClosed]}>FECHADO</Text>
            <View style={{padding:16}}>
              <View style={styles.header}>
                <View>
                  <Text style={styles.title}>129.35.2024</Text>
                  <Text style={styles.badgeOpen}>Indústria e Comércio de Chopeiras Ribeirão Preto ( MEMO )</Text>
                </View>
              </View>
              <Text style={styles.author}>Valor total: R$280,00</Text>
              <Text style={styles.date}>
                Entrada em: 23/12/2024 | Saída: 24/12/2024
              </Text>
              <View style={styles.containerButtons}>
                <TouchableOpacity style={styles.button} onPress={() => {/* Navigate to project */}}>
                  <FontAwesome5 name="edit" size={14} color={'#000'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={toggleModal}>
                  <FontAwesome5 name="eye" size={14} color={'#000'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {/* Navigate to project */}}>
                  <FontAwesome5 name="trash" size={14} color={'#000'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {/* Navigate to project */}}>
                  <FontAwesome5 name="whatsapp" size={14} color={'#000'} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <Modal isVisible={isModalVisible} avoidKeyboard useNativeDriver={true} useNativeDriverForBackdrop={true} propagateSwipe hideModalContentWhileAnimating animationIn={'fadeIn'} animationOut={'fadeOut'} scrollHorizontal={true} onBackdropPress = {()  => setModalVisible(false)} >
          <View>
            <View style={styles.containerTable}>
            <ScrollView>
              {dados.map((item, index) => (
                <View key={index} style={styles.row}>
                  <Text style={styles.label}>{item.label}</Text>
                  <Text style={styles.value}>{item.value}</Text>
                </View>
              ))}
            </ScrollView>
            </View>
          </View>
        </Modal>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  card: {
    borderRadius: 15,
    height: 230,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 15,
    position: 'relative'
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
  badgeContainer: {
    marginBottom: 12,
  },
  badgeSecondary: {
    backgroundColor: '#6c757d',
    color: '#fff',
    fontSize: 14,
    padding: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  badgeOpen: {
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
  badgeApproved: {
    color: '#fff',
    fontSize: 14,
    paddingTop: 8,
    paddingRight: 20,
    paddingBottom: 8,
    paddingLeft: 20,
    borderRadius: 8,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 18,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  author: {
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
    flexDirection: 'row'
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
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
  containerTable: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    margin: 10,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
  value: {
    fontSize: 16,
    flex: 2,
  },
});
