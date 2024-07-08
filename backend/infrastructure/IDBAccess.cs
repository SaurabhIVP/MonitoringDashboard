using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using domain;

namespace infrastructure;
public interface IDBAccess
{
   
    Task<IEnumerable<Tasks>> GetAllChainDetailsAsync(bool? is_pm=false);   
    Task<IEnumerable<Tasks>> GetTaskDetailsNewAsync(DateTime? startTime = null,DateTime? endTime=null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute=null,string? deviationPercentage=null,bool? is_pm=false);
    Task<IEnumerable<Tasks>> GetCurrentDataAsync(DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute=null,string? deviationPercentage=null,bool? is_pm=false);
    Task<IEnumerable<Tasks>> GetAllChainNamesAsync(bool? is_pm=false);
    Task<IEnumerable<Tasks>> GetAllTaskNamesAsync(int chain_id,bool? is_pm=false);   
    Task<IEnumerable<Tasks>> GetChainByTaskAsync(string taskname,bool? is_pm=false); 
    Task<IEnumerable<Tasks>> GetFlowIdByChainTaskNamesAsync(string taskname,string chainname,bool? is_pm=false);
     Task<IEnumerable<GanttData>> GetGanttDetailsAsync(string chains=null ,string? start_time="00:00:00.0000000",string? end_time="23:59:59.9999999",string? date="2024-01-17",string? benchStartDate = "2024-01-17", string? benchEndDate = "2024-01-24", string? benchmarkCompute="Average",string? deviationPercentage="0",bool? is_pm=false);  
     Task<IEnumerable<GanttData>> GetGanttDetails1Async(string chains=null ,string? start_time="00:00:00.0000000",string? end_time="23:59:59.9999999",string? date="2024-01-17",string? benchStartDate = "2024-01-17", string? benchEndDate = "2024-01-24", string? benchmarkCompute="Average",string? deviationPercentage="0",bool? is_pm=false);
     Task<IEnumerable<GanttData>> GetTaskDetailsByChainGuidAsync(int chain_id,string? date="2024-01-17",string? benchStartDate = "2024-01-17", string? benchEndDate = "2024-01-24", string? benchmarkCompute="Average",string? deviationPercentage="0",bool? is_pm=false);   
     Task<IEnumerable<Tasks>> GetChainTimeDetailsAsync(int chain_id, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute="Average",int? deviationPercentage=null,bool? is_pm=false); 
    Task<IEnumerable<Tasks>> GetChainDetailsAsync(int chain_id, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute=null,string? deviationPercentage=null,bool? is_pm=false);
     Task<IEnumerable<Tasks>> GetChainDetailsByTasknamesAsync(string tasknames, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute=null,string? deviationPercentage=null,bool? is_pm=false);  
     Task<IEnumerable<Tasks>> GetTaskTimeDetailsAsync(int flow_id, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute=null,string? deviationPercentage=null,bool? is_pm=false);
     Task<IEnumerable<Tasks>> GetChainDetailsNewAsync(int chain_id=0, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute=null,string? deviationPercentage=null,bool? is_pm=false);
     Task<IEnumerable<Tasks>> GetTaskDetailsAsync(int chain_id,DateTime? startTime = null,DateTime? endTime=null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute=null,string? deviationPercentage=null,bool? is_pm=false);
    Task<IEnumerable<ChainDetails>> getChainDetails(int chainID,int taskID,string benchmarkCompute,string startDate,string endDate, string benchmarkStartDate, string benchmarkEndDate,bool? is_pm=false);
}
