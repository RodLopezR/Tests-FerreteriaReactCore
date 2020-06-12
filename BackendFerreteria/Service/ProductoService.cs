using BackendFerreteria.Entity;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;

namespace BackendFerreteria.Service
{
    public class ProductoService
    {
        private MySqlConnection Connection;

        public ProductoService(MySqlConnection Connection)
        {
            this.Connection = Connection;
        }

        public async Task<Producto> ListProductoXId(int id)
        {
            var ret = new Producto();

            var cmd = Connection.CreateCommand() as MySqlCommand;
            cmd.CommandText = @"SELECT * FROM producto WHERE nId = @Id";
            cmd.Parameters.AddWithValue("@Id", id);

            using (DbDataReader reader = await cmd.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    ret = new Producto
                    {
                        Id = reader.GetFieldValue<int>(0),
                        IdCategoria = reader.GetFieldValue<int>(1),
                        Codigo = reader.GetFieldValue<string>(2),
                        Nombre = reader.GetFieldValue<string>(3),
                        Precio = reader.GetFieldValue<decimal>(4),
                        Stock = reader.GetFieldValue<int>(5),
                        Registro = reader.GetFieldValue<DateTime>(6),
                        Actualizacion = reader.GetFieldValue<DateTime>(7)
                    };
                }
            }
            return ret;
        }

        public async Task<List<Producto>> ListProducto()
        {
            var ret = new List<Producto>();

            var cmd = Connection.CreateCommand() as MySqlCommand;
            cmd.CommandText = @"SELECT * FROM producto";

            using (DbDataReader reader = await cmd.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    var t = new Producto
                    {
                        Id = reader.GetFieldValue<int>(0),
                        IdCategoria = reader.GetFieldValue<int>(1),
                        Codigo = reader.GetFieldValue<string>(2),
                        Nombre = reader.GetFieldValue<string>(3),
                        Precio = reader.GetFieldValue<decimal>(4),
                        Stock = reader.GetFieldValue<int>(5),
                        Registro = reader.GetFieldValue<DateTime>(6),
                        Actualizacion = reader.GetFieldValue<DateTime>(7)
                    };
                    ret.Add(t);
                }
            }
            return ret;
        }

        public async Task<List<Producto>> ListProductoXNombre(string nombre)
        {
            var ret = new List<Producto>();

            var cmd = Connection.CreateCommand() as MySqlCommand;
            cmd.CommandText = @"SELECT * FROM producto WHERE sNombre like CONCAT('%', @Nombre, '%')";
            cmd.Parameters.AddWithValue("@Nombre", nombre);

            using (DbDataReader reader = await cmd.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    var t = new Producto
                    {
                        Id = reader.GetFieldValue<int>(0),
                        IdCategoria = reader.GetFieldValue<int>(1),
                        Codigo = reader.GetFieldValue<string>(2),
                        Nombre = reader.GetFieldValue<string>(3),
                        Precio = reader.GetFieldValue<decimal>(4),
                        Stock = reader.GetFieldValue<int>(5),
                        Registro = reader.GetFieldValue<DateTime>(6),
                        Actualizacion = reader.GetFieldValue<DateTime>(7)
                    };
                    ret.Add(t);
                }
            }
            return ret;
        }

        public async Task<List<Producto>> ListProductoXCodigo(string codigo)
        {
            var ret = new List<Producto>();

            var cmd = Connection.CreateCommand() as MySqlCommand;
            cmd.CommandText = @"SELECT * FROM producto WHERE sCodigo = @Codigo";
            cmd.Parameters.AddWithValue("@Codigo", codigo);

            using (DbDataReader reader = await cmd.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    var t = new Producto
                    {
                        Id = reader.GetFieldValue<int>(0),
                        IdCategoria = reader.GetFieldValue<int>(1),
                        Codigo = reader.GetFieldValue<string>(2),
                        Nombre = reader.GetFieldValue<string>(3),
                        Precio = reader.GetFieldValue<decimal>(4),
                        Stock = reader.GetFieldValue<int>(5),
                        Registro = reader.GetFieldValue<DateTime>(6),
                        Actualizacion = reader.GetFieldValue<DateTime>(7)
                    };
                    ret.Add(t);
                }
            }
            return ret;
        }

        public String SaveProducto(Producto producto)
        {
            String response = "";
            var cmd = Connection.CreateCommand() as MySqlCommand;
            cmd.CommandText = @"INSERT INTO producto(nIdCategoria, sCodigo, sNombre, nPrecio, nStock, dRegistro, dActualizacion) VALUES (@IdCategoria, @Codigo, @Nombre, @Precio, @Stock, STR_TO_DATE(@Date, '%Y/%m/%d'), STR_TO_DATE(@Date, '%Y/%m/%d'));";
            cmd.Parameters.AddWithValue("@IdCategoria", producto.IdCategoria);
            cmd.Parameters.AddWithValue("@Codigo", producto.Codigo);
            cmd.Parameters.AddWithValue("@Nombre", producto.Nombre);
            cmd.Parameters.AddWithValue("@Precio", producto.Precio);
            cmd.Parameters.AddWithValue("@Stock", producto.Stock);
            cmd.Parameters.AddWithValue("@Date", DateTime.Now.ToString("yyyy/MM/dd"));

            var recs = cmd.ExecuteNonQuery();

            if (recs == 1)
                response = "OK";
            else
                response = "Sorry! I didn't get that.";

            return response;
        }

        public String UpdateProducto(Producto producto)
        {
            String response = "";
            var cmd = Connection.CreateCommand() as MySqlCommand;
            cmd.CommandText = @"UPDATE producto SET nIdCategoria = @IdCategoria, sCodigo = @Codigo, sNombre = @Nombre, nPrecio = @Precio, nStock = @Stock, dActualizacion = STR_TO_DATE(@Date, '%Y/%m/%d') WHERE nId = @Id";
            cmd.Parameters.AddWithValue("@Id", producto.Id);
            cmd.Parameters.AddWithValue("@IdCategoria", producto.IdCategoria);
            cmd.Parameters.AddWithValue("@Codigo", producto.Codigo);
            cmd.Parameters.AddWithValue("@Nombre", producto.Nombre);
            cmd.Parameters.AddWithValue("@Precio", producto.Precio);
            cmd.Parameters.AddWithValue("@Stock", producto.Stock);
            cmd.Parameters.AddWithValue("@Date", DateTime.Now.ToString("yyyy/MM/dd"));

            var recs = cmd.ExecuteNonQuery();

            if (recs == 1)
                response = "OK";
            else
                response = "No se pudo completar la operación";

            return response;
        }

        public String DeleteProducto(Producto producto)
        {
            String response = "";
            var cmd = Connection.CreateCommand() as MySqlCommand;
            cmd.CommandText = @"DELETE FROM producto WHERE nId = @Id";
            cmd.Parameters.AddWithValue("@Id", producto.Id);

            var recs = cmd.ExecuteNonQuery();

            if (recs == 1)
                response = "OK";
            else
                response = "No se pudo completar la operación";

            return response;
        }

        public async Task<string> ListCodigo()
        {
            string codigo = "";

            var cmd = Connection.CreateCommand() as MySqlCommand;
            cmd.CommandText = @"SELECT CONCAT('000000000',  MAX(nId) + 1) as Codigo FROM producto";
            cmd.Parameters.AddWithValue("@Codigo", codigo);

            using (DbDataReader reader = await cmd.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    codigo = reader.GetFieldValue<string>(0);
                    codigo = codigo.Length > 10 ? codigo.Substring(codigo.Length - 10, 10) : codigo;
                }
            }
            return codigo;
        }
    }
}
