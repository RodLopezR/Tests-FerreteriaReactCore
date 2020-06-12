using BackendFerreteria.Dao;
using BackendFerreteria.Entity;
using BackendFerreteria.Service;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendFerreteria.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Produces("application/json")]
    public class ProductoController : Controller
    {
        private ProductoService oService;

        public ProductoController(MySQLDatabase oBd)
        {
            oService = new ProductoService(oBd.Connection);
        }

        /// <summary>
        /// Obtenemos todas las categorías.
        /// </summary>
        /// <returns>Coleccion de categorías.</returns>
        /// <remarks>Metodo no requiere parametros</remarks>
        /// <response code="200">Si la operación es exitosa se listan las categorías.</response>
        [HttpGet("/producto")]
        public async Task<List<Producto>> Get()
        {
            return await oService.ListProducto();
        }

        /// <summary>
        /// Obtenemos todas las categorías.
        /// </summary>
        /// <returns>Coleccion de categorías.</returns>
        /// <remarks>Metodo no requiere parametros</remarks>
        /// <response code="200">Si la operación es exitosa se listan las categorías.</response>
        [HttpGet("/producto/id")]
        public async Task<Producto> GetId(int id)
        {
            return await oService.ListProductoXId(id);
        }

        /// <summary>
        /// Obtenemos todas las categorías.
        /// </summary>
        /// <returns>Coleccion de categorías.</returns>
        /// <remarks>Metodo no requiere parametros</remarks>
        /// <response code="200">Si la operación es exitosa se listan las categorías.</response>
        [HttpGet("/producto/nombre")]
        public async Task<List<Producto>> GetNombre(String nombre)
        {
            return await oService.ListProductoXNombre(nombre);
        }

        /// <summary>
        /// Obtenemos todas las categorías.
        /// </summary>
        /// <returns>Coleccion de categorías.</returns>
        /// <remarks>Metodo no requiere parametros</remarks>
        /// <response code="200">Si la operación es exitosa se listan las categorías.</response>
        [HttpGet("/producto/codigo")]
        public async Task<List<Producto>> GetCodigo(String codigo)
        {
            return await oService.ListProductoXCodigo(codigo);
        }

        /// <summary>
        /// Guardar nueva categoría.
        /// </summary>
        /// <returns>Retorna mensaje con condición de la operación.</returns>
        /// <remarks>Metodo requiere registro de categoría</remarks>
        /// <response code="200">Si la operación es exitosa retorna mensaje Ok.</response>
        [HttpPost("/producto")]
        public String Save(Producto producto)
        {
            return oService.SaveProducto(producto);
        }

        /// <summary>
        /// Guardar nueva categoría.
        /// </summary>
        /// <returns>Retorna mensaje con condición de la operación.</returns>
        /// <remarks>Metodo requiere registro de categoría</remarks>
        /// <response code="200">Si la operación es exitosa retorna mensaje Ok.</response>
        [HttpPut("/producto")]
        public String Update(Producto producto)
        {
            return oService.UpdateProducto(producto);
        }

        /// <summary>
        /// Guardar nueva categoría.
        /// </summary>
        /// <returns>Retorna mensaje con condición de la operación.</returns>
        /// <remarks>Metodo requiere registro de categoría</remarks>
        /// <response code="200">Si la operación es exitosa retorna mensaje Ok.</response>
        [HttpDelete("/producto")]
        public String Delete(Producto producto)
        {
            return oService.DeleteProducto(producto);
        }

        /// <summary>
        /// Obtenemos todas las categorías.
        /// </summary>
        /// <returns>Coleccion de categorías.</returns>
        /// <remarks>Metodo no requiere parametros</remarks>
        /// <response code="200">Si la operación es exitosa se listan las categorías.</response>
        [HttpGet("/codigoproducto")]
        public async Task<string> GetCodigo()
        {
            return await oService.ListCodigo();
        }
    }
}
