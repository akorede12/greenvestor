import { api } from "../../utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import project1 from '../../assets/images/projects/project01.svg';
import project2 from '../../assets/images/projects/project02.svg';

const data = [
    {
        id: 1,
        image:project1,
        features: ["Support impactful initiatives", "earn sustainable returns", "create a greener world"],
        summary: "Investing in sustainable projects with Greenvestor goes beyond financial gains - it's about driving positive change and contributing to a greener world.",
    },
    {
        id: 2,
        image:project2,
        features: ["Support impactful initiatives", "earn sustainable returns", "create a greener world"],
        summary: "Investing in sustainable projects with Greenvestor goes beyond financial gains - it's about driving positive change and contributing to a greener world.",
    },
    {
        id: 3,
        image:project1,
        features: ["Support impactful initiatives", "earn sustainable returns", "create a greener world"],
        summary: "Investing in sustainable projects with Greenvestor goes beyond financial gains - it's about driving positive change and contributing to a greener world.",
    },
    {
        id: 4,
        image:project2,
        features: ["Support impactful initiatives", "earn sustainable returns", "create a greener world"],
        summary: "Investing in sustainable projects with Greenvestor goes beyond financial gains - it's about driving positive change and contributing to a greener world.",
    },
];

// async api calls
export const all = createAsyncThunk("invest.slice/all", async data => await api.post("projects/", data));

const invest = createSlice({
    name: "invest", // a unique name for identifying the reducer in the root reducer
    reducers: ({}),
    initialState: ({ load: false, error: false, data }), // reducer"s initial states
    extraReducers: ({ addCase }) => { // used for updating the states when fetching an api data and error handling
        addCase(all.pending, state => { state.load = true; });
    },
});

export default invest.reducer;
