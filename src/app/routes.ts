import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Inventory } from "./pages/Inventory";
import { Orders } from "./pages/Orders";
import { Suppliers } from "./pages/Suppliers";
import { Production } from "./pages/Production";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "inventory", Component: Inventory },
      { path: "orders", Component: Orders },
      { path: "suppliers", Component: Suppliers },
      { path: "production", Component: Production },
    ],
  },
]);
