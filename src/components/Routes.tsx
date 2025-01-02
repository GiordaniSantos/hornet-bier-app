import { router, Stack } from 'expo-router';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '../store';
import { useEffect } from 'react';
import { verifyUserLogged } from '../store/auth/auth-slice';

export default function Routes() {
    const dispatch = useDispatch<AppDispatch>();
    const authData = useAppSelector((state) => state.auth);

    useEffect(() => {
        dispatch(verifyUserLogged());
        console.log(authData)
        if (!authData.user.nome) {
            router.replace('/login');
        }
    }, []);

    return (
        <Stack>
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ title: 'Modal', presentation: 'modal' }} />
            <Stack.Screen name="login" options={{ title: 'Login', headerShown: false }} />
        </Stack>
    );
}
