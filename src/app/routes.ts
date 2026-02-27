import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Tower } from "./pages/Tower";
import { Planning } from "./pages/Planning";
import { Procurement } from "./pages/Procurement";
import { Masterdata } from "./pages/Masterdata";
import { IBP } from "./pages/IBP";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Tower },
      { path: "planning", Component: Planning },
      { path: "procurement", Component: Procurement },
      { path: "masterdata", Component: Masterdata },
      { path: "ibp", Component: IBP },
    ],
  },
]);