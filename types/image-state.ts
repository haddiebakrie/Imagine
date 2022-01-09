import type {
  Action,
  CaseReducer,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import { IAlert } from "./alert-interface";
import { IImage } from "./image-interface";

export type tOutput = "png" | "jpeg" | "webp";

export interface IImageState {
  image: IImage | null;
  quality: number;
  loading: boolean;
  output: tOutput;
  alert: IAlert | null;
  cropperOpen: boolean;
}

export interface IImageReducers extends SliceCaseReducers<IImageState> {
  setImage: CaseReducer<IImageState, PayloadAction<File>>;
  changeQuality: CaseReducer<IImageState, PayloadAction<number>>;
  changeOutput: CaseReducer<IImageState, PayloadAction<tOutput>>;
  toggleCropperOpen: CaseReducer<IImageState, Action>;
  toggleLoading: CaseReducer<IImageState, Action>;
  resetImageState: CaseReducer<IImageState, Action>;
  setAlert: CaseReducer<IImageState, PayloadAction<IAlert>>;
}
