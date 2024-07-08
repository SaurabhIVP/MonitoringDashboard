using System.Collections.Generic;
using System.Threading.Tasks;
using domain;
using infrastructure;
namespace application;
public class Service : IService
{
     private readonly IDBAccess _dbAccess;


    public Service(IDBAccess dbAccess)
    {
        _dbAccess = dbAccess;
       
    }

   
    
    public async Task<IEnumerable<Tasks>> GetAllChainDetailsAsync(bool? is_pm=false)
    {
        return await _dbAccess.GetAllChainDetailsAsync(is_pm);
    }
    public async Task<IEnumerable<Tasks>> GetCurrentDataAsync(DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute=null,string? deviationPercentage=null,bool? is_pm=false)
    {
        return await _dbAccess.GetCurrentDataAsync(startDate, endDate, benchStartDate, benchEndDate, benchmarkCompute, deviationPercentage,is_pm);
    }
    public async Task<IEnumerable<Tasks>> GetAllChainNamesAsync(bool? is_pm=false)
    {
        return await _dbAccess.GetAllChainNamesAsync(is_pm);
    }
    public async Task<IEnumerable<Tasks>> GetAllTaskNamesAsync(int chain_id,bool? is_pm=false)
    {
        return await _dbAccess.GetAllTaskNamesAsync(chain_id,is_pm);
    }
    public async Task<IEnumerable<Tasks>> GetChainByTaskAsync(string taskname,bool? is_pm=false){
        return await _dbAccess.GetChainByTaskAsync(taskname,is_pm);
    } 
    public async Task<IEnumerable<Tasks>> GetFlowIdByChainTaskNamesAsync(string taskname,string chainname,bool? is_pm=false){
        return await _dbAccess.GetFlowIdByChainTaskNamesAsync(taskname,chainname,is_pm);
    } 
    public async Task<IEnumerable<GanttData>> GetGanttDetailsAsync(string chains=null ,string? start_time="00:00:00.0000000",string? end_time="23:59:59.9999999",string? date="2024-01-17",string? benchStartDate = "2024-01-17", string? benchEndDate = "2024-01-24", string? benchmarkCompute="Average",string? deviationPercentage="0",bool? is_pm=false)
    {
        return await _dbAccess.GetGanttDetailsAsync(chains,start_time,end_time,date,benchStartDate,benchEndDate,benchmarkCompute,deviationPercentage,is_pm);
    }
    public async Task<IEnumerable<GanttData>> GetGanttDetails1Async(string chains=null ,string? start_time="00:00:00.0000000",string? end_time="23:59:59.9999999",string? date="2024-01-17",string? benchStartDate = "2024-01-17", string? benchEndDate = "2024-01-24", string? benchmarkCompute="Average",string? deviationPercentage="0",bool? is_pm=false)
    {
        return await _dbAccess.GetGanttDetails1Async(chains,start_time,end_time,date,benchStartDate,benchEndDate,benchmarkCompute,deviationPercentage,is_pm);
    }
    public async Task<IEnumerable<GanttData>> GetTaskDetailsByChainGuidAsync(int chain_id,string? date="2024-01-17",string? benchStartDate = "2024-01-17", string? benchEndDate = "2024-01-24", string? benchmarkCompute="Average",string? deviationPercentage="0",bool? is_pm=false)
    {
        return await _dbAccess.GetTaskDetailsByChainGuidAsync(chain_id,date,benchStartDate,benchEndDate,benchmarkCompute,deviationPercentage,is_pm);
    }
    public async Task<IEnumerable<Tasks>> GetChainTimeDetailsAsync(int chain_id, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute="Average",int? deviationPercentage=null,bool? is_pm=false){
        return await _dbAccess.GetChainTimeDetailsAsync(chain_id,startDate,endDate, benchStartDate, benchEndDate,benchmarkCompute, deviationPercentage,is_pm);
    }
    public async Task<IEnumerable<Tasks>> GetChainDetailsAsync(int chain_id, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute=null,string? deviationPercentage=null,bool? is_pm=false){
        return await _dbAccess.GetChainDetailsAsync(chain_id,startDate,endDate, benchStartDate, benchEndDate,benchmarkCompute,deviationPercentage,is_pm);
    }
    public async Task<IEnumerable<Tasks>> GetChainDetailsNewAsync(int chain_id=0, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute=null,string? deviationPercentage=null,bool? is_pm=false){
        return await _dbAccess.GetChainDetailsNewAsync(chain_id,startDate,endDate, benchStartDate, benchEndDate,benchmarkCompute,deviationPercentage,is_pm);
    }
    public async Task<IEnumerable<Tasks>> GetChainDetailsByTasknamesAsync(string tasknames, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute=null,string? deviationPercentage=null,bool? is_pm=false){
        return await _dbAccess.GetChainDetailsByTasknamesAsync(tasknames,startDate,endDate, benchStartDate, benchEndDate, benchmarkCompute,deviationPercentage,is_pm);
    }
    public async Task<IEnumerable<Tasks>> GetTaskTimeDetailsAsync(int flow_id, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute=null,string? deviationPercentage=null,bool? is_pm=false){
        return await _dbAccess.GetTaskTimeDetailsAsync(flow_id,startDate,endDate, benchStartDate, benchEndDate,benchmarkCompute,deviationPercentage,is_pm);
     }
     public async Task<IEnumerable<ChainDetails>> getChainDetails(int chainID,int taskID,string benchmarkCompute,string startDate,string endDate, string benchmarkStartDate, string benchmarkEndDate,bool? is_pm=false)
    {
        return await _dbAccess.getChainDetails(chainID,taskID,benchmarkCompute,startDate,endDate,benchmarkStartDate,benchmarkEndDate,is_pm);
    }
    
    public async Task<IEnumerable<Tasks>> GetTaskDetailsAsync(int chain_id,DateTime? startTime = null,DateTime? endTime=null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute=null,string? deviationPercentage=null,bool? is_pm=false){
        return await _dbAccess.GetTaskDetailsAsync(chain_id,startTime,endTime,benchStartDate,benchEndDate,benchmarkCompute,deviationPercentage,is_pm);
     }
     public async Task<IEnumerable<Tasks>> GetTaskDetailsNewAsync(DateTime? startTime = null,DateTime? endTime=null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute=null,string? deviationPercentage=null,bool? is_pm=false){
        return await _dbAccess.GetTaskDetailsNewAsync(startTime,endTime,benchStartDate,benchEndDate,benchmarkCompute,deviationPercentage,is_pm);
     }
}
