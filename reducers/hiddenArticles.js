import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
}

export const hiddenSlice = createSlice({
    name: 'hidden',
    initialState,
    reducers: {
        hidden: (state, action) => {
            state.value.push(action.payload);
        },
        removeHidden: (state,action) => {
            state.value = []
        },
    } 
})

export default hiddenSlice.reducer;
export const { hidden, removeHidden } = hiddenSlice.actions;