import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Recharge {
  id: number;
  mobile: string;
  operator: string;
  amount: number;
  paymentMethod: string;
  transactionId: string;
  status: string;
  date: string;
}

interface RechargeState {
  recharges: Recharge[];
}

const initialState: RechargeState = {
  recharges: [],
};

const rechargeSlice = createSlice({
  name: "recharge",
  initialState,
  reducers: {
    addRecharge: (state, action: PayloadAction<any>) => {
      state.recharges.push({
        id: Date.now(),
        ...action.payload,
        transactionId: "TXN" + Date.now(),
        status: "Success",
        date: new Date().toLocaleString(),
      });
    },
  },
});

export const { addRecharge } = rechargeSlice.actions;
export default rechargeSlice.reducer;
