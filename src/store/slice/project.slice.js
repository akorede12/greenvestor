import { api } from "../../utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import project1 from '../../assets/images/projects/project01.svg';
import project2 from '../../assets/images/projects/project02.svg';

const data = [
    {
        id: 1,
        image: project1,
        amount: 250_000,
        category: 'energy',
        title: "Solar Harvest Energy Park",
        goal: "Reduce carbon emissions by 30% within five years.",
        vision: "A future where solar energy is accessible to all.",
        mission: "To power communities with clean, renewable energy.",
        summary: "At Solar Harvest Energy Park, we're dedicated to revolutionizing energy generation and combating climate change through renewable technology.",
    },
    {
        id: 2,
        image: project2,
        amount: 2_050_000,
        category: 'water',
        title: "GreenTech Urban Farm Initiative",
        goal: "Reduce carbon emissions by 30% within five years.",
        vision: "A future where solar energy is accessible to all.",
        mission: "To power communities with clean, renewable energy.",
        summary: "Our project is dedicated to creating technologically advanced vertical farms that produce fresh, nutritious produce while minimizing environmental impact.",
    },
    {
        id: 3,
        image: project1,
        amount: 1_250_000,
        category: 'energy',
        title: "Solar Harvest Energy Park",
        goal: "Reduce carbon emissions by 30% within five years.",
        vision: "A future where solar energy is accessible to all.",
        mission: "To power communities with clean, renewable energy.",
        summary: "At Solar Harvest Energy Park, we're dedicated to revolutionizing energy generation and combating climate change through renewable technology.",
    },
    {
        id: 4,
        image: project1,
        amount: 250_000,
        category: 'energy',
        title: "Solar Harvest Energy Park",
        goal: "Reduce carbon emissions by 30% within five years.",
        vision: "A future where solar energy is accessible to all.",
        mission: "To power communities with clean, renewable energy.",
        summary: "At Solar Harvest Energy Park, we're dedicated to revolutionizing energy generation and combating climate change through renewable technology.",
    },
    {
        id: 5,
        image: project2,
        amount: 2_050_000,
        category: 'water',
        title: "GreenTech Urban Farm Initiative",
        goal: "Reduce carbon emissions by 30% within five years.",
        vision: "A future where solar energy is accessible to all.",
        mission: "To power communities with clean, renewable energy.",
        summary: "Our project is dedicated to creating technologically advanced vertical farms that produce fresh, nutritious produce while minimizing environmental impact.",
    },
    {
        id: 6,
        image: project1,
        amount: 1_250_000,
        category: 'energy',
        title: "Solar Harvest Energy Park",
        goal: "Reduce carbon emissions by 30% within five years.",
        vision: "A future where solar energy is accessible to all.",
        mission: "To power communities with clean, renewable energy.",
        summary: "At Solar Harvest Energy Park, we're dedicated to revolutionizing energy generation and combating climate change through renewable technology.",
    },

];

// async api calls
export const all = createAsyncThunk("project.slice/all", async data => await api.post("projects/", data));

const project = createSlice({
    name: "project", // a unique name for identifying the reducer in the root reducer
    reducers: ({}),
    initialState: ({ load: false, error: false, data }), // reducer"s initial states
    extraReducers: ({ addCase }) => { // used for updating the states when fetching an api data and error handling
        addCase(all.pending, state => { state.load = true; });
    },
});

export default project.reducer;
