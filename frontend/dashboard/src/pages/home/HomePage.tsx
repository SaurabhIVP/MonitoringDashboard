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
    <div style={{ paddingTop: "40px", paddingBottom: "0px" }}>
     {/* <ExpandableTable></ExpandableTable> */}
      <GridTable
        chainDetailsApi={ChainDetailsNew}
        taskDetailsApi={TaskDetails}
        chainDetailsbyTaskApi={ChainDetailsByTaskname}
      ></GridTable>
    </div>
  );
};
export default HomePage;
