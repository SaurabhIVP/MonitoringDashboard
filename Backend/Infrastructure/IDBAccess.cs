using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using domain;

namespace infrastructure;
public interface IDBAccess
{
    Task<IEnumerable<Tasks>> GetAllChainDetailsAsync();   
    Task<IEnumerable<Tasks>> GetAllChainNamesAsync();
    Task<IEnumerable<Tasks>> GetAllTaskNamesAsync(int chain_id);
     Task<IEnumerable<Tasks>> GetGanttDetailsAsync(string chains=null ,DateTime? start_time=null,DateTime? end_time=null);   
    
}
