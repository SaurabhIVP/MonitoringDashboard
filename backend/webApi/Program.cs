using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration; 
using System.Data.SqlClient;
using System.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using application;
using infrastructure;

var host = Host.CreateDefaultBuilder(args)
    .ConfigureWebHostDefaults(webBuilder =>
    {
        webBuilder.ConfigureAppConfiguration((hostingContext, config) =>
        {
            config.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
        });

        webBuilder.ConfigureServices((context, services) =>
        {
            var connectionStringSM = context.Configuration.GetConnectionString("SM") ?? "DefaultFallbackConnection";
            
            services.AddTransient<IDbConnection>(_ => new SqlConnection(connectionStringSM));
            services.AddTransient<IDBConnectionFactory, DBConnectionFactory>(_ => new DBConnectionFactory(connectionStringSM));
            services.AddTransient<IDBAccess, DBAccess>();
            services.AddTransient<IService, Service>();
            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddCors(p => p.AddPolicy("corspolicy", build =>
            {
                build.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader();
            }));
        });

        webBuilder.Configure((context, app) =>
        {
            if (context.HostingEnvironment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseRouting(); // Ensure this is before UseEndpoints
            app.UseCors("corspolicy");
            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        });
    })
    .Build();

host.Run();
