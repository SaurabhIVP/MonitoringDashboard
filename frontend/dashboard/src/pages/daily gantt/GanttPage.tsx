import { Paper } from "@mui/material";
import GanttChartHandle from "../../components/gantt/GanttChartHandle";
import "./GanttPage.css";
function GanttPage() {
  return (
    <>
      <div style={{paddingTop:'50px'}}>
        <Paper elevation={8} className="paperClass">
          <div className="chartHandler">
            <GanttChartHandle></GanttChartHandle>
          </div>
        </Paper>
      </div>
    </>
  );
}

export default GanttPage;
