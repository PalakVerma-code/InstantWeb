import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';

const userSlice=createSlice({
    name:'user',
    initialState:{
        userData:null,
        loading:false,
        error:null
    },
    reducers:{
         setUserData:(state,action)=>{
            state.userData=action.payload;
         }
    }

})

export const {setUserData}=userSlice.actions;

export default userSlice.reducer;