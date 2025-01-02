import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/src/store';
import { actions, loginUser } from '@/src/store/auth/auth-slice';

type formData = {
  email: string;
  password: string;
}

export default function FormLogin() {
    const dispatch = useDispatch<AppDispatch>();

    const { control, handleSubmit, formState: { errors } } = useForm<formData>({
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const onSubmit = async (data: formData) => {
        //console.log(data)
        const userData = { user: { email: 'example@example.com', id: 1, nome: 'Example' }, token: 'your_token' };
        
        await dispatch(loginUser(userData));
        router.push("/")
    }

    return (
        <>
            <Controller
                control={control}
                rules={{
                    required: true,
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Digite um email válido!"
                    }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <View style={[styles.containerInput]}>
                            <FontAwesome style={styles.icon} name="at" size={20} color="black" />
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                placeholder='Email'
                                onChangeText={onChange}
                                value={value}
                            />
                        </View>
                        {errors.email && errors.email.type == "required" && <Text style={styles.textError}>Preencha este campo!</Text>}
                        {errors.email && errors.email.type == "pattern" && <Text style={styles.textError}>Digite um email válido!</Text>}
                    </>
                )}
                name="email"
            />
            <Controller
                control={control}
                rules={{
                    required: true
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <View style={[styles.containerInput]}>
                            <FontAwesome style={styles.icon} name="lock" size={20} color="black" />
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                secureTextEntry={true}
                                onChangeText={onChange}
                                placeholder='Senha'
                                value={value}
                            />
                        </View>
                        {errors.password && errors.password.type == "required" && <Text style={styles.textError}>Preencha este campo!</Text>}
                    </>
                )}
                name="password"
            />
            <View style={styles.buttonLogin}>
                <Button title={"Entrar"} color={'#1cc88a'} onPress={handleSubmit(onSubmit)} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    buttonLogin: {
        marginTop: 20,
    },
    textError: {
        marginTop: 5,
        marginBottom: 3,
        color: '#fc0303'
    },
    containerInput: {
        width: '100%',
        height: 40,
        borderWidth: 0.5,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#FFF'
    },
    icon: {
        color: '#333',
        marginLeft: 20
    },
    input: {
        marginLeft: 20,
        width: '70%',
        height: '100%',
    }
});
