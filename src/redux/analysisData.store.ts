import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AnalysisState } from "@/types/analysis.types";
import { Api } from "@/api/analysis.api";
import type { AnalysisResponse } from "@/types/api.types";
import { AxiosError } from 'axios';
import type { AnalysisError } from "@/types/status.types";

const initialState: AnalysisState = {
  analysisData: null,
  loading: false,
  error: null,
  message: null
};

const api = new Api();
export const getAnalysis = createAsyncThunk<AnalysisResponse, string, {rejectValue: AnalysisError}>(
    'analysis/getAnalysis',
     async (domain, {rejectWithValue}) => {
        try {
            const data: AnalysisResponse = await api.getAnalysisData(domain);
            return data;
        }
        catch (error: unknown) {
            const axiosError = error as AxiosError
            return rejectWithValue({
                statusCode: axiosError.response?.status || 500,
                statusText: axiosError.response?.statusText || 'Неизвестная ошибка',
                message: axiosError.message || 'Произошла неизвестная ошибка',
                details: axiosError.response?.data,
                timestamp: new Date().toISOString()
            });
        }
    }
);

const analysisSlice = createSlice({
    name: 'analysis',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(getAnalysis.pending, state => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAnalysis.fulfilled, (state, action) => {
            state.loading = false;
            state.analysisData = action.payload.data;
            state.message = action.payload.message;
        })
        .addCase(getAnalysis.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as AnalysisError;
            state.message = `Ошибка ${(action.payload as AnalysisError).statusCode}: ${(action.payload as AnalysisError).statusText}`;
        })
    }
});

export default analysisSlice.reducer;