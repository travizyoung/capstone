import { createSelector } from "reselect";

import { UserState } from "./user.reducer";
import { RootState } from "../store";

const selectUserRecuder = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(
  [selectUserRecuder],
  (user) => user.currentUser
);
