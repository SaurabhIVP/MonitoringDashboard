import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import GanttPage from "../pages/GanttPage";
import Charts from "../pages/Charts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Dashboard></Dashboard> },
      { path: "/gantt", element: <GanttPage></GanttPage> },
      { path: "/charts", element: <Charts></Charts> },
    ],
  },
]);
