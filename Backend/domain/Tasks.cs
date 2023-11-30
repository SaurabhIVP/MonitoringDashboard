using System.Collections.Generic;
namespace domain;

public class Tasks
{
    public string Chain_Name { get; set; }
    public string Task_Name { get; set; }
    public DateTime Start_Time { get; set; }
    public DateTime End_Time { get; set; }
    public DateTime Current_Time { get; set; }
    public string Chain_Time { get; set; }
    public string Task_Time { get; set; }
    public string BenchMark_Time { get; set; }
    public int chain_id { get; set; }
    public double PerformanceDeviation { get; set; }

}
