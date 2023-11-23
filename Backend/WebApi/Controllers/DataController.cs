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
    [Route("tasks/{chain}")]
    public async Task<IActionResult> GetAllTaskNames(string chain)
    {
        var chainDetails = await _chainService.GetAllTaskNamesAsync(chain);
        return Ok(chainDetails);
    }

    
}