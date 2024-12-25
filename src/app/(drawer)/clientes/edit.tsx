import React from 'react';
import { View, Text, Button } from 'react-native';
import { Link } from 'expo-router';

const ChildScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Tela Filha</Text>
      <Link href="/clientes" style={{ marginTop: 20 }}>
        <Button title="Voltar para a Tela Principal" />
      </Link>
    </View>
  );
};

export default ChildScreen;