import { AnyAction } from "redux";
import { Category } from "./category.types";

import {
  fetchCategoriesStart,
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
} from "./category.actions";

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

export const CATEGORY_INITIAL_STATE = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (
  state = CATEGORY_INITIAL_STATE,
  action = {} as AnyAction
): CategoriesState => {
  if (fetchCategoriesStart.match(action)) {
    return { ...state, isLoading: true };
  }

  if (fetchCategoriesFailed.match(action)) {
    return { ...state, error: action.payload };
  }

  if (fetchCategoriesSuccess.match(action)) {
    return { ...state, categories: action.payload };
  }

  return state;
};
