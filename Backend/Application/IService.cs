using System.Collections.Generic;
using System.Threading.Tasks;
using domain;
namespace Application;

public interface IService
{
    Task<IEnumerable<Tasks>> GetAllChainDetailsAsync();   
    Task<IEnumerable<Tasks>> GetAllChainNamesAsync();
    Task<IEnumerable<Tasks>> GetAllTaskNamesAsync(string chainname);   
     Task<IEnumerable<Tasks>> GetGanttDetailsAsync(DateTime start_time,DateTime end_time);   
   
}
