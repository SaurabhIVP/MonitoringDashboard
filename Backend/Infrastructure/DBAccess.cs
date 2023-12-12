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
        return await _dbConnection.QueryAsync<Tasks>("GetAllChainDetails", commandType: CommandType.StoredProcedure);
    }
    public async Task<IEnumerable<Tasks>> GetAllChainNamesAsync()
    {
        var parameters = new DynamicParameters();  
        return await _dbConnection.QueryAsync<Tasks>("GetDistinctChainNames", parameters, commandType: CommandType.StoredProcedure);
    }
    public async Task<IEnumerable<Tasks>> GetAllTaskNamesAsync(string chainname)
    {
        var parameters = new { Chainname = chainname };
        return await _dbConnection.QueryAsync<Tasks>("GetTaskNamesByChain", parameters, commandType: CommandType.StoredProcedure);
    }
    public async Task<IEnumerable<Tasks>> GetGanttDetailsAsync(DateTime start_time,DateTime end_time)
    {
        var parameters = new {starttime = start_time, endtime = end_time};
        return await _dbConnection.QueryAsync<Tasks>("GetGanttDetails", parameters, commandType: CommandType.StoredProcedure);
    }

    public async Task<IEnumerable<ChainDetails>> getChainDetails(int chainID,int taskID,string benchmarkCompute,string startDate,string endDate, string benchmarkStartDate, string benchmarkEndDate)
    {
        var parameters = new {
            chainID = chainID,
            taskID = taskID,
            benchmarkCompute = benchmarkCompute,
            startDate = startDate,
            endDate = endDate,
            benchmarkStartDate = benchmarkStartDate,
            benchmarkEndDate = benchmarkEndDate
        };
        return await _dbConnection.QueryAsync<ChainDetails>("SP_GetAllChainDetails",parameters,commandType:CommandType.StoredProcedure);
    }

}