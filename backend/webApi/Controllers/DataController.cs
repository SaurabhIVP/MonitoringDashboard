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
    [Route("chains1")]
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
    [Route("tasks/{start_time?}/{end_time?}/{chains?}")]
    public async Task<IActionResult> GetGanttDetails(DateTime? start_time=null,DateTime? end_time=null,string? chains=null)
    {
        var chainDetails = await _objService.GetGanttDetailsAsync(chains,start_time, end_time);
        return Ok(chainDetails);
    }


   [HttpGet]
[Route("chart/{chain_id}")]
public async Task<IActionResult> GetChainTimeDetails(int chain_id, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null)
{
    var chainDetails = await _objService.GetChainTimeDetailsAsync(chain_id, startDate, endDate, benchStartDate, benchEndDate);
    return Ok(chainDetails);
}
[HttpGet]
[Route("chart/g/{chain_id}")]
public async Task<IActionResult> GetChainDetails(int chain_id, DateTime? startDate = null, DateTime? endDate = null, DateTime? benchStartDate = null, DateTime? benchEndDate = null)
{
    var chainDetails = await _objService.GetChainDetailsAsync(chain_id, startDate, endDate, benchStartDate, benchEndDate);
    return Ok(chainDetails);
}
    [HttpGet]
[Route("chart/tasktimes/{flow_id}")]
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
    [Route("taskss/tasktimes/{chain_id}/{startTime?}/{endTime?}")]
    public async Task<IActionResult> GetTaskDetails(int chain_id,DateTime? startTime = null,DateTime? endTime=null)
    {
        var chainDetails = await _objService.GetTaskDetailsAsync(chain_id,startTime,endTime);
        return Ok(chainDetails);
    }
    
}