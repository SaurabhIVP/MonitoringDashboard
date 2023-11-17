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
}
