import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosInst";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
   role: localStorage.getItem('role') || 'USER',
  data: localStorage.getItem("data") || {},
};

// register user
export const registerUser = createAsyncThunk(
  "/user/auth/register",
  async (data) => {
    try {
      const response = axiosInstance.post("/user/register", data);
      toast.promise(response, {
        loading: "wait for verfication account",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to regsiter your account",
      });

      return await response;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const loginUser = createAsyncThunk("/user/auth/login", async (data) => {
  try {
    const response = axiosInstance.post("/user/login", data);
    toast.promise(response, {
      loading: "wait for verfication account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to authenticate your account",
    });
    return await response;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});
// export const myProfle = createAsyncThunk("/me", async () => {
//   try {
//     const response = axiosInstance.get("/user/me");

//     return await response;
//   } catch (error) {}
// });

export const logoutAccount=createAsyncThunk('logout/user',async ()=>{
 try {
    const response=axiosInstance.get('/user/logout');
    toast.promise(response,{
        loading:'wait for logout user',
        suucess:(data)=>{
            return 'logout Successfully';
        },
        error:'try again',
    })
    return await response;
 } catch (error) {
    toast.error('somethinh wrong')
    
 }
})

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      localStorage.setItem("data", JSON.stringify(action?.payload?.data));
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem('role',"USER");
      state.isLoggedIn = localStorage.getItem("isLoggedIn");
      state.data = action?.payload?.data;
      state.role="USER"
     }),
     builder.addCase(logoutAccount.fulfilled,(state,action)=>{
        localStorage.clear();
        state.isLoggedIn = false;
        state.data = {};
     })
    //   builder.addCase(myProfle.fulfilled, (state, action) => {
    //     localStorage.setItem("data", JSON.stringify(action?.payload?.data));
    //     state.data = action?.payload?.data;
    //   });
  },
});

export default userSlice.reducer;
