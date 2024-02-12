using System.Collections.Generic;
using System.Threading.Tasks;
using domain;
namespace Application;

public interface IService
{
    Task<IEnumerable<Tasks>> GetAllChainDetailsAsync();   
    Task<IEnumerable<Tasks>> GetAllChainDetailsAsync1();
    Task<IEnumerable<Tasks>> GetAllChainNamesAsync();
    Task<IEnumerable<Tasks>> GetAllTaskNamesAsync(int chain_id);   
    Task<IEnumerable<Tasks>> GetChainByTaskAsync(string taskname); 
    Task<IEnumerable<Tasks>> GetFlowIdByChainTaskNamesAsync(string taskname,string chainname);
     Task<IEnumerable<Tasks>> GetGanttDetailsAsync(string chains=null ,string? start_time=null,string? end_time=null,DateTime? date=null);   
     Task<IEnumerable<Tasks>> GetChainTimeDetailsAsync(int chain_id, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null); 
     Task<IEnumerable<Tasks>> GetChainDetailsAsync(int chain_id, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null);
     Task<IEnumerable<Tasks>> GetChainDetailsByTasknamesAsync(string tasknames, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null);  
     Task<IEnumerable<Tasks>> GetTaskTimeDetailsAsync(int flow_id, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null);
     Task<IEnumerable<Tasks>> GetTaskDetailsAsync(int chain_id, DateTime? startTime = null,DateTime? endTime = null);
    Task<IEnumerable<ChainDetails>> getChainDetails(int chainID,int taskID,string benchmarkCompute,string startDate,string endDate, string benchmarkStartDate, string benchmarkEndDate);

}
