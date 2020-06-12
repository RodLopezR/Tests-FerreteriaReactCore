using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackendFerreteria.Entity
{
    public class Categoria
    {
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Required]
        [Display(Name = "Nombre")]
        public String Nombre { get; set; }

        [Display(Name = "Estado")]
        public int Estado { get; set; }

        [Display(Name = "Registro")]
        public DateTime Registro { get; set; }
    }
}
