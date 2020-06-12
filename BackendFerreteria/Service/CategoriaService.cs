using BackendFerreteria.Entity;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendFerreteria.Dao
{
    public class CategoriaService
    {
        private MySqlConnection Connection;

        public CategoriaService(MySqlConnection Connection) {
            this.Connection = Connection;
        }

        public async Task<List<Categoria>> ListCategoria()
        {
            var ret = new List<Categoria>();

            var cmd = Connection.CreateCommand() as MySqlCommand;
            cmd.CommandText = @"SELECT nId, sNombre, nEstado, dRegistro FROM categoria";

            using (var reader = await cmd.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    var t = new Categoria
                    {
                        Id = reader.GetFieldValue<int>(0),
                        Nombre = reader.GetFieldValue<string>(1),
                        Estado = reader.GetFieldValue<int>(2),
                        Registro = reader.GetFieldValue<DateTime>(3)
                    };
                    ret.Add(t);
                }
            }
            return ret;
        }
        public String SaveCategoria(Categoria categoria)
        {
            String response = "";
            var cmd = Connection.CreateCommand() as MySqlCommand;
            cmd.CommandText = @"INSERT INTO categoria(sNombre, nEstado, dRegistro) VALUES (@Nombre, 1, STR_TO_DATE(@Date, '%Y/%m/%d'));";
            cmd.Parameters.AddWithValue("@Nombre", categoria.Nombre);
            cmd.Parameters.AddWithValue("@Date", DateTime.Now.ToString("yyyy/MM/dd"));

            var recs = cmd.ExecuteNonQuery();

            if (recs == 1)
                response = "OK";
            else
                response = "Sorry! I didn't get that.";

            return response;
        }
    }
}
