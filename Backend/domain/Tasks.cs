using System.Collections.Generic;
namespace domain;

public class Tasks
{
    public string chain_name { get; set; }
    public string task_name { get; set; }
    public DateTime start_time { get; set; }
    public DateTime end_time { get; set; }
    public DateTime Current_Time { get; set; }
    public string Chain_Time { get; set; }
    public string Task_Time { get; set; }
    public DateTime benchmark_time { get; set; }
    public int chain_id { get; set; }
    public int flow_id { get; set; }
    public double PerformanceDeviation { get; set; }

}
