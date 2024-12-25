import React from 'react';
import { View, Text, Button } from 'react-native';
import { Link } from 'expo-router';

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Link href="/clientes/edit" style={{ marginTop: 20 }} asChild>
        <Button title="Ir para a Tela Filha" />
      </Link>
    </View>
  );
};

export default HomeScreen;