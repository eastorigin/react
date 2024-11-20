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
  } else if (type === "CHECKED") {
    return state.map((item) => {
      if (item.id === action.payload.id) {
        item.isChecked = action.payload.isChecked;
      }
      return item;
    });
  }

  return state;
};
