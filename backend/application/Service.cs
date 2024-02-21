using System.Collections.Generic;
using System.Threading.Tasks;
using domain;
using infrastructure;
namespace Application;
public class Service : IService
{
      private readonly IDBAccess _dbAccess;

    public Service(IDBAccess dbAccess)
    {
        _dbAccess = dbAccess;
    }

    public async Task<IEnumerable<Tasks>> GetAllChainDetailsAsync()
    {
        return await _dbAccess.GetAllChainDetailsAsync();
    }
    public async Task<IEnumerable<Tasks>> GetAllChainDetailsAsync1(DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute=null,string? deviationPercentage=null)
    {
        return await _dbAccess.GetAllChainDetailsAsync1(startDate, endDate, benchStartDate, benchEndDate, benchmarkCompute, deviationPercentage);
    }
    public async Task<IEnumerable<Tasks>> GetAllChainNamesAsync()
    {
        return await _dbAccess.GetAllChainNamesAsync();
    }
    public async Task<IEnumerable<Tasks>> GetAllTaskNamesAsync(int chain_id)
    {
        return await _dbAccess.GetAllTaskNamesAsync(chain_id);
    }
    public async Task<IEnumerable<Tasks>> GetChainByTaskAsync(string taskname){
        return await _dbAccess.GetChainByTaskAsync(taskname);
    } 
    public async Task<IEnumerable<Tasks>> GetFlowIdByChainTaskNamesAsync(string taskname,string chainname){
        return await _dbAccess.GetFlowIdByChainTaskNamesAsync(taskname,chainname);
    } 
    public async Task<IEnumerable<GanttData>> GetGanttDetailsAsync(string chains=null ,string? start_time="00:00:00.0000000",string? end_time="23:59:59.9999999",string? date="2024-01-17",string? benchStartDate = "2024-01-17", string? benchEndDate = "2024-01-24")
    {
        return await _dbAccess.GetGanttDetailsAsync(chains,start_time,end_time,date,benchStartDate,benchEndDate);
    }
    public async Task<IEnumerable<Tasks>> GetChainTimeDetailsAsync(int chain_id, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null){
        return await _dbAccess.GetChainTimeDetailsAsync(chain_id,startDate,endDate, benchStartDate, benchEndDate);
    }
    public async Task<IEnumerable<Tasks>> GetChainDetailsAsync(int chain_id, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute=null,string? deviationPercentage=null){
        return await _dbAccess.GetChainDetailsAsync(chain_id,startDate,endDate, benchStartDate, benchEndDate,benchmarkCompute,deviationPercentage);
    }
    public async Task<IEnumerable<Tasks>> GetChainDetailsNewAsync(int chain_id=0, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute=null,string? deviationPercentage=null){
        return await _dbAccess.GetChainDetailsNewAsync(chain_id,startDate,endDate, benchStartDate, benchEndDate,benchmarkCompute,deviationPercentage);
    }
    public async Task<IEnumerable<Tasks>> GetChainDetailsByTasknamesAsync(string tasknames, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute=null,string? deviationPercentage=null){
        return await _dbAccess.GetChainDetailsByTasknamesAsync(tasknames,startDate,endDate, benchStartDate, benchEndDate, benchmarkCompute,deviationPercentage);
    }
    public async Task<IEnumerable<Tasks>> GetTaskTimeDetailsAsync(int flow_id, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null){
        return await _dbAccess.GetTaskTimeDetailsAsync(flow_id,startDate,endDate, benchStartDate, benchEndDate);
     }
     public async Task<IEnumerable<ChainDetails>> getChainDetails(int chainID,int taskID,string benchmarkCompute,string startDate,string endDate, string benchmarkStartDate, string benchmarkEndDate)
    {
        return await _dbAccess.getChainDetails(chainID,taskID,benchmarkCompute,startDate,endDate,benchmarkStartDate,benchmarkEndDate);
    }
    
    public async Task<IEnumerable<Tasks>> GetTaskDetailsAsync(int chain_id,DateTime? startTime = null,DateTime? endTime=null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute=null,string? deviationPercentage=null){
        return await _dbAccess.GetTaskDetailsAsync(chain_id,startTime,endTime,benchStartDate,benchEndDate,benchmarkCompute,deviationPercentage);
     }
}
