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
        return await _dbConnection.QueryAsync<Tasks>("SP_GetGanttDetails", commandType: CommandType.StoredProcedure);
    }
    public async Task<IEnumerable<Tasks>> GetAllChainNamesAsync()
    {
        var parameters = new DynamicParameters();
        return await _dbConnection.QueryAsync<Tasks>("SP_GetDistinctChainNames", parameters, commandType: CommandType.StoredProcedure);
    }
    public async Task<IEnumerable<Tasks>> GetAllTaskNamesAsync(int chain_id)
    {
        var parameters = new { ChainId = chain_id };
        return await _dbConnection.QueryAsync<Tasks>("SP_GetTaskNamesByChain", parameters, commandType: CommandType.StoredProcedure);
    }
    public async Task<IEnumerable<Tasks>> GetGanttDetailsAsync(string chains = null, DateTime? start_time = null, DateTime? end_time = null)
    {
        var parameters = new { chains = chains, starttime = start_time, endtime = end_time };
        return await _dbConnection.QueryAsync<Tasks>("SP_GetGanttDetails", parameters, commandType: CommandType.StoredProcedure);
    }
    public async Task<IEnumerable<Tasks>> GetChainTimeDetailsAsync(int chain_id, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null)
    {
        var parameters = new
        {
            chainId = chain_id,
            startDate = startDate,
            endDate = endDate,
            benchStartDate = benchStartDate,
            benchEndDate = benchEndDate
        };

        return await _dbConnection.QueryAsync<Tasks>("SP_GetChainTimeDetails", parameters, commandType: CommandType.StoredProcedure);
    }
    public async Task<IEnumerable<Tasks>> GetTaskTimeDetailsAsync(int flow_id, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null)
    {
        var parameters = new
        {
            flowId = flow_id,
            startDate = startDate,
            endDate = endDate,
            benchStartDate = benchStartDate,
            benchEndDate = benchEndDate
        };

        return await _dbConnection.QueryAsync<Tasks>("SP_GetTaskTimeDetails", parameters, commandType: CommandType.StoredProcedure);
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