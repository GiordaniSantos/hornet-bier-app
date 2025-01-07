import api from "@/src/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { router } from 'expo-router';

interface User {
    email: string;
    password: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
}

const initialState: AuthState = {
    user: {
        email: "",
        password: ""
    },
    token: "",
    isLoading: false
}

function logout(state: AuthState) {
    state.user = initialState.user;
    state.token = initialState.token;
    state.isLoading = false;
    AsyncStorage.clear()
}

export const loginUser = createAsyncThunk(
    'auth/login',
    async (userData: { user: User }, { rejectWithValue }) => {
        try {
            const { user } = userData;

            const res =  await api.post(
                '/login',
                {
                    email: user.email,
                    password: user.password
                }  
            );  

            if(res.data.user){
                api.defaults.headers.Authorization = `Bearer ${res.data.token}`
                api.defaults.params = { id_usuario: res.data.user.id }
                await AsyncStorage.setItem('@MEAuth:user', JSON.stringify(res.data.user))
                await AsyncStorage.setItem('@MEAuth:token', res.data.token)
                router.push("/")
                return { user: res.data.user, token: res.data.token };
            }
        } catch (error) {
            return rejectWithValue('Falha no Login');
        }
    }
);

export const verifyUserLogged = createAsyncThunk(
    'auth/verifyUser Logged',
    async (_, { rejectWithValue }) => {
        try {
            const token = await AsyncStorage.getItem('@MEAuth:token');
            const user = await AsyncStorage.getItem('@MEAuth:user');
            
            if (token && user) {
                return { user: JSON.parse(user), token };
            }
            return null;
            
        } catch (error) {
            return rejectWithValue('Failed to verify user');
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string } | undefined>) => {
                if(action.payload){
                    state.user = action.payload.user;
                    state.token = action.payload.token;
                }
                state.isLoading = false;
            })
            .addCase(loginUser.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(verifyUserLogged.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(verifyUserLogged.fulfilled, (state, action: PayloadAction<{ user: User; token: string } | null>) => {
                if (action.payload) {
                    state.user = action.payload.user;
                    state.token = action.payload.token;
                }
                state.isLoading = false;
            })
            .addCase(verifyUserLogged.rejected, (state) => {
                state.isLoading = false;
            });
    }
})

export const { reducer: authReducer, actions } = authSlice;