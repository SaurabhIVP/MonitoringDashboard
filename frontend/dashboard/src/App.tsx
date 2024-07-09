import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AppBarComponent from "./components/appbar/AppBarComponent";
import "./App.css";

const App: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<number | null>(null);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    switch (newValue) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/gantt");
        break;
      case 2:
        navigate("/charts");
        break;
      default:
        break;
    }
  };

  return (
    <div className="App" style={{ overflow: "hidden" }}>
      <AppBarComponent selectedTab={selectedTab} handleTabChange={handleTabChange} />
      <Outlet />
    </div>
  );
};

export default App;
