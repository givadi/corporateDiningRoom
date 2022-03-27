using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UniverProject.Models
{
    public class Order
    {
        public int OrderId { get; set; }
        public int OrderPrice { get; set; }
        public string OrderTime { get; set; }
        public int BuyerId { get; set; }
    }
}
