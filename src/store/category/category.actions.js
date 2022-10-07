import { createAction } from "../../utils/reducer/reducer.util";
import { CATEGORIES_ACTION_TYPES } from "./category.types";

export const setCategoriesMap = (data) =>
  createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP, data);
