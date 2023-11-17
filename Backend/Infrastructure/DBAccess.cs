using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using domain;

namespace infrastructure;
public class DBAccess : IDBAccess
{
    private readonly IDbConnection _dbConnection;

    public DBAccess(IDbConnection dbConnection)
    {
        _dbConnection = dbConnection;
    }

    public async Task<IEnumerable<Tasks>> GetAllChainDetailsAsync()
    {
        return await _dbConnection.QueryAsync<Tasks>("SELECT * FROM newdata1");
    }
}