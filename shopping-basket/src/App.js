import { ItemContextProvider } from "./components/basket/contexts/ItemContext";
import ShoppingBasket from "./components/basket/ShoppingBasket";

export default function App() {
  return (
    <ItemContextProvider>
      <ShoppingBasket />
    </ItemContextProvider>
  );
}
