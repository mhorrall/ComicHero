using System;
using System.Collections.Generic;
using System.Text;
using ComicHero.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace ComicHero.Infrastructure.Data
{
    public class ComicHeroContext: DbContext
    {
        public ComicHeroContext(DbContextOptions<ComicHeroContext> options) : base(options)
        {
            
        }

        public DbSet<Comic> Comics { get; set; }
    }
}
