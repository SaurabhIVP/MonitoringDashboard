using System.Data.SqlClient;
using System.Data;
namespace infrastructure;

public interface IDBConnectionFactory
{
    IDbConnection CreateConnection(bool is_pm);
}
