import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Plan {
  id: number;
  operator: string;
  price: number;
  data: string;
  validity: string;
}

interface PlanState {
  plans: Plan[];
}

const initialState: PlanState = {
  plans: [],
};

const planSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    addPlan: (state, action: PayloadAction<Omit<Plan, "id">>) => {
      state.plans.push({
        id: Date.now(),
        ...action.payload,
      });
    },

    deletePlan: (state, action: PayloadAction<number>) => {
      state.plans = state.plans.filter(
        (plan) => plan.id !== action.payload
      );
    },
    updatePlan: (state, action) => {
    const { id, operator, price, data, validity } = action.payload;

    const index = state.plans.findIndex((p) => p.id === id);

    if (index !== -1) {
      state.plans[index] = {
        id,
        operator,
        price,
        data,
        validity,
      };
    }
  },

  },
});

export const { addPlan, deletePlan,updatePlan } = planSlice.actions;
export default planSlice.reducer;


