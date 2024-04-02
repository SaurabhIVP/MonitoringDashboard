using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using application;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DataController : ControllerBase
{
    private readonly IService _objService;

    public DataController(IService objService)
    {
        _objService = objService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllChainDetails(bool? is_pm=false)
    {
        var chainDetails = await _objService.GetAllChainDetailsAsync(is_pm);
        return Ok(chainDetails);
    }
    
    [HttpGet]
    [Route("currentData/{is_pm?}")]
    public async Task<IActionResult> GetAllChainDetails1(DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute=null,string? deviationPercentage=null,bool? is_pm=false)
    {
        var chainDetails = await _objService.GetAllChainDetailsAsync1(startDate ,endDate ,benchStartDate ,  benchEndDate,benchmarkCompute,deviationPercentage,is_pm );
        return Ok(chainDetails);
    }
    [HttpGet]
    [Route("chains/{is_pm?}")]
    public async Task<IActionResult> GetAllChainNames(bool? is_pm=false)
    {
        var chainDetails = await _objService.GetAllChainNamesAsync(is_pm);
        return Ok(chainDetails);
    }

    [HttpGet]
    [Route("tasksss/{chain_id}/{is_pm?}")]
    public async Task<IActionResult> GetAllTaskNames(int chain_id,bool? is_pm=false)
    {

        var chainDetails = await _objService.GetAllTaskNamesAsync(chain_id,is_pm);
        return Ok(chainDetails);
    }

    [HttpGet]
    [Route("tasks/{date?}/{benchStartDate?}/{benchEndDate?}/{benchmarkCompute?}/{deviationPercentage?}/{chains?}/{is_pm?}")]
    public async Task<IActionResult> GetGanttDetails(string chains=null ,string? start_time="00:00:00.0000000",string? end_time="23:59:59.9999999",string? date="2024-01-17",string? benchStartDate = "2024-01-17", string? benchEndDate = "2024-01-24", string? benchmarkCompute="Average",string? deviationPercentage="0",bool? is_pm=false)
    {
        var chainDetails = await _objService.GetGanttDetailsAsync(chains,start_time, end_time,date,benchStartDate,benchEndDate,benchmarkCompute,deviationPercentage,is_pm);
        return Ok(chainDetails);
    }

     [HttpGet]
    [Route("tasks1/{date?}/{benchStartDate?}/{benchEndDate?}/{benchmarkCompute?}/{deviationPercentage?}/{is_pm?}/{chains?}")]
    public async Task<IActionResult> GetGanttDetails1(string chains=null ,string? start_time="00:00:00.0000000",string? end_time="23:59:59.9999999",string? date="2024-01-17",string? benchStartDate = "2024-01-17", string? benchEndDate = "2024-01-24", string? benchmarkCompute="Average",string? deviationPercentage="0",bool? is_pm=false)
    {
        var chainDetails = await _objService.GetGanttDetails1Async(chains,start_time, end_time,date,benchStartDate,benchEndDate,benchmarkCompute,deviationPercentage,is_pm);
        return Ok(chainDetails);
    }

    [HttpGet]
    [Route("tasksdetailsbyChainguid/{chain_id?}/{date?}/{benchStartDate?}/{benchEndDate?}/{benchmarkCompute?}/{deviationPercentage?}/{is_pm?}")]
    public async Task<IActionResult> GetTaskDetailsByChainGuid(int chain_id,string? date="2024-01-17",string? benchStartDate = "2024-01-17", string? benchEndDate = "2024-01-24", string? benchmarkCompute="Average",string? deviationPercentage="0",bool? is_pm=false)
    {
        var chainDetails = await _objService.GetTaskDetailsByChainGuidAsync(chain_id,date,benchStartDate,benchEndDate,benchmarkCompute,deviationPercentage,is_pm);
        return Ok(chainDetails);
    }


   [HttpGet]
[Route("chart/{is_pm?}")]
public async Task<IActionResult> GetChainTimeDetails(int chain_id, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute="Average",int? deviationPercentage=null,bool? is_pm=false)
{
    var chainDetails = await _objService.GetChainTimeDetailsAsync(chain_id, startDate, endDate, benchStartDate, benchEndDate,benchmarkCompute,deviationPercentage,is_pm);
    return Ok(chainDetails);
}
[HttpGet]
[Route("chaindetails/{chain_id}/{is_pm?}")]
public async Task<IActionResult> GetChainDetails(int chain_id, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute=null,string? deviationPercentage=null,bool? is_pm=false)
{
    var chainDetails = await _objService.GetChainDetailsAsync(chain_id, startDate, endDate, benchStartDate, benchEndDate,benchmarkCompute,deviationPercentage,is_pm);
    return Ok(chainDetails);
}
[HttpGet]
[Route("chaindetailsnew/{is_pm?}")]
public async Task<IActionResult> GetChainDetailsNew(int chain_id=0, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute=null,string? deviationPercentage=null,bool? is_pm=false)
{
    var chainDetails = await _objService.GetChainDetailsNewAsync(chain_id, startDate, endDate, benchStartDate, benchEndDate,benchmarkCompute,deviationPercentage,is_pm);
    return Ok(chainDetails);
}
[HttpGet]
[Route("chainDetailsByTaskname/{is_pm?}")]
public async Task<IActionResult> GetChainDetailsByTasknames(string tasknames, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute=null,string? deviationPercentage=null,bool? is_pm=false)
{
    var chainDetails = await _objService.GetChainDetailsByTasknamesAsync(tasknames, startDate, endDate, benchStartDate, benchEndDate, benchmarkCompute,deviationPercentage,is_pm);
    return Ok(chainDetails);
}
[HttpGet]
[Route("chart/tasks/{taskname}/{is_pm?}")]
public async Task<IActionResult> GetChainByTask(string taskname,bool? is_pm=false)
{
    var chainDetails = await _objService.GetChainByTaskAsync(taskname,is_pm);
    return Ok(chainDetails);
}
[HttpGet]
[Route("getFlowId/{taskname}/{chainname}/{is_pm?}")]
public async Task<IActionResult> GetFlowIdByChainTaskNames(string taskname,string chainname,bool? is_pm=false)
{
    var chainDetails = await _objService.GetFlowIdByChainTaskNamesAsync(taskname,chainname,is_pm);
    return Ok(chainDetails);
}
    [HttpGet]
[Route("chartTimes/{is_pm?}")]
public async Task<IActionResult> GetTaskTimeDetails(int flow_id, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute="Average",string? deviationPercentage=null,bool? is_pm=false)
{
    
    var chainDetails = await _objService.GetTaskTimeDetailsAsync(flow_id, startDate, endDate, benchStartDate, benchEndDate,benchmarkCompute,deviationPercentage,is_pm);
    return Ok(chainDetails);
}
    [HttpGet]
    [Route("getAllChainDetails/{chainID}/{taskID}/{benchmarkCompute}/{startDate}/{endDate}/{benchmarkStartDate}/{benchmarkEndDate}/{is_pm?}")]
    public async Task<IActionResult> getAllChainDetails(int chainID,int taskID,string benchmarkCompute,string startDate,string endDate, string benchmarkStartDate, string benchmarkEndDate,bool? is_pm=false)
    {
        var chainDetails = await _objService.getChainDetails(chainID,taskID,benchmarkCompute,startDate,endDate,benchmarkStartDate,benchmarkEndDate,is_pm);
        return Ok(chainDetails);
    }

    [HttpGet]
    [Route("taskdetails/{chain_id}/{is_pm?}")]
    public async Task<IActionResult> GetTaskDetails(int chain_id,DateTime? startTime = null,DateTime? endTime=null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute=null,string? deviationPercentage=null,bool? is_pm=false)
    {
        var chainDetails = await _objService.GetTaskDetailsAsync(chain_id, startTime, endTime, benchStartDate, benchEndDate,benchmarkCompute,deviationPercentage,is_pm);
        return Ok(chainDetails);
    }
     [HttpGet]
    [Route("taskdetails/{is_pm?}")]
    public async Task<IActionResult> GetTaskDetailsNew(DateTime? startTime,DateTime? endTime=null, DateTime? benchStartDate = null, DateTime? benchEndDate = null, string? benchmarkCompute="Average",string? deviationPercentage=null,bool? is_pm=false)
    {
        
        var chainDetails = await _objService.GetTaskDetailsNewAsync( startTime, endTime, benchStartDate, benchEndDate,benchmarkCompute,deviationPercentage,is_pm);
        return Ok(chainDetails);
    }
    
}