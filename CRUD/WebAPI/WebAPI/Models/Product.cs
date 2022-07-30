using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class Product
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? id
        {
            get;
            set;
        }

        [Display(Name = "Product name")]
        public string? productName
        {
            get;
            set;
        }

        public int? supplierID { get; set; }

        public string? quantityPerUnit { get; set; }
        public int? unitPrice { get; set; }
        public int? unitsInStock { get; set; }
        public int? unitsOnOrder { get; set; }
        public int? reorderLevel { get; set; }
        public bool? discontinued { get; set; }

    }
}