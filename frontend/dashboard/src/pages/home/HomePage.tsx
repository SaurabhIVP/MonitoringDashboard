import { Button, Paper, ToggleButton, ToggleButtonGroup } from "@mui/material";
import ChainDetailsByTaskname from "../../api/ChainDetailsByTaskname";
import ChainDetailsNew from "../../api/ChainDetailsNew";
import TaskDetails from "../../api/TaskDetails";
import GridTable from "../../components/table/GridTable";
import { useState } from "react";

const HomePage = () => {
    const [selectedTab, setSelectedTab] = useState("left"); // Default to "left" (PM)

  const handleTabChange = (event:any, newValue:any) => {
    setSelectedTab(newValue);
  };
  return (
    <div style={{ paddingTop: "60px", paddingBottom: "0px" }}>
      <Paper elevation={30} sx={{borderRadius:'60px'}}>
      <GridTable
        chainDetailsApi={ChainDetailsNew}
        taskDetailsApi={TaskDetails}
        chainDetailsbyTaskApi={ChainDetailsByTaskname}
      ></GridTable></Paper>
    </div>
  );
};
export default HomePage;
