import type {
  Action,
  CaseReducer,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";

export type tLang = "pt" | "en";

export interface ISystemState {
  language: tLang;
  darkTheme: boolean;
}

export interface ISystemReducers extends SliceCaseReducers<ISystemState> {
  changeTheme: CaseReducer<ISystemState, Action>;
  changeLanguage: CaseReducer<ISystemState, PayloadAction<tLang>>;
}
