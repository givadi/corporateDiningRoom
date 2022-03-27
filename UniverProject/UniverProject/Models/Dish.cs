using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UniverProject.Models
{
    public class Dish
    {
        public int DishId { get; set; }
        public string DishName { get; set; }
        public int DishPrice { get; set; }
        public int ServingTime{ get; set; }
        public string DishPhotoFile{ get; set; }
    }
}
