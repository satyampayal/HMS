import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast'
import axiosInstance from "../../config/axiosInst";


const initialState={
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    // role: localStorage.getItem('role') || '',
    data: localStorage.getItem('data') || {},
}

const loginUser=createAsyncThunk('/user/auth/login',async (data)=>{
    try {
        
        const response =axiosInstance.post('/user/login',data);
        toast.promise(response,{
            loading:"wait for verfication account",
            success: (data) => {
                return data?.data?.message;
              },
              error: 'Failed to authenticate your account'

        })
        return await response;
    } catch (error) {
    toast.error(error?.response?.data?.message);
        
    }
})

const userSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(loginUser.fulfilled,(state,action)=>{
        localStorage.setItem('data', JSON.stringify(action?.payload?.data));
        localStorage.setItem('isLoggedIn', true);
        state.isLoggedIn =localStorage.getItem('isLoggedIn');
        state.data = action?.payload?.data;
        })
    }
})

export default   userSlice.reducer;