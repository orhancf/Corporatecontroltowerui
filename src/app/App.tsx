import { RouterProvider } from "react-router";
import { router } from "./routes";
import { TooltipProvider } from "./components/ui/tooltip";

export default function App() {
  return (
    <div className="dark size-full">
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </div>
  );
}