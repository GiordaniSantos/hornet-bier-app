import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface User {
    email: string;
    id: number;
    nome: string;
}

interface AuthState {
    user: User;
    token: string;
}

const initialState: AuthState = {
    user: {
        email: "",
        id: 0,
        nome: "",
    },
    token: ""
}

function logout(state: AuthState) {
    AsyncStorage.clear()
}

export const loginUser  = createAsyncThunk(
    'auth/login',
    async (userData: { user: User; token: string }, { rejectWithValue }) => {
        try {
            const { user, token } = userData;

            await AsyncStorage.setItem('@MEAuth:user', JSON.stringify(user));
            await AsyncStorage.setItem('@MEAuth:token', token);

            return { user, token };
        } catch (error) {
            return rejectWithValue('Failed to save user data');
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
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(verifyUserLogged.fulfilled, (state, action: PayloadAction<{ user: User; token: string } | null>) => {
                if (action.payload) {
                    state.user = action.payload.user;
                    state.token = action.payload.token;
                }
            });
    }
})

export const { reducer: authReducer, actions } = authSlice;