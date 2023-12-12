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
    [Route("chains")]
    public async Task<IActionResult> GetAllChainNames()
    {
        var chainDetails = await _objService.GetAllChainNamesAsync();
        return Ok(chainDetails);
    }

    [HttpGet]
    [Route("tasks/{chainname}")]
    public async Task<IActionResult> GetAllTaskNames(string chainname)
    {
        var chainDetails = await _objService.GetAllTaskNamesAsync(chainname);
        return Ok(chainDetails);
    }

    [HttpGet]
    [Route("tasks/{start_time}/{end_time}")]
    public async Task<IActionResult> GetGanttDetails(DateTime start_time,DateTime end_time)
    {
        var chainDetails = await _objService.GetGanttDetailsAsync(start_time, end_time);
        return Ok(chainDetails);
    }

    [HttpGet]
    [Route("getAllChainDetails/{chainID}/{taskID}/{benchmarkCompute}/{startDate}/{endDate}/{benchmarkStartDate}/{benchmarkEndDate}")]
    public async Task<IActionResult> getAllChainDetails(int chainID,int taskID,string benchmarkCompute,string startDate,string endDate, string benchmarkStartDate, string benchmarkEndDate)
    {
        var chainDetails = await _objService.getChainDetails(chainID,taskID,benchmarkCompute,startDate,endDate,benchmarkStartDate,benchmarkEndDate);
        return Ok(chainDetails);
    }
    
}