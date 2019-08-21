using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ComicHero.Core.Entities;
using ComicHero.Web.ApiModels;

namespace ComicHero.Web.Mappings
{
    public class ComicProfile: Profile
    {
        public ComicProfile()
        {
            CreateMap<Comic, ComicDto>().ReverseMap();
        }
    }
}
