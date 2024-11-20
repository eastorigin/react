import { ItemContextProvider } from "./components/basket/contexts/ItemContext";
import ShoppingBasket from "./components/basket/ShoppingBasket";
import TotalPrice from "./components/basket/TotalPrice";

export default function App() {
  return (
    <ItemContextProvider>
      <ShoppingBasket />
      <TotalPrice />
    </ItemContextProvider>
  );
}
