import axios from "axios";
import { useEffect, useState } from "react";
import Table, { columnProps } from "../components/Table";
import { format } from "date-fns-tz";
import { Button } from "@mui/material";
import { apiService } from "./ApiService";
interface chainDetailsProps {
  chainID: number;
  taskID: number;
  benchmarkCompute: string;
  startDate: any | null;
  endDate: any | null;
  benchmarkStartDate: any | null;
  benchmarkEndDate: any | null;
  //showTableComponent: boolean;
}
const API_URL = process.env.REACT_APP_API_BASE_URL;
interface ChainDetails {
  chainID: number;
  chainName: string;
  chainStartTime: string;
  chainEndTime: string;
  currentTime: string;
  chainTotalTime: string;
  benchmarkTime: string;
  deviationTime: string;
}

export function GetChainDetails({
  chainID,
  taskID,
  benchmarkCompute,
  startDate,
  endDate,
  benchmarkStartDate,
  benchmarkEndDate,
}: chainDetailsProps) {
  const columnList: columnProps<ChainDetails, keyof ChainDetails>[] = [
    {
      key: "chainID",
      header: "Chain ID",
    },
    {
      key: "chainName",
      header: "Chain Name",
    },
    {
      key: "chainStartTime",
      header: "Chain Start Time",
    },
    {
      key: "chainEndTime",
      header: "Chain End Time",
    },
    {
      key: "currentTime",
      header: "Current Time",
    },
    {
      key: "chainTotalTime",
      header: "Chain Total Time",
    },
    {
      key: "benchmarkTime",
      header: "Benchmark Time",
    },
    {
      key: "deviationTime",
      header: "Deviation Time",
    },
  ];

  const [chainList, setChainList] = useState<ChainDetails[]>([]);

  const strStartDate = format(startDate, "yyyyMMdd");
  const strEndDate = format(endDate, "yyyyMMdd");
  const strBenchmarkStartDate = format(benchmarkStartDate, "yyyyMMdd");
  const strBenchmarkEndDate = format(benchmarkEndDate, "yyyyMMdd");

  const [showTableComponent, setShowTableComponent] = useState(false);

  const handleButtonClick = () => {
    setShowTableComponent(true);
  };

  useEffect(() => {
    apiService
      .get(
        `/getAllChainDetails/${chainID}/${taskID}/${benchmarkCompute}/${strStartDate}/${strEndDate}/${strBenchmarkStartDate}/${strBenchmarkEndDate}`
      )
      .then((res: any) => {
        const data = res.data;
        setChainList(res);
        setShowTableComponent(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [showTableComponent]);

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleButtonClick}
        size="medium"
        style={{ borderRadius: "100px" }}
      >
        Submit
      </Button>
      <Table data={chainList} columns={columnList}></Table>
    </div>
  );
}

//export default GetChainDetails;
