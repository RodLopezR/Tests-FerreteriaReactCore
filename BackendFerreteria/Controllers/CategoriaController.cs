using BackendFerreteria.Dao;
using BackendFerreteria.Entity;
using Microsoft.AspNetCore.Cors;
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
    [EnableCors("ReactCors")]
    public class CategoriaController : Controller
    {
        private CategoriaService oService;

        public CategoriaController(MySQLDatabase oBd)
        {
            oService = new CategoriaService(oBd.Connection);
        }

        /// <summary>
        /// Obtenemos todas las categorías.
        /// </summary>
        /// <returns>Coleccion de categorías.</returns>
        /// <remarks>Metodo no requiere parametros</remarks>
        /// <response code="200">Si la operación es exitosa se listan las categorías.</response>
        [HttpGet("/categoria")]
        public async Task<List<Categoria>> Get()
        {
            return await oService.ListCategoria();
        }

        /// <summary>
        /// Guardar nueva categoría.
        /// </summary>
        /// <returns>Retorna mensaje con condición de la operación.</returns>
        /// <remarks>Metodo requiere registro de categoría</remarks>
        /// <response code="200">Si la operación es exitosa retorna mensaje Ok.</response>
        [HttpPost("/categoria")]
        public String Complete(Categoria categoria)
        {
            return oService.SaveCategoria(categoria);
        }
    }
}
