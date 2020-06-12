using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackendFerreteria.Entity
{
    public class Producto
    {
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Required]
        [Display(Name = "IdCategoria")]
        public int IdCategoria { get; set; }

        [Required]
        [Display(Name = "Codigo")]
        public string Codigo { get; set; }

        [Required]
        [Display(Name = "Nombre")]
        public string Nombre { get; set; }

        [Required]
        [Display(Name = "Precio")]
        public decimal Precio { get; set; }

        [Required]
        [Display(Name = "Stock")]
        public int Stock { get; set; }

        [Required]
        [Display(Name = "Registro")]
        public DateTime Registro { get; set; }

        [Required]
        [Display(Name = "Actualizacion")]
        public DateTime Actualizacion { get; set; }
    }
}
