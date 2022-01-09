import { createSlice } from "@reduxjs/toolkit";
import type {
  ICropperReducers,
  ICropperState,
} from "../../types/cropper-state-interface";
import { AppState } from "../store";

const initialState: ICropperState = {
  crop: { x: 0, y: 0 },
  rotation: 0,
  zoom: 1,
  croppedAreaPixels: null,
  ratio: 1,
};

export const cropperSlice = createSlice<ICropperState, ICropperReducers>({
  name: "cropper",
  initialState,
  reducers: {
    setCrop(state, { payload }) {
      state.crop = payload;
    },
    setCropArea(state, { payload }) {
      state.croppedAreaPixels = payload;
    },
    setRotation(state, { payload }) {
      state.rotation = payload;
    },
    setZoom(state, { payload }) {
      state.zoom = payload;
    },
    setRatio(state, { payload }) {
      state.ratio = payload;
    },
    resetCropperState(state) {
      state = initialState;
      return state;
    },
  },
});

export const {
  setCrop,
  setCropArea,
  setZoom,
  setRotation,
  setRatio,
  resetCropperState,
} = cropperSlice.actions;
export const selectCropperState = (state: AppState) => state.cropper;
export default cropperSlice.reducer;
