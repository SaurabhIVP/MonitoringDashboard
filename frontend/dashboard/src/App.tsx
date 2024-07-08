import React, { useState } from "react";
import "./App.css";
import { Outlet, useNavigate } from "react-router";
import AppBarComponent from "./components/appbar/AppBarComponent";

function App() {
  const history = useNavigate();
  const [selectedTab, setSelectedTab] = useState<number | null>(null);
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    if (newValue === 0) {
      history("/");
    } else if (newValue == 1) {
      history("/gantt");
    }else if (newValue==2){
      history("/charts")
    }
  };
  return (
    <div className="App" style={{overflow:'hidden'}}>
      <AppBarComponent
        selectedTab={selectedTab}
        handleTabChange={handleTabChange}
      />
      <Outlet ></Outlet>
      {/* <Dashboard/> */}
      {/* <GanttPage></GanttPage> */}
    </div>
  );
}

export default App;
