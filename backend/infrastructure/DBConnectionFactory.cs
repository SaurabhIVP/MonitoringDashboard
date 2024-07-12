using System.Data.SqlClient;
using System.Data;
using Microsoft.Extensions.Configuration;
namespace infrastructure;

public class DBConnectionFactory: IDBConnectionFactory{
    // private readonly string ConnectionString;
    private readonly IConfiguration _configuration;
    public DBConnectionFactory(IConfiguration configuration){
        _configuration = configuration;
    }
    public IDbConnection CreateConnection(bool is_pm){
         string connectionString = GetConnectionString(is_pm);
        return new SqlConnection(connectionString);
    }
    private string GetConnectionString(bool is_pm)
    {
        return _configuration.GetConnectionString(is_pm ? "PM" : "SM");
    }
}