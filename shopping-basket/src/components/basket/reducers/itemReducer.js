export const itemReducer = (state, action) => {
  const type = action.type;
  if (type === "ADD") {
    return [
      {
        id: state.length,
        name: action.payload.name,
        price: action.payload.price,
        number: action.payload.number,
        picture: action.payload.picture,
      },
      ...state,
    ];
  }

  return state;
};
