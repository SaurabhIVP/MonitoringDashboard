using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Application;

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
    public async Task<IActionResult> GetAllChainDetails()
    {
        var chainDetails = await _objService.GetAllChainDetailsAsync();
        return Ok(chainDetails);
    }
    [HttpGet]
    [Route("currentData")]
    public async Task<IActionResult> GetAllChainDetails1()
    {
        var chainDetails = await _objService.GetAllChainDetailsAsync1();
        return Ok(chainDetails);
    }
    [HttpGet]
    [Route("chains")]
    public async Task<IActionResult> GetAllChainNames()
    {
        var chainDetails = await _objService.GetAllChainNamesAsync();
        return Ok(chainDetails);
    }

    [HttpGet]
    [Route("tasksss/{chain_id}")]
    public async Task<IActionResult> GetAllTaskNames(int chain_id)
    {

        var chainDetails = await _objService.GetAllTaskNamesAsync(chain_id);
        return Ok(chainDetails);
    }

    [HttpGet]
    [Route("tasks/{date?}/{start_time?}/{end_time?}/{chains?}")]
    public async Task<IActionResult> GetGanttDetails(string chains=null ,string? start_time=null,string? end_time=null,DateTime? date=null)
    {
        var chainDetails = await _objService.GetGanttDetailsAsync(chains,start_time, end_time,date);
        return Ok(chainDetails);
    }


   [HttpGet]
[Route("chart")]
public async Task<IActionResult> GetChainTimeDetails(int chain_id, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null)
{
    var chainDetails = await _objService.GetChainTimeDetailsAsync(chain_id, startDate, endDate, benchStartDate, benchEndDate);
    return Ok(chainDetails);
}
[HttpGet]
[Route("chaindetails/{chain_id}")]
public async Task<IActionResult> GetChainDetails(int chain_id, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null)
{
    var chainDetails = await _objService.GetChainDetailsAsync(chain_id, startDate, endDate, benchStartDate, benchEndDate);
    return Ok(chainDetails);
}
[HttpGet]
[Route("chainDetailsByTaskname")]
public async Task<IActionResult> GetChainDetailsByTasknames(string tasknames, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null)
{
    var chainDetails = await _objService.GetChainDetailsByTasknamesAsync(tasknames, startDate, endDate, benchStartDate, benchEndDate);
    return Ok(chainDetails);
}
[HttpGet]
[Route("chart/tasks/{taskname}")]
public async Task<IActionResult> GetChainByTask(string taskname)
{
    var chainDetails = await _objService.GetChainByTaskAsync(taskname);
    return Ok(chainDetails);
}
[HttpGet]
[Route("getFlowId/{taskname}/{chainname}")]
public async Task<IActionResult> GetFlowIdByChainTaskNames(string taskname,string chainname)
{
    var chainDetails = await _objService.GetFlowIdByChainTaskNamesAsync(taskname,chainname);
    return Ok(chainDetails);
}
    [HttpGet]
[Route("chartTimes")]
public async Task<IActionResult> GetTaskTimeDetails(int flow_id, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null)
{
    
    var chainDetails = await _objService.GetTaskTimeDetailsAsync(flow_id, startDate, endDate, benchStartDate, benchEndDate);
    return Ok(chainDetails);
}
    [HttpGet]
    [Route("getAllChainDetails/{chainID}/{taskID}/{benchmarkCompute}/{startDate}/{endDate}/{benchmarkStartDate}/{benchmarkEndDate}")]
    public async Task<IActionResult> getAllChainDetails(int chainID,int taskID,string benchmarkCompute,string startDate,string endDate, string benchmarkStartDate, string benchmarkEndDate)
    {
        var chainDetails = await _objService.getChainDetails(chainID,taskID,benchmarkCompute,startDate,endDate,benchmarkStartDate,benchmarkEndDate);
        return Ok(chainDetails);
    }

    [HttpGet]
    [Route("taskdetails/{chain_id}/{startTime?}/{endTime?}")]
    public async Task<IActionResult> GetTaskDetails(int chain_id,DateTime? startTime = null,DateTime? endTime=null)
    {
        var chainDetails = await _objService.GetTaskDetailsAsync(chain_id,startTime,endTime);
        return Ok(chainDetails);
    }
    
}