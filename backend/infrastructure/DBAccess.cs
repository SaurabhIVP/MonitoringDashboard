using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using domain;
using System.Globalization;
using System.Data.SqlClient;
namespace infrastructure;
public class DBAccess : IDBAccess
{
     private readonly IDbConnection _dbConnection;
     

    public DBAccess(IDbConnection dbConnection)
    {
        _dbConnection = dbConnection;
    }
      
    private string GetConnectionString(bool? connectionType=false)
    {
        // Your logic to determine the connection string based on the connectionType
        // For example:
        if (connectionType == false)
        {
            return "Server=192.168.0.13\\sqlexpress,49753;Database=MonitoringDashboard;User Id=sa;Password=sa@12345678;";
        }
        else 
        {
            return "Server=192.168.0.13\\sqlexpress,49753;Database=MonitoringDashboardPM;User Id=sa;Password=sa@12345678;";
        }
    }
    public async Task<IEnumerable<Tasks>> GetAllChainDetailsAsync(bool? is_pm=false)
    {
        string _connectionString=GetConnectionString(is_pm);
        using var connection = new SqlConnection(_connectionString);
        return await connection.QueryAsync<Tasks>("SP_GetGanttDetails", commandType: CommandType.StoredProcedure);
    }
    public async Task<IEnumerable<Tasks>> GetCurrentDataAsync(DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute=null,string? deviationPercentage=null,bool? is_pm=false)
    {
        string _connectionString=GetConnectionString(is_pm);
        using var connection = new SqlConnection(_connectionString);
        var parameters = new
        {
            startDate = startDate,
            endDate = endDate,
            benchStartDate = benchStartDate,
            benchEndDate = benchEndDate,
            benchmarkCompute = benchmarkCompute,
            deviationPercentage = deviationPercentage
        };

        return await connection.QueryAsync<Tasks>("SP_GetAllChainDetails1", parameters,commandType: CommandType.StoredProcedure);
    }
    public async Task<IEnumerable<Tasks>> GetAllChainNamesAsync(bool? is_pm=false)
    {
        string _connectionString=GetConnectionString(is_pm);
        using var connection = new SqlConnection(_connectionString);
        var parameters = new DynamicParameters();
        return await connection.QueryAsync<Tasks>("SP_GetDistinctChainNames", parameters, commandType: CommandType.StoredProcedure);
    }
    public async Task<IEnumerable<Tasks>> GetAllTaskNamesAsync(int chain_id,bool? is_pm=false)
    {
        string _connectionString=GetConnectionString(is_pm);
        using var connection = new SqlConnection(_connectionString);
        var parameters = new { ChainId = chain_id };
        return await connection.QueryAsync<Tasks>("SP_GetTaskNamesByChain", parameters, commandType: CommandType.StoredProcedure);
    }
    public async Task<IEnumerable<Tasks>> GetChainByTaskAsync(string taskname,bool? is_pm=false)
    {
        string _connectionString=GetConnectionString(is_pm);
        using var connection = new SqlConnection(_connectionString);
        var parameters=new {taskname=taskname};
        return await connection.QueryAsync<Tasks>("SP_GetChainByTask",parameters, commandType: CommandType.StoredProcedure);
    }
    public async Task<IEnumerable<Tasks>> GetFlowIdByChainTaskNamesAsync(string taskname,string chainname,bool? is_pm=false)
    {
        string _connectionString=GetConnectionString(is_pm);
        using var connection = new SqlConnection(_connectionString);
        var parameters=new {taskname=taskname,chainname=chainname};
        return await connection.QueryAsync<Tasks>("SP_GetFlowIdByChainTaskNames",parameters, commandType: CommandType.StoredProcedure);
    }
    public async Task<IEnumerable<GanttData>> GetGanttDetailsAsync(string chains=null ,string? start_time="00:00:00.0000000",string? end_time="23:59:59.9999999",string? date="2024-01-17",string? benchStartDate = "2024-01-17", string? benchEndDate = "2024-01-24", string? benchmarkCompute="Average",string? deviationPercentage="0",bool? is_pm=false)
    {
        string _connectionString=GetConnectionString(is_pm);
        using var connection = new SqlConnection(_connectionString);
        DateTime pardsedDate=DateTime.ParseExact(date, "yyyy-MM-dd", CultureInfo.InvariantCulture);
        DateTime parsedStartDate = DateTime.ParseExact(benchStartDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);
DateTime parsedEndDate = DateTime.ParseExact(benchEndDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);

    var parameters = new
    {
        chains = chains,
        
        date = pardsedDate,
        benstartdate = parsedStartDate,
        benenddate = parsedEndDate,
        benchmarkCompute=benchmarkCompute,
        deviationPercentage=deviationPercentage
    };
    return await connection.QueryAsync<GanttData>("SP_GetGanttDetails", parameters, commandType: CommandType.StoredProcedure);
    }

