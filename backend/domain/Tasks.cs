using System.Collections.Generic;
namespace domain;

public class Tasks
{
    public string chain_name { get; set; }
    public string task_name { get; set; }
    public string start_time { get; set; }
    public string end_time { get; set; }
    public DateTime Current_Time { get; set; }
    public string Chain_Time { get; set; }
    public string status { get; set; }
    public string name { get; set; }
    public int delay { get; set; }
    public DateTime expected_endtime { get; set; }
    public DateTime benchmarktime { get; set; }
    public int chain_id { get; set; }
     public int id { get; set; }
    public int flow_id { get; set; }
    public double performance { get; set; }
    public DateTime date { get; set; }
    public string chain_guid { get; set; }
    public string total_times { get; set; }
    public string avg_total_time { get; set; }
    public string deviation_in_time { get; set; }


}
