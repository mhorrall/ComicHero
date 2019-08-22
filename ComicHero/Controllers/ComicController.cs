using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using AutoMapper;
using ComicHero.Core.Entities;
using ComicHero.Core.Interfaces;
using ComicHero.Web.ApiModels;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ComicHero.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComicController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IRepository _repository;
        private readonly IHostingEnvironment _hostingEnvironment;

        public ComicController(IMapper mapper, IRepository repository, IHostingEnvironment hostingEnvironment)
        {
            _mapper = mapper;
            _repository = repository;
            _hostingEnvironment = hostingEnvironment;
        }
        // GET: api/Comic
        [HttpGet("")]
        public async Task<IActionResult> Get([FromQuery] string title, [FromQuery] int issueNumber)
        {
            var comics = await _repository.LisAsync<Comic>();

            if (!string.IsNullOrEmpty(title))
                comics = comics.Where(c => c.Title.Contains(title)).ToList();

            if (issueNumber != 0)
                comics = comics.Where(c => c.IssueNumber == issueNumber).ToList();

            var result = _mapper.Map<List<Comic>, List<ComicDto>>(comics);

            return Ok(result);
        }


        // GET: api/Comic/Image/5
        [HttpGet("Image/{id}", Name = "GetImage")]
        public IActionResult GetImage(int id)
        {
            var comic = _repository.GetById<Comic>(id);
            if (comic == null) return NotFound();

            if (comic.Image != null && comic.Image.Length != 0) return File(comic.Image, "image/jpeg");

            // return default image if none
            var path = Path.Combine(_hostingEnvironment.ContentRootPath, "Images", "image_not_available.jpg");
            var image = System.IO.File.OpenRead(path);
            return File(image, "image/jpeg");
        }

        // GET: api/Comic/5
        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(int id)
        {
            var comic = _repository.GetById<Comic>(id);

            return Ok(_mapper.Map<ComicDto>(comic));
        }
        
        // POST: api/Comic
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ComicDto comic)
        {
            var newComic = _mapper.Map<Comic>(comic);

            var newItem = await _repository.AddAsync(newComic);

            return Ok(_mapper.Map<ComicDto>(newItem));
        }

        // PUT: api/Comic/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] ComicDto comic)
        {
            var updateComic = _mapper.Map<Comic>(comic);
        
            updateComic.Id = id;
            _repository.Update(updateComic);
            return Ok();
        }
        
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
             _repository.DeleteById<Comic>(id);

             return Ok();
        }
    }
}
