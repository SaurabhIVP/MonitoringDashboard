import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import GanttPage from "../pages/daily gantt/GanttPage";
import Charts from "../pages/trend analysis/Charts";
import HomePage from "../pages/home/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage></HomePage>},
      { path: "/gantt", element: <GanttPage></GanttPage> },
      { path: "/charts", element: <Charts></Charts> },
    ],
  },
]);
