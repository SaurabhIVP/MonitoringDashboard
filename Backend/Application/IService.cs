using System.Collections.Generic;
using System.Threading.Tasks;
using domain;
namespace Application;

public interface IService
{
    Task<IEnumerable<Tasks>> GetAllChainDetailsAsync();   
    Task<IEnumerable<Tasks>> GetAllChainNamesAsync();

    Task<IEnumerable<Tasks>> GetAllTaskNamesAsync(int chain_id);   
     Task<IEnumerable<Tasks>> GetGanttDetailsAsync(string chains=null ,DateTime? start_time=null,DateTime? end_time=null);   

    Task<IEnumerable<ChainDetails>> getChainDetails(int chainID,int taskID,string benchmarkCompute,string startDate,string endDate, string benchmarkStartDate, string benchmarkEndDate);

}
