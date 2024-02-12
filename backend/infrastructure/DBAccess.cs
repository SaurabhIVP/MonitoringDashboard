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
    public async Task<IEnumerable<Tasks>> GetAllChainDetailsAsync1()
    {
        return await _dbConnection.QueryAsync<Tasks>("SP_GetAllChainDetails1", commandType: CommandType.StoredProcedure);
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
    public async Task<IEnumerable<Tasks>> GetChainByTaskAsync(string taskname)
    {
        var parameters=new {taskname=taskname};
        return await _dbConnection.QueryAsync<Tasks>("SP_GetChainByTask",parameters, commandType: CommandType.StoredProcedure);
    }
    public async Task<IEnumerable<Tasks>> GetFlowIdByChainTaskNamesAsync(string taskname,string chainname)
    {
        var parameters=new {taskname=taskname,chainname=chainname};
        return await _dbConnection.QueryAsync<Tasks>("SP_GetFlowIdByChainTaskNames",parameters, commandType: CommandType.StoredProcedure);
    }
    public async Task<IEnumerable<Tasks>> GetGanttDetailsAsync(string chains=null ,string? start_time=null,string? end_time=null,DateTime? date=null)
    {
        var parameters = new { chains = chains, starttime = start_time, endtime = end_time,date=date };
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
    public async Task<IEnumerable<Tasks>> GetChainDetailsAsync(int chain_id, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null)
    {
        var parameters = new
        {
            chainId = chain_id,
            startDate = startDate,
            endDate = endDate,
            benchStartDate = benchStartDate,
            benchEndDate = benchEndDate
        };

        return await _dbConnection.QueryAsync<Tasks>("SP_GetChainDetails", parameters, commandType: CommandType.StoredProcedure);
    }
     public async Task<IEnumerable<Tasks>> GetChainDetailsByTasknamesAsync(string tasknames, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null)
    {
        var parameters = new
        {
            taskname = tasknames,
            startDate = startDate,
            endDate = endDate,
            benchStartDate = benchStartDate,
            benchEndDate = benchEndDate
        };

        return await _dbConnection.QueryAsync<Tasks>("SP_GetChainDetailsByTaskNames", parameters, commandType: CommandType.StoredProcedure);
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
    public async Task<IEnumerable<Tasks>> GetTaskDetailsAsync(int chain_id, DateTime? startTime = null, DateTime? endTime = null)
    {
        var parameters = new
        {
            chainId = chain_id,
            starttime = startTime,
            endtime=endTime
            
        };

        return await _dbConnection.QueryAsync<Tasks>("SP_GetTaskDetails", parameters, commandType: CommandType.StoredProcedure);
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