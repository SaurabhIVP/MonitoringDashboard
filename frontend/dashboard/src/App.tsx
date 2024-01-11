import React, { useState } from "react";
import "./App.css";
import { Outlet, useNavigate } from "react-router";
import AppBarComponent from "./components/AppBarComponent";

function App() {
  const history = useNavigate();
  const [selectedTab, setSelectedTab] = useState<number | null>(null);
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    if (newValue === 0) {
      history("/");
    } else if (newValue == 1) {
      history("/ganttChart");
    }
  };
  return (
    <div className="App">
      <AppBarComponent
        selectedTab={selectedTab}
        handleTabChange={handleTabChange}
      />
      <Outlet></Outlet>
      {/* <Dashboard/> */}
      {/* <GanttPage></GanttPage> */}
    </div>
  );
}

export default App;
