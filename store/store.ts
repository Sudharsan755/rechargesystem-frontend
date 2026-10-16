import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import rechargeReducer from "./rechargeSlice";
import planReducer from "./planSlice";
import adminReducer from "./adminSlice";
// ✅ Load from LocalStorage
const loadState = () => {
  try {
    if (typeof window === "undefined") return undefined;

    const plans = localStorage.getItem("plans");
    const recharges = localStorage.getItem("recharges");

    return {
      plans: plans ? JSON.parse(plans) : { plans: [] },
      recharge: recharges ? JSON.parse(recharges) : { recharges: [] },
    };
  } catch {
    return undefined;
  }
};

const saveState = (state: any) => {
  try {
    localStorage.setItem("plans", JSON.stringify(state.plans));
    localStorage.setItem("recharges", JSON.stringify(state.recharge));
  } catch (error) {
    console.error(error);
  }
};



// ✅ Configure Store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    recharge: rechargeReducer,
    plans: planReducer,
    admin: adminReducer, 
  },
  preloadedState: loadState(),
});

// ✅ Subscribe to changes
store.subscribe(() => {
  saveState(store.getState());
});

// ✅ Types (VERY IMPORTANT)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
