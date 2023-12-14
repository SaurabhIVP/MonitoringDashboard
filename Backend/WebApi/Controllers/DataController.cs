using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Application;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DataController : ControllerBase
{
    private readonly IService _chainService;

    public DataController(IService chainService)
    {
        _chainService = chainService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllChainDetails()
    {
        var chainDetails = await _chainService.GetAllChainDetailsAsync();
        return Ok(chainDetails);
    }
    [HttpGet]
    [Route("chains")]
    public async Task<IActionResult> GetAllChainNames()
    {
        var chainDetails = await _chainService.GetAllChainNamesAsync();
        return Ok(chainDetails);
    }

    [HttpGet]
    [Route("tasks/{chain_id}")]
    public async Task<IActionResult> GetAllTaskNames(int chain_id)
    {
        var chainDetails = await _chainService.GetAllTaskNamesAsync(chain_id);
        return Ok(chainDetails);
    }

    [HttpGet]
    [Route("tasks/{start_time?}/{end_time?}/{chains?}")]
    public async Task<IActionResult> GetGanttDetails(DateTime? start_time=null,DateTime? end_time=null,string? chains=null)
    {
        var chainDetails = await _chainService.GetGanttDetailsAsync(chains,start_time, end_time);
        return Ok(chainDetails);
    }

    
}