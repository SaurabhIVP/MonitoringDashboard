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
    public async Task<IEnumerable<Tasks>> GetAllChainNamesAsync()
    {
        return await _dbAccess.GetAllChainNamesAsync();
    }
    public async Task<IEnumerable<Tasks>> GetAllTaskNamesAsync(int chain_id)
    {
        return await _dbAccess.GetAllTaskNamesAsync(chain_id);
    }
    public async Task<IEnumerable<Tasks>> GetGanttDetailsAsync(string chains=null ,DateTime? start_time=null,DateTime? end_time=null)
    {
        return await _dbAccess.GetGanttDetailsAsync(chains,start_time,end_time);
    }
    
}
