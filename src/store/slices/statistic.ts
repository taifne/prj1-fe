import { createSlice } from "@reduxjs/toolkit";

const statistic = createSlice({
    name: "statistic",
    initialState: {
        listAlert: {
            critical_alert_arr: [10, 5, 5],
            high_alert_arr: [6, 20, 3],
            medium_alert_arr: [22, 33, 1],
            low_alert_arr: [3, 71, 44],
        },
        listTenant: []
    },
    reducers: {
        getAllTenant: (state, action) => {
            state.listTenant = action.payload;
        },
        getAlert: (state, action) => {
            state.listAlert = action.payload;
        },
    },
});

export const { getAlert } = statistic.actions;

export default statistic.reducer;
