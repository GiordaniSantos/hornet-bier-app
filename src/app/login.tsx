import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, ScrollView } from 'react-native';
import Logo from '../../assets/images/nova-logo.png';
import { View } from '@/src/components/Themed';
import FormLogin from '../components/forms/FormLogin';
import SweetAlert from '../components/sweetAlert';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

export default function Login() {

    useEffect(() => {
        const hideSplashScreen = async () => {
            await SplashScreen.preventAutoHideAsync();
            await SplashScreen.hideAsync();
        };

        hideSplashScreen();
    }, []);
    
    return (
        <View style={styles.background}>
            <SweetAlert />
            <StatusBar style={'light'} translucent={true} />
            <Image source={Logo} style={styles.logo} resizeMode='contain' />
            <View style={styles.formContainer}>
                <ScrollView>
                    <FormLogin />
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 210,
        height: 210,
        marginTop: 0,
        marginBottom: 0
    },
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        
    },
    formContainer: {
        backgroundColor: '#fff',
        padding: 20,
        width: '90%',
        borderRadius: 10
    },
});
