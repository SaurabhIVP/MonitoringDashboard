import axios from "axios";
import { useEffect, useState } from "react";
import Table, { columnProps } from "../components/Table";
import { format } from "date-fns-tz";
import { Button } from "@mui/material";
import ChainDetails from "../api/ChainDetails";

interface chainDetailsProps {
  chainID: {
    id: number;
    [key: string]: any;
  } | null;
  startDate: any | null;
  endDate: any | null;
  benchmarkStartDate: any | null;
  benchmarkEndDate: any | null;
  //showTableComponent: boolean;
}
const API_URL = process.env.REACT_APP_API_BASE_URL;
interface ChainDetails {
  chain_id: number;
  chain_name: string;
  start_time: string;
  end_time: string;
  total_times: string;
  avg_total_time: string;
  performance: string;
  status: string;
  action: string;
}

export function GetChainDetails1({
  chainID,
  startDate,
  endDate,
  benchmarkStartDate,
  benchmarkEndDate,
}: chainDetailsProps) {
  {
    const columnList: columnProps<ChainDetails, keyof ChainDetails>[] = [
      {
        key: "chain_id",
        header: "Chain ID",
        action: false,
      },
      {
        key: "chain_name",
        header: "Chain Name",
        action: false,
      },
      {
        key: "start_time",
        header: "Chain Start Time",
        action: false,
      },
      {
        key: "end_time",
        header: "Chain End Time",
        action: false,
      },
      {
        key: "total_times",
        header: "Chain Total Time",
        action: false,
      },
      {
        key: "avg_total_time",
        header: "Benchmark Time",
        action: false,
      },
      {
        key: "performance",
        header: "Deviation Time",
        action: false,
      },
      {
        key: "status",
        header: "Status",
        action: true,
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
      console.log("chainID", chainID?.id);
      console.log("strStartDate", strStartDate);
      console.log("strEndDate", strEndDate);
      console.log("strBenchmarkStartDate", strBenchmarkStartDate);
      console.log("strBenchmarkEndDate", strBenchmarkEndDate);

      let chain_ID: number = 0;
      let task_ID: number = 0;
      if (!chainID) {
        chain_ID = 0;
      } else {
        chain_ID = chainID.id;
      }

      const params = {
        startDate: strStartDate,
        endDate: strEndDate,
        benchStartDate: strBenchmarkStartDate,
        benchEndDate: strBenchmarkEndDate,
      };
      console.log(task_ID);
      const url = `${API_URL}/chart/g/${chain_ID}`;
      axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          const data = res.data;
          setChainList(data);
          setShowTableComponent(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [showTableComponent]);
    //     axios
    //     .get(`https://localhost:7022/api/Data/getAllChainDetails/${chain_ID}/${task_ID}/${benchmarkCompute}/${strStartDate}/${strEndDate}/${strBenchmarkStartDate}/${strBenchmarkEndDate}`
    //     )
    //     .then(
    //         res=>
    //         {
    //             console.log(res.data);
    //             const data = res.data;
    //             setChainList(data);
    //             setShowTableComponent(false);
    //         }
    //     )
    //     .catch(err=>{
    //         console.log(err);
    //     });

    // },[showTableComponent]);

    return (
      <div>
        <Button
          variant="contained"
          onClick={handleButtonClick}
          size="medium"
          style={{
            borderRadius: "10px",
            marginBottom: "2%",
            backgroundColor: "#005A44",
          }}
        >
          Submit
        </Button>
        <Table data={chainList} columns={columnList}></Table>
      </div>
    );
  }
}
