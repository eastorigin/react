import { createContext, useReducer } from "react";
import { itemReducer } from "../reducers/itemReducer";

export const ItemContext = createContext({
  contextItem: [],
  contextAddItem(name, price, number, picture, alertRef) {},
  contextChecked(event) {},
  contextAllChecked(event) {},
  contextDeleteItem(event) {},
});

export function ItemContextProvider({ children }) {
  const [item, itemDispatcher] = useReducer(itemReducer, []);

  const contextImplementation = {
    contextItem: item,

    contextChecked(event) {
      const checkedId = parseInt(event.target.value);
      const isChecked = event.target.checked;

      itemDispatcher({
        type: "CHECKED",
        payload: { id: checkedId, isChecked },
      });
    },

    contextAllChecked(event) {
      const isChecked = event.target.checked;

      itemDispatcher({
        type: "ALLCHECKED",
        payload: { isChecked },
      });
    },

    contextAddItem(name, price, number, picture, alertRef) {
      let alertMessages = [];
      if (!name) {
        alertMessages.push("상품명을 입력하세요");
      }

      if (!price) {
        alertMessages.push("상품 가격을 입력하세요");
      }

      if (!number) {
        alertMessages.push("상품 수량을 입력하세요");
      }

      if (!picture) {
        alertMessages.push("상품 사진을 등록하세요");
      }

      if (!name || !price || !number || !picture) {
        alertRef.current.show(alertMessages);
        return false;
      }

      itemDispatcher({
        type: "ADD",
        payload: { name, price, number, picture },
      });
    },

    contextDeleteItem(event) {
      const deleteId = parseInt(event.target.value);

      itemDispatcher({
        type: "DELETE",
        payload: { id: deleteId },
      });
    },
  };

  return (
    <ItemContext.Provider value={contextImplementation}>
      {children}
    </ItemContext.Provider>
  );
}
