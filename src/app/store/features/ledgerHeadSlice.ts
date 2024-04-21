import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const url = 'http://localhost:4000/';

export interface QueryParams { pageSize: number; page: number; orderDir: string; orderBy: string; search: string }

export interface ILedgerHeadTypeState {
    LedgerId: string;
    LedgerName: string;
    UserId: string | null;
    LedgerHeadType: string;
    ParentName: string;
    DateCreated: string;
}

const initialState: { ledgers: ILedgerHeadTypeState[]; queryParams: QueryParams } = {
    ledgers: [],
    queryParams: { pageSize: 5, page: 1, orderDir: '', orderBy: '', search: '' }
};

export const ledgerSlice = createSlice({
    name: "ledger",
    initialState,
    reducers: {
        setQueryParams: (state, action: PayloadAction<QueryParams>) => {
            state.queryParams.search = action.payload.search
            state.queryParams.page = action.payload.page
            state.queryParams.pageSize = action.payload.pageSize
            state.queryParams.orderBy = action.payload.orderBy
            state.queryParams.orderDir = action.payload.orderDir
            return state
        }
    },
    extraReducers: (builder) => {
        builder.addCase(listLedgers.fulfilled, (state, action) => {
            state.ledgers = action.payload
        }
        )
    }
});

export const listLedgers = createAsyncThunk('ledgers/ledgersAsync', async (query: QueryParams) => {
    try {
        const token = sessionStorage.getItem('token')
        const response = await axios.get(`${url}Ledgers?search=${query.search}&page=${query.page}&pageSize=${query.pageSize}&orderBy=${query.orderBy}&orderDir=${query.orderDir}`, {
            headers: {
                "Content-Type": 'application/json',
                "X-Token": token
            }
        })
        // const total = Number(response.headers['x-count']) || 0
        return response.data;
    } catch (error) {
        console.log(error)
    }

})

export const ledgerHeadTypeReducer = ledgerSlice.reducer;
export const { setQueryParams } = ledgerSlice.actions;