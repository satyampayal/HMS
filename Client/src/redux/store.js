import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/userSlice';
import adminReducer from './slices/adminSlice';


const store=configureStore({
    reducer:{
      auth:authReducer,
      admin:adminReducer,
    },
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware({serializableCheck:false}),
    devTools:true
});

export default store;