export const loggerMiddleware = (store) => (next) => (action) => {
  console.log("logger excuted: ", { store, next, action });

  if (!action.type) {
    return next(action);
  }

  console.log({
    type: action.type,
    payload: action.payload,
    currentState: store.getState(),
  });

  next(action);
  console.log("next state: ", store.getState());
};
