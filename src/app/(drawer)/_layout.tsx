import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps, DrawerItem } from '@react-navigation/drawer';
import { Link, Redirect, router } from 'expo-router';
import { HeaderButton } from '../../components/HeaderButton';
import Logo from '../../../assets/images/nova-logo.png';
import { StatusBar } from 'expo-status-bar';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/src/store';
import { actions, verifyUserLogged } from '@/src/store/auth/auth-slice';

const DrawerContent = (props: DrawerContentComponentProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const authData = useAppSelector((state) => state.auth);

  useEffect(() => {
      dispatch(verifyUserLogged());
  }, []);

  if(!authData.user.id){
    return <Redirect href="/login" />;
  }

  const handleLogout = () => {
    dispatch(actions.logout());
    router.push("/login")
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.logoContainer}>
        <Image
          source={Logo}
          style={styles.logo}
          resizeMode='contain'
        />
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Sair"
          onPress={handleLogout}
          icon={({ color, size }) => <FontAwesome5 name="sign-out-alt" size={size} color={'#FFF'} />}
          style={styles.drawerItemStyle}
          labelStyle={{color: '#FFF'}}
        />
      </DrawerContentScrollView>
    </View>
  );
};

const DrawerLayout = () => (
  <Drawer 
    initialRouteName='ordem-servico'
    screenOptions={{ 
      drawerActiveBackgroundColor: '#FFF',
      drawerActiveTintColor: '#000',
      drawerInactiveTintColor: '#FFF',
      drawerStyle: {
        backgroundColor: '#000'
      },
      headerRight: () => (
        <Link href="/modal" asChild>
          <HeaderButton />
        </Link>
      ),
    }}
    drawerContent={(props) => 
      <DrawerContent {...props} />
    }
  >
    <Drawer.Screen
      name="index"
      options={{
        headerTitle: 'Início',
        drawerLabel: 'Início',
        drawerItemStyle: styles.drawerItemStyle,
        drawerIcon: ({ size, color }) => <FontAwesome6 name="chart-area" size={size} color={color} />,
      }}
    />
    <Drawer.Screen
      name="ordem-servico"
      options={{
        headerTitle: 'Ordens de Serviço',
        drawerLabel: 'Ordens de Serviço',
        drawerItemStyle: styles.drawerItemStyle,
        drawerIcon: ({ size, color }) => <FontAwesome6 name="gear" size={size} color={color} />,
      }}
    />
    <Drawer.Screen
      name="pecas"
      options={{
        headerTitle: 'Peças',
        drawerLabel: 'Peças',
        drawerItemStyle: styles.drawerItemStyle,
        drawerIcon: ({ size, color }) => <FontAwesome6 name="screwdriver-wrench" size={size} color={color}  />,
      }}
    />
    <Drawer.Screen
      name="clientes"
      options={{
        headerTitle: 'Clientes',
        drawerLabel: 'Clientes',
        drawerItemStyle: styles.drawerItemStyle,
        drawerIcon: ({ size, color }) => <FontAwesome6 name="user-group" size={size} color={color} />,
      }}
    />
    <Drawer.Screen
      name="problemas"
      options={{
        headerTitle: 'Problemas',
        drawerLabel: 'Problemas',
        drawerItemStyle: styles.drawerItemStyle,
        drawerIcon: ({ size, color }) => <FontAwesome5 name="exclamation-circle" size={size} color={color} />,
      }}
    />
    <Drawer.Screen
      name="servicos"
      options={{
        headerTitle: 'Serviços',
        drawerLabel: 'Serviços',
        drawerItemStyle: styles.drawerItemStyle,
        drawerIcon: ({ size, color }) => <FontAwesome5 name="briefcase" size={size} color={color} />,
      }}
    />
    <Drawer.Screen
      name="marcas"
      options={{
        headerTitle: 'Marcas',
        drawerLabel: 'Marcas',
        drawerItemStyle: styles.drawerItemStyle,
        drawerIcon: ({ size, color }) => <FontAwesome5 name="building" size={size} color={color} />,
      }}
    />
  </Drawer>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center', 
    padding: 20 , 
    marginTop: 45,
    marginBottom: -30,
    borderBottomWidth: 1, 
    borderBottomColor: 'rgb(230,230,230)'
  },
  logo: {
    width: 280, 
    height: 160 
  },
  drawerItemStyle:{
    marginBottom: 10
  }
});

export default DrawerLayout;
