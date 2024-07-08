import { Paper } from "@mui/material";
import GanttChartHandle from "../../components/gantt/GanttChartHandle";
import "./GanttPage.css";
function GanttPage() {
  return (
    <>
      <div style={{paddingTop:'60px'}}>
          <div className="chartHandler">
            <GanttChartHandle></GanttChartHandle>
          </div>
      </div>
    </>
  );
}

export default GanttPage;
