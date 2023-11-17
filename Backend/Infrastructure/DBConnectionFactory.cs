using System.Data.SqlClient;
using System.Data;
namespace infrastructure;

public class DBConnectionFactory: IDBConnectionFactory{
    private readonly string ConnectionString;
    public DBConnectionFactory(string connectionString){
        ConnectionString = connectionString;
    }
    public IDbConnection CreateConnection(){
        return new SqlConnection(ConnectionString);
    }
}