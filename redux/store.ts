import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { useMemo } from "react";
import cropper from "./slices/cropper-slice";
import system from "./slices/system-slice";
import image from "./slices/image-slice";

export function createStore(preloadedState = {}) {
  return configureStore({
    reducer: {
      system,
      cropper,
      image,
    },
    preloadedState,
  });
}
const defaultStore = createStore();

let store: typeof defaultStore | undefined;
export const initializeStore = (preloadedState = {}) => {
  let _store = store ?? createStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = createStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export type AppState = ReturnType<typeof defaultStore.getState>;
export type AppDispatch = typeof defaultStore.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export function useStore(initialState: any) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
