import { GridColDef } from "@mui/x-data-grid";

// consider below array as [chain_label,is_deviation,is_collapsable,alignment,isDateTime]
export const chainLabels = [
  ["chain_name",false,true,"left",false],
  ["start_time",false,false,"center",true],
  ["end_time",false,false,"center",true],
  ["status",false,false,"center",false],
  ["total_times",false,false,"center",false],
  ["avg_total_time",false,false,"center",false],
  ["deviation_in_time",false,false,"center",false],
  ["performance",true,false,"center",false],
] as any;

export const chainHeaders = [
  "Chain Name",
  "Start Time",
  "End Time",
  "Status",
  "Total Time",
  "Benchmark Time","Deviation Time",
  "Deviation",
] ;

export const TaskLabels = [
  ["task_name",false,true,"left",false],
  ["start_time",false,false,"center",true],
  ["end_time",false,false,"center",true],
  ["status",false,false,"center",false],
  ["total_times",false,false,"center",false],
  ["avg_total_time",false,false,"center",false],
  ["deviation_in_time",false,false,"center",false],
  ["performance",true,false,"center",false],
] as any;
export const TaskHeaders = [
  "Task Name",
  "Start Time",
  "End Time",
  "Status",
  "Total Time",
  "Benchmark Time",
  "Deviation Time",
  "Deviation",
];
