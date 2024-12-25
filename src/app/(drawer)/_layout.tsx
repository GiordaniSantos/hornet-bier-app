import React from 'react';
import { View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import { Link } from 'expo-router';
import { HeaderButton } from '../../components/HeaderButton';
import Logo from '../../../assets/images/nova-logo.png';

const DrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', padding: 20 }}>
        <Image
          source={Logo}
          style={{ width: 280, height: 160 }}
          resizeMode='contain'
        />
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};

const DrawerLayout = () => (
  <Drawer 
    screenOptions={{ 
      drawerActiveBackgroundColor: '#FFF',
      drawerStyle: {
        backgroundColor: '#000'
      }
    }}
    drawerContent={(props) => 
      <DrawerContent {...props} />
    }
  >
    <Drawer.Screen
      name="index"
      options={{
        headerTitle: 'Home',
        drawerLabel: 'Home',
        drawerIcon: ({ size, color }) => <Ionicons name="home-outline" size={size} color={color} />,
        headerRight: () => (
          <Link href="/modal" asChild>
            <HeaderButton />
          </Link>
        ),
      }}
    />
  </Drawer>
);

export default DrawerLayout;
