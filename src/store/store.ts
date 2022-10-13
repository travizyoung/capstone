import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import storage from "redux-persist/lib/storage";
// import thunk from "redux-thunk";
import logger from "redux-logger";

import { rootSaga } from "./root.saga";
import { rootReducer } from "./root.reducer";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  // thunk,
  sagaMiddleware,
].filter(Boolean);

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

// then run the saga
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
