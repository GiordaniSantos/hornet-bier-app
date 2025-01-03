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
    isLoading: boolean;
}

const initialState: AuthState = {
    user: {
        email: "",
        id: 0,
        nome: "",
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
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
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