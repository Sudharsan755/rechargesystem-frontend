import { createSlice } from "@reduxjs/toolkit";

interface AdminState {
  isAdmin: boolean;
}

const initialState: AdminState = {
  isAdmin: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loginAdmin: (state, action) => {
      const { id, password } = action.payload;

      if (id === "0000000000" && password === "0000") {
        state.isAdmin = true;
      } else {
        alert("Invalid Admin");
      }
    },
    logoutAdmin: (state) => {
      state.isAdmin = false;
    },
  },
});

export const { loginAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
