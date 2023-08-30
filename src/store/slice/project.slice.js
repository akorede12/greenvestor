import { api } from '../../utils';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// async api calls
export const all = createAsyncThunk('project.slice/all', async data => await api.post('projects/', data));

const project = createSlice({
    name: 'project', // a unique name for identifying the reducer in the root reducer
    reducers: ({}),
    initialState: ({ load: false, error: false, data: [] }), // reducer's initial states
    extraReducers: ({ addCase }) => { // used for updating the states when fetching an api data and error handling
        addCase(all.pending, state => { state.load = true; });
    },
});

export default project.reducer;
