import { configureStore } from "@reduxjs/toolkit";
import analysisReduser from './analysisData.store';

const store = configureStore({
    reducer: {
        analysis: analysisReduser,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };