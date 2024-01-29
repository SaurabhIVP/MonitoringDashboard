import React from "react";
import ChainChart from "../components/ChainChart";
import ChartChain from "../api/ChartChain";

const Charts: React.FC = () => {
  return (
    <>
      <div style={{ paddingTop: 100 ,maxHeight:1000,}}>
        <h3>Chain Name</h3>
        <div style={{borderStyle:'solid'}}>
        <ChainChart
          fetchDataFunction={() => ChartChain({ chain_id: 2909,startDate:new Date(2023,10,17),
        endDate:new Date(2023,10,23),benchStartDate:new Date(2023,10,17),benchEndDate:new Date(2023,10,23) })}
        ></ChainChart>
        </div>
        
      </div>
    </>
  );
};

export default Charts;
