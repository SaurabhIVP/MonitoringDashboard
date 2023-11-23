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
    public async Task<IEnumerable<Tasks>> GetAllChainNamesAsync()
    {
        return await _dbConnection.QueryAsync<Tasks>("select distinct Chain_Name from newdata1");
    }
    public async Task<IEnumerable<Tasks>> GetAllTaskNamesAsync(string chainname)
    {
        string query = $"select distinct Task_Name from newdata1 where Chain_Name = @ChainName";
        return await _dbConnection.QueryAsync<Tasks>(query, new { ChainName = chainname });
    }

}