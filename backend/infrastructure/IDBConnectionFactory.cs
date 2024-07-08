using System.Data.SqlClient;
using System.Data;
namespace infrastructure;

public interface IDBConnectionFactory
{
    IDbConnection CreateConnection();
}
