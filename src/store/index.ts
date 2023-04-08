import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector as useReduxSelector } from "react-redux";
import file from "./file"

const rootReducer = combineReducers({
  file: file.reducer,
});

//* 스토어의 타입
export type RootState = ReturnType<typeof rootReducer>;

//* 타입 지원하는 커스텀 useSelector
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export default store;