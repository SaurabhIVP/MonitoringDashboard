import React, { useEffect, useState } from "react";
import "../App.css";
import CollapsibleTable from "../components/table/CollapsibleTable";
import ChainDetails from "../api/ChainDetails";
import CurrentData from "../api/CurrentData";
import TaskDetails from "../api/TaskDetails";
import GridFilter from "../components/filters/GridFilter";
import ChainDetailsByTaskname from "../api/ChainDetailsByTaskname";
import { Paper } from "@mui/material";
import { StyledDatepickerContainer } from "../utils/StyledComponents";
import { PrimaryColor } from "../utils/Colors";
import ChainDetailsNew from "../api/ChainDetailsNew";

function Dashboard() {
  const [selectedChainValue, setSelectedChainValue] = useState<{
    id: number;
    [key: string]: any;
  } | null>(null);
  const [selectedTaskValue, setSelectedTaskValue] = useState<{
    [key: string]: any;
  } | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(2024, 0, 10)
  );
  const [deviationPercentage, setDeviationPercentage] = useState<string | null>(
    "0"
  );
  const handleDeviationChange = (value: string | null) => {
    setDeviationPercentage(value);
    console.log(deviationPercentage);
  };
  const [EndDate, setEndDate] = useState<Date | null>(new Date(2024, 0, 10));
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
  const [benchmarkCompute, setBenchmarkCompute] = useState("Average");
  const handleBenchmarkCompute = (value: string) => {
    setBenchmarkCompute(value);
    console.log(benchmarkCompute);
  };
  return (
    <>
      <div style={{ paddingTop: 60 }}>
        <Paper elevation={8} style={{ padding: 0, margin: 20 }}>
          <StyledDatepickerContainer
            style={{
              marginBottom: "0px",
              paddingBottom: "0px",
              paddingTop: "0px",
              marginRight: "100px",
            }}
          >
            <h2
              style={{
                paddingBottom: "0px",
                paddingLeft: "100px",
                color: PrimaryColor,
              }}
            >
              Task Performance Status
            </h2>
            <div
              style={{
                paddingBottom: "1%",
                paddingTop: "1%",

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
                onDeviationChange={handleDeviationChange}
                onBenchmarkComputeChange={handleBenchmarkCompute}
              ></GridFilter>
            </div>
          </StyledDatepickerContainer>

          <div style={{ paddingLeft: 50, paddingRight: 50 }}>
            {" "}
            <CollapsibleTable
              fetchDataFunction={() => {
                if (age == "20" && selectedChainValue?.key) {
                  return ChainDetailsByTaskname({
                    tasknames: selectedChainValue.key,
                    startDate: startDate,
                    endDate: EndDate,
                    benchStartDate: BenchstartDate,
                    benchEndDate: BenchendDate,
                    benchmarkCompute: benchmarkCompute,
                    deviationPercentage: deviationPercentage,
                  });
                } else {
                  return ChainDetailsNew({
                    chain_id: selectedChainValue?.id,
                    startDate: startDate,
                    endDate: EndDate,
                    benchStartDate: BenchstartDate,
                    benchEndDate: BenchendDate,
                    benchmarkCompute: benchmarkCompute,
                    deviationPercentage: deviationPercentage,
                  });
                }
              }}
              taskDetailsFunction={async (params) =>
                await TaskDetails({
                  chain_id: params.chain_id,
                  startTime: params.startTime,
                  endTime: params.endTime,
                  benchStartDate: BenchstartDate,
                  benchEndDate: BenchendDate,
                  benchmarkCompute: benchmarkCompute,
                  deviationPercentage: deviationPercentage,
                })
              }
            ></CollapsibleTable>
            {/* <CollapsibleTable
              fetchDataFunction={() => {
                if (age == "10" && selectedChainValue) {
                  return ChainDetails({
                    chain_id: selectedChainValue.id,
                    startDate: startDate,
                    endDate: EndDate,
                    benchStartDate: BenchstartDate,
                    benchEndDate: BenchendDate,
                    benchmarkCompute: benchmarkCompute,
                    deviationPercentage: deviationPercentage,
                  });
                } else if (age == "20" && selectedChainValue?.key) {
                  return ChainDetailsByTaskname({
                    tasknames: selectedChainValue.key,
                    startDate: startDate,
                    endDate: EndDate,
                    benchStartDate: BenchstartDate,
                    benchEndDate: BenchendDate,
                    benchmarkCompute: benchmarkCompute,
                    deviationPercentage: deviationPercentage,
                  });
                } else {
                  return CurrentData({
                    
                    startDate: startDate,
                    endDate: EndDate,
                    benchStartDate: BenchstartDate,
                    benchEndDate: BenchendDate,
                    benchmarkCompute: benchmarkCompute,
                    deviationPercentage: deviationPercentage,
                  });
                }
              }}
              taskDetailsFunction={async (params) =>
                await TaskDetails({
                  chain_id: params.chain_id,
                  startTime: params.startTime,
                  endTime: params.endTime,
                  benchStartDate: BenchstartDate,
                  benchEndDate: BenchendDate,
                  benchmarkCompute: benchmarkCompute,
                  deviationPercentage: deviationPercentage,
                })
              }
            ></CollapsibleTable> */}
          </div>
        </Paper>
      </div>
    </>
  );
}

export default Dashboard;
