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
    public async Task<IEnumerable<Tasks>> GetAllTaskNamesAsync(string chainname)
    {
        return await _dbAccess.GetAllTaskNamesAsync(chainname);
    }
    public async Task<IEnumerable<Tasks>> GetGanttDetailsAsync(DateTime start_time,DateTime end_time)
    {
        return await _dbAccess.GetGanttDetailsAsync(start_time,end_time);
    }
    
}
