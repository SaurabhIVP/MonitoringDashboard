import React, { useEffect, useState } from "react";
import "../App.css";
import CollapsibleTable from "../components/table/CollapsibleTable";
import ChainDetails from "../api/ChainDetails";
import CurrentData from "../api/CurrentData";
import TaskDetails from "../api/TaskDetails";
import GridFilter from "../components/filters/GridFilter";
import ChainDetailsByTaskname from "../api/ChainDetailsByTaskname";


function Dashboard() {
  const [selectedChainValue, setSelectedChainValue] = useState<{
    id: number;
    [key: string]: any;
  } | null>(null);
  const [selectedTaskValue, setSelectedTaskValue] = useState<{
    [key: string]: any;
  } | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(2024, 0, 20)
  );
  const [EndDate, setEndDate] = useState<Date | null>(new Date(2024, 0, 27));
  const [BenchstartDate, setBenchStartDate] = useState<Date | null>(
    new Date(2024, 0, 20)
  );
  const [BenchendDate, setBenchEndDate] = useState<Date | null>(
    new Date(2024, 0, 27)
  );
  const [age, setAge] = React.useState("10");
  const handleStartDateChange = (newDate: Date | null) => {
    setStartDate(newDate);
  };
  const handleAgeChange = (flag: any | null) => {
    setAge(flag);
  };
  const handleEndDateChange = (newDate: Date | null) => {
    setEndDate(newDate);
  };
  const handleBenchStartDateChange = (newDate: Date | null) => {
    setBenchStartDate(newDate);
  };
  const handleBenchendDateChange = (newDate: Date | null) => {
    setBenchEndDate(newDate);
  };

  const handleChainSelected = (
    chainData: { id: number | null; key: string } | any
  ) => {
    setSelectedChainValue(chainData);
    console.log(selectedChainValue?.key);
  };
  return (
    <>
      <div
        style={{
          paddingBottom: "2%",
          paddingTop: "4%",
          right: 0,
          // display: "flex",
          // justifyContent: "flex-end",
        }}
      >
        <GridFilter
          onChainSelected={handleChainSelected}
          onStartDateSelected={handleStartDateChange}
          onEndDateSelected={handleEndDateChange}
          onBenchStartDateSelected={handleBenchStartDateChange}
          onBenchEndDateSelected={handleBenchendDateChange}
          onCheck={handleAgeChange}
        ></GridFilter>
      </div>

      <div style={{ paddingLeft: 50, paddingRight: 50 }}>
        {" "}
        <CollapsibleTable
          fetchDataFunction={() => {
            if (age == "10" && selectedChainValue) {
              return ChainDetails({
                chain_id: selectedChainValue.id,
                startDate: startDate,
                endDate: EndDate,
                benchStartDate: BenchstartDate,
                benchEndDate: BenchendDate,
              });
            } else if (age == "20" && selectedChainValue?.key) {
              return ChainDetailsByTaskname({
                tasknames: selectedChainValue.key,
                startDate: startDate,
                endDate: EndDate,
                benchStartDate: BenchstartDate,
                benchEndDate: BenchendDate,
              });
            } else {
              return CurrentData();
            }
          }}
          taskDetailsFunction={async (params) =>
            await TaskDetails({
              chain_id: params.chain_id,
              startTime: params.startTime,
              endTime: params.endTime,
            })
          }
        ></CollapsibleTable>
      </div>
    </>
  );
}

export default Dashboard;
