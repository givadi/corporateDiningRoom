using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using UniverProject.Models;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace UniverProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public OrderController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                select O.OrderId, O.BuyerId, E.EmployeeName, O.OrderPrice, O.OrderTime from dbo.Orders O join dbo.Employee E
                on O.BuyerId = E.EmployeeId
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("UniverProjCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }


        [HttpPost]
        public JsonResult Post(Order ord)
        {
            string query = @"
                    insert into dbo.Orders 
                    values (@BuyerId,  
                            @OrderPrice, @OrderTime)
                ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("UniverProjCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@BuyerId", ord.BuyerId);
                    myCommand.Parameters.AddWithValue("@OrderPrice", ord.OrderPrice);
                    myCommand.Parameters.AddWithValue("@OrderTime", ord.OrderTime);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Successfull add");
        }
    }
}
