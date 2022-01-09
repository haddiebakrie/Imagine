import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { IImageReducers, IImageState } from "../../types/image-state";
import getCroppedImg from "../helpers/get-cropped-image";
import saveImage from "../helpers/save-image";
import { AppState } from "../store";
import { resetCropperState } from "./cropper-slice";

const initialState: IImageState = {
  image: null,
  quality: 100,
  loading: false,
  output: "jpeg",
  alert: null,
  cropperOpen: false,
};

export const desmissAlert = createAsyncThunk<null, undefined>(
  "image/desmissAlert",
  async () => {
    return null;
  }
);

export const saveCompressedImage = createAsyncThunk<File | void, void>(
  "image/saveCompressedImage",
  async (_, { rejectWithValue, getState }) => {
    const { image, quality, output } = (getState() as AppState).image;

    if (!image) {
      rejectWithValue("Please upload a image");
      return;
    }

    try {
      const file = await saveImage(image.file, quality, output);
      return file;
    } catch (error) {
      rejectWithValue("Failed to compress image");
    }
  }
);

export const setCroppedImage = createAsyncThunk<File | void, void>(
  "image/setCroppedImage",
  async (_, { rejectWithValue, getState, dispatch }) => {
    const { image, cropper } = getState() as AppState;

    if (!image.image) {
      rejectWithValue("Please upload a image");
      return;
    }

    if (!cropper.croppedAreaPixels) {
      rejectWithValue("You don't have an active cropped area");
      return;
    }

    try {
      const file = await getCroppedImg(
        image.image.url,
        cropper.croppedAreaPixels,
        cropper.rotation
      );

      if (!file) {
        rejectWithValue("Invalid image");
        return;
      }

      dispatch(resetCropperState());
      return file;
    } catch (error) {
      rejectWithValue("Failed to crop image");
    }
  }
);

export const imageSlice = createSlice<IImageState, IImageReducers>({
  name: "image",
  initialState,
  reducers: {
    setImage(state, { payload }) {
      state.image = {
        file: payload,
        url: URL.createObjectURL(payload),
      };
    },
    changeQuality(state, { payload }) {
      state.quality = payload;
    },
    changeOutput(state, { payload }) {
      state.output = payload;
    },
    setAlert(state, { payload }) {
      state.alert = payload;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    toggleCropperOpen(state) {
      state.cropperOpen = !state.cropperOpen;
    },
    resetImageState(state) {
      state = initialState;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(desmissAlert.fulfilled, (state, { payload }) => {
        state.alert = payload;
      })
      .addCase(setCroppedImage.fulfilled, (state, { payload }) => {
        if (payload) {
          state.image = {
            file: payload,
            url: URL.createObjectURL(payload),
          };
          state.loading = false;
          state.cropperOpen = false;
        }
      })
      .addCase(saveCompressedImage.fulfilled, (state, { payload }) => {
        if (payload) {
          state.image = {
            file: payload,
            url: URL.createObjectURL(payload),
          };
          state.quality = 100;
          state.loading = false;
        }
      })
      .addMatcher(
        isAnyOf(saveCompressedImage.pending, saveCompressedImage.pending),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        isAnyOf(saveCompressedImage.rejected, saveCompressedImage.rejected),
        (state, { payload }) => {
          state.alert = {
            severety: "error",
            message: payload as string,
          };
        }
      );
  },
});

export const {
  setImage,
  changeQuality,
  changeOutput,
  toggleCropperOpen,
  toggleLoading,
  setAlert,
  resetImageState,
} = imageSlice.actions;
export const selectImageState = (state: AppState) => state.image;
export const selectCurrentImageState = (state: AppState) => state.image.image;
export const selectAlertState = (state: AppState) => state.image.alert;
export default imageSlice.reducer;
