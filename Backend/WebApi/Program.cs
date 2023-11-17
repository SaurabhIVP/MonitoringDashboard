using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration; // Add this using directive
using Microsoft.Extensions.DependencyInjection;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
using Application;
using infrastructure;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? "DefaultFallbackConnection";
// Add services to the container.
builder.Services.AddTransient<IDbConnection>(_ => new SqlConnection(connectionString));
builder.Services.AddTransient<IDBConnectionFactory,DBConnectionFactory>(_ => new DBConnectionFactory(connectionString));
builder.Services.AddTransient<IDBAccess,DBAccess>();
builder.Services.AddTransient<IService, Service>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
