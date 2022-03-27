using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    public class DishController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public DishController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                select DishId, DishName, DishPrice, ServingTime, DishPhotoFile from dbo.Dish
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
        public JsonResult Post(Dish dish)
        {
            string query = @"
                    insert into dbo.Dish 
                    values (@DishName, @DishPrice, @ServingTime, @DishPhotoFile)
                ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("UniverProjCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@DishName", dish.DishName);
                    myCommand.Parameters.AddWithValue("@DishPrice", dish.DishPrice);
                    myCommand.Parameters.AddWithValue("@ServingTime", dish.ServingTime);
                    myCommand.Parameters.AddWithValue("@DishPhotoFile", dish.DishPhotoFile);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Successfull add");
        }

        [HttpPut]
        public JsonResult Put(Dish dish)
        {
            string query = @"
                    update dbo.Dish 
                    set DishName = @DishName, 
                    DishPrice = @DishPrice, 
                    ServingTime = @ServingTime,
                    DishPhotoFile = @DishPhotoFile
                    where DishId = @DishId
                ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("UniverProjCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@DishId", dish.DishId);
                    myCommand.Parameters.AddWithValue("@DishName", dish.DishName);
                    myCommand.Parameters.AddWithValue("@DishPrice", dish.DishPrice);
                    myCommand.Parameters.AddWithValue("@ServingTime", dish.ServingTime);
                    myCommand.Parameters.AddWithValue("@DishPhotoFile", dish.DishPhotoFile);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Successfull update");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                    delete from dbo.Dish 
                    where DishId = @DishId
                ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("UniverProjCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@DishId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Successfull delete");
        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string fileName = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + fileName;

                using(var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(fileName);
            }
            catch (Exception)
            {
                return new JsonResult("default.jpg");
            }
        }
    }
}
