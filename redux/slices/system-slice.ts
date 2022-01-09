import { createSlice } from "@reduxjs/toolkit";
import type {
  ISystemReducers,
  ISystemState,
} from "../../types/system-state-interface";
import type { AppState } from "../store";

export const systemSlice = createSlice<ISystemState, ISystemReducers>({
  name: "sytem",
  initialState: {
    darkTheme: false,
    language: "en",
  },
  reducers: {
    changeTheme(state) {
      state.darkTheme = !state.darkTheme;
    },
    changeLanguage(state, { payload }) {
      state.language = payload;
    },
  },
});

export const { changeTheme, changeLanguage } = systemSlice.actions;
export const selectSystemState = (state: AppState) => state.system;
export const selectDarkThemeState = (state: AppState) => state.system.darkTheme;
export const selectLanguageState = (state: AppState) => state.system.language;
export default systemSlice.reducer;