    public async Task<IEnumerable<GanttData>> GetTaskDetailsByChainGuidAsync(int chain_id,string? date="2024-01-17",string? benchStartDate = "2024-01-17", string? benchEndDate = "2024-01-24", string? benchmarkCompute="Average",string? deviationPercentage="0",bool? is_pm=false)
    {
        string _connectionString=GetConnectionString(is_pm);
        using var connection = new SqlConnection(_connectionString);
        DateTime pardsedDate=DateTime.ParseExact(date, "yyyy-MM-dd", CultureInfo.InvariantCulture);
        DateTime parsedStartDate = DateTime.ParseExact(benchStartDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);
DateTime parsedEndDate = DateTime.ParseExact(benchEndDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);

    var parameters = new
    {
        chainId = chain_id,
        
        
        date = pardsedDate,
        benstartdate = parsedStartDate,
        benenddate = parsedEndDate,
        benchmarkCompute=benchmarkCompute,
        deviationPercentage=deviationPercentage
    };

    return await connection.QueryAsync<GanttData>("SP_GetTaskDetailsByChainGuid", parameters, commandType: CommandType.StoredProcedure);
    }

    public async Task<IEnumerable<GanttData>> GetGanttDetails1Async(string chains=null ,string? start_time="00:00:00.0000000",string? end_time="23:59:59.9999999",string? date="2024-01-17",string? benchStartDate = "2024-01-17", string? benchEndDate = "2024-01-24", string? benchmarkCompute="Average",string? deviationPercentage="0",bool? is_pm=false)
    {
        string _connectionString=GetConnectionString(is_pm);
        using var connection = new SqlConnection(_connectionString);
        DateTime pardsedDate=DateTime.ParseExact(date, "yyyy-MM-dd", CultureInfo.InvariantCulture);
        DateTime parsedStartDate = DateTime.ParseExact(benchStartDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);
DateTime parsedEndDate = DateTime.ParseExact(benchEndDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);

    var parameters = new
    {
        chains = chains,
        
        date = pardsedDate,
        benstartdate = parsedStartDate,
        benenddate = parsedEndDate,
        benchmarkCompute=benchmarkCompute,
        deviationPercentage=deviationPercentage
    };

    return await connection.QueryAsync<GanttData>("SP_GetGanttDetails1", parameters, commandType: CommandType.StoredProcedure);
    }
    public async Task<IEnumerable<Tasks>> GetChainTimeDetailsAsync(int chain_id, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute="Average",int? deviationPercentage=null,bool? is_pm=false)
    {
        string _connectionString=GetConnectionString(is_pm);
        using var connection = new SqlConnection(_connectionString);
        var parameters = new
        {
            chainId = chain_id,
            startDate = startDate,
            endDate = endDate,
            benchStartDate = benchStartDate,
            benchEndDate = benchEndDate,
            benchmarkCompute=  benchmarkCompute,
            deviationPercentage=deviationPercentage
        };

        return await connection.QueryAsync<Tasks>("SP_GetChainTimeDetails", parameters, commandType: CommandType.StoredProcedure);
    }
    public async Task<IEnumerable<Tasks>> GetChainDetailsAsync(int chain_id, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute=null,string? deviationPercentage=null,bool? is_pm=false)
    {
        string _connectionString=GetConnectionString(is_pm);
        using var connection = new SqlConnection(_connectionString);
        var parameters = new
        {
            chainId = chain_id,
            startDate = startDate,
            endDate = endDate,
            benchStartDate = benchStartDate,
            benchEndDate = benchEndDate,
            benchmarkCompute = benchmarkCompute,
            deviationPercentage = deviationPercentage
        };

        return await connection.QueryAsync<Tasks>("SP_GetChainDetails", parameters, commandType: CommandType.StoredProcedure);
    }
     public async Task<IEnumerable<Tasks>> GetChainDetailsNewAsync(int chain_id=0, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute=null,string? deviationPercentage=null,bool? is_pm=false)
    {
        string _connectionString=GetConnectionString(is_pm);
        using var connection = new SqlConnection(_connectionString);
        var parameters = new
        {
            chainId = chain_id,
            startDate = startDate,
            endDate = endDate,
            benchStartDate = benchStartDate,
            benchEndDate = benchEndDate,
            benchmarkCompute = benchmarkCompute,
            deviationPercentage = deviationPercentage,
            
        };

        return await connection.QueryAsync<Tasks>("SP_GetChainDetailsNew", parameters, commandType: CommandType.StoredProcedure);
    }
     public async Task<IEnumerable<Tasks>> GetChainDetailsByTasknamesAsync(string tasknames, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute=null,string? deviationPercentage=null,bool? is_pm=false)
    {
        string _connectionString=GetConnectionString(is_pm);
        using var connection = new SqlConnection(_connectionString);
        var parameters = new
        {
            taskname = tasknames,
            startDate = startDate,
            endDate = endDate,
            benchStartDate = benchStartDate,
            benchEndDate = benchEndDate,
            benchmarkCompute = benchmarkCompute,
            deviationPercentage = deviationPercentage
        };

        return await connection.QueryAsync<Tasks>("SP_GetChainDetailsByTaskNames", parameters, commandType: CommandType.StoredProcedure);
    }
    public async Task<IEnumerable<Tasks>> GetTaskTimeDetailsAsync(int flow_id, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute=null,string? deviationPercentage=null,bool? is_pm=false)
    {
        string _connectionString=GetConnectionString(is_pm);
        using var connection = new SqlConnection(_connectionString);
        var parameters = new
        {
            flowId = flow_id,
            startDate = startDate,
            endDate = endDate,
            benchStartDate = benchStartDate,
            benchmarkCompute = benchmarkCompute,
            deviationPercentage = deviationPercentage,
            benchEndDate = benchEndDate
        };

        return await connection.QueryAsync<Tasks>("SP_GetTaskTimeDetails", parameters, commandType: CommandType.StoredProcedure);
    }
    public async Task<IEnumerable<Tasks>> GetTaskDetailsAsync(int chain_id,DateTime? startTime = null,DateTime? endTime=null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute=null,string? deviationPercentage=null,bool? is_pm=false)
    {
        string _connectionString=GetConnectionString(is_pm);
        using var connection = new SqlConnection(_connectionString);
        var parameters = new
        {
            chainId = chain_id,
            starttime = startTime,
            endtime=endTime,
            benchStartDate = benchStartDate,
            benchEndDate = benchEndDate,
            benchmarkCompute = benchmarkCompute,
            deviationPercentage = deviationPercentage
        };

        return await connection.QueryAsync<Tasks>("SP_GetTaskDetails", parameters, commandType: CommandType.StoredProcedure);
    }
    public async Task<IEnumerable<Tasks>> GetTaskDetailsNewAsync(DateTime? startTime = null,DateTime? endTime=null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute=null,string? deviationPercentage=null,bool? is_pm=false)
    {
        string _connectionString=GetConnectionString(is_pm);
        using var connection = new SqlConnection(_connectionString);
        var parameters = new
        {
          
            startDate = startTime,
            endDate=endTime,
            benchStartDate = benchStartDate,
            benchEndDate = benchEndDate,
           
        };

        return await connection.QueryAsync<Tasks>("SP_GetTaskTimeDetailsTest", parameters, commandType: CommandType.StoredProcedure);
    }
    public async Task<IEnumerable<ChainDetails>> getChainDetails(int chainID,int taskID,string benchmarkCompute,string startDate,string endDate, string benchmarkStartDate, string benchmarkEndDate,bool? is_pm=false)
    {
        string _connectionString=GetConnectionString(is_pm);
        using var connection = new SqlConnection(_connectionString);
        var parameters = new {
            chainID = chainID,
            taskID = taskID,
            benchmarkCompute = benchmarkCompute,
            startDate = startDate,
            endDate = endDate,
            benchmarkStartDate = benchmarkStartDate,
            benchmarkEndDate = benchmarkEndDate
        };
        return await connection.QueryAsync<ChainDetails>("SP_GetAllChainDetails",parameters,commandType:CommandType.StoredProcedure);
    }
    
}