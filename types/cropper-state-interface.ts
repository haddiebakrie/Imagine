import type {
  Action,
  CaseReducer,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import type { Area, Point } from "react-easy-crop/types";

export interface ICropperState {
  crop: Point;
  rotation: number;
  zoom: number;
  croppedAreaPixels: Area | null;
  ratio: number;
}

export interface ICropperReducers extends SliceCaseReducers<ICropperState> {
  setCrop: CaseReducer<ICropperState, PayloadAction<Point>>;
  setCropArea: CaseReducer<ICropperState, PayloadAction<Area>>;
  setZoom: CaseReducer<ICropperState, PayloadAction<number>>;
  setRotation: CaseReducer<ICropperState, PayloadAction<number>>;
  resetCropperState: CaseReducer<ICropperState, Action>;
  setRatio: CaseReducer<ICropperState, PayloadAction<number>>;
}
