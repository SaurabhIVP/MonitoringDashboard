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
    public async Task<IEnumerable<Tasks>> GetAllChainDetailsAsync1()
    {
        return await _dbAccess.GetAllChainDetailsAsync1();
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
    public async Task<IEnumerable<Tasks>> GetGanttDetailsAsync(string chains=null ,string? start_time=null,string? end_time=null,DateTime? date=null)
    {
        return await _dbAccess.GetGanttDetailsAsync(chains,start_time,end_time,date);
    }
    public async Task<IEnumerable<Tasks>> GetChainTimeDetailsAsync(int chain_id, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null){
        return await _dbAccess.GetChainTimeDetailsAsync(chain_id,startDate,endDate, benchStartDate, benchEndDate);
    }
    public async Task<IEnumerable<Tasks>> GetChainDetailsAsync(int chain_id, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null){
        return await _dbAccess.GetChainDetailsAsync(chain_id,startDate,endDate, benchStartDate, benchEndDate);
    }
    public async Task<IEnumerable<Tasks>> GetChainDetailsByTasknamesAsync(string tasknames, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null){
        return await _dbAccess.GetChainDetailsByTasknamesAsync(tasknames,startDate,endDate, benchStartDate, benchEndDate);
    }
    public async Task<IEnumerable<Tasks>> GetTaskTimeDetailsAsync(int flow_id, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null){
        return await _dbAccess.GetTaskTimeDetailsAsync(flow_id,startDate,endDate, benchStartDate, benchEndDate);
     }
     public async Task<IEnumerable<ChainDetails>> getChainDetails(int chainID,int taskID,string benchmarkCompute,string startDate,string endDate, string benchmarkStartDate, string benchmarkEndDate)
    {
        return await _dbAccess.getChainDetails(chainID,taskID,benchmarkCompute,startDate,endDate,benchmarkStartDate,benchmarkEndDate);
    }
    
    public async Task<IEnumerable<Tasks>> GetTaskDetailsAsync(int chain_id, DateTime? startTime = null,DateTime? endTime = null){
        return await _dbAccess.GetTaskDetailsAsync(chain_id,startTime,endTime);
     }
}
