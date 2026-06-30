import { createSlice } from "@reduxjs/toolkit";

type CounterType = {
    value: number;
};

//Initial State
const initialState: CounterType = { value: 0 };

//Create Slice
const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        reset: (state) => {
            state.value = 0;
        },
    },
});
const action = counterSlice.actions;
export const { increment, decrement , reset } = action;
export default counterSlice.reducer;