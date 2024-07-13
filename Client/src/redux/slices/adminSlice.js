import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInst";
import toast from "react-hot-toast";


const initialState={
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || 'ADMIN',
    data: localStorage.getItem('data') || {},
}

export const adminLogin=createAsyncThunk('/auth/admin',async (data)=>{
    try {
        
        const response= axiosInstance.post('/admin/login',data);
        toast.promise(response,{
            loading:' verfication ...',
            success:(data)=>{
                 return data?.data?.message
            },
            error:'failed to login account'
        })
        return await response;

    } catch (error) {
        
         toast.error(error);
    }
})

const adminSlice=createSlice({
    name:'admin',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(adminLogin.fulfilled,(state,action)=>{
            console.log(action);
         localStorage.setItem('data',JSON.stringify(action?.payload?.data));
         localStorage.setItem('isLoggedIn',true);
         localStorage.setItem("role",action?.payload?.data?.admin?.role);
         state.data = action?.payload?.data;
         state.isLoggedIn=localStorage.getItem('isLoogedIn');   
         state.role=action?.payload?.data?.admin?.role;
        })

    }
})

export default adminSlice.reducer;