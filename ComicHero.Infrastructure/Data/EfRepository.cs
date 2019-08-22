using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ComicHero.Core.Interfaces;
using ComicHero.Core.SharedKernel;
using Microsoft.EntityFrameworkCore;

namespace ComicHero.Infrastructure.Data
{
    public class EfRepository : IRepository
    {
        private readonly ComicHeroContext _dbContext;

        public EfRepository(ComicHeroContext dbContext)
        {
            _dbContext = dbContext;
        }

        public T GetById<T>(int id) where T : BaseEntity
        {
            return _dbContext.Set<T>().SingleOrDefault(e => e.Id == id);
        }

        public async Task<T> GetByIdAsync<T>(int id) where T : BaseEntity
        {
            return await _dbContext.Set<T>().SingleOrDefaultAsync(e => e.Id == id);
        }

        public List<T> List<T>() where T : BaseEntity
        {
            return _dbContext.Set<T>().ToList();
        }

        public async Task<List<T>> LisAsync<T>() where T : BaseEntity
        {
            return await _dbContext.Set<T>().ToListAsync();
        }

        public T Add<T>(T entity) where T : BaseEntity
        {
            _dbContext.Set<T>().Add(entity);
            _dbContext.SaveChanges();

            return entity;
        }

        public async Task<T> AddAsync<T>(T entity) where T : BaseEntity
        {
             await _dbContext.Set<T>().AddAsync(entity);
             await _dbContext.SaveChangesAsync();

            return entity;
        }

        public void Delete<T>(T entity) where T : BaseEntity
        {
            _dbContext.Set<T>().Remove(entity);
            _dbContext.SaveChanges();
        }

        public void DeleteById<T>(int id) where T : BaseEntity
        {
            var entity = _dbContext.Set<T>().SingleOrDefault(e => e.Id == id);
            _dbContext.Set<T>().Remove(entity);
            _dbContext.SaveChanges();
        }

        public async Task<bool> DeleteAsync<T>(T entity) where T : BaseEntity
        {
            _dbContext.Set<T>().Remove(entity);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteByIdAsync<T>(int id) where T : BaseEntity
        {
            var entity = await _dbContext.Set<T>().SingleOrDefaultAsync(e => e.Id == id);
            _dbContext.Set<T>().Remove(entity);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public void Update<T>(T entity) where T : BaseEntity
        {
            _dbContext.Entry(entity).State = EntityState.Modified;
            _dbContext.SaveChanges();
        }

        public async Task<bool> UpdateAsync<T>(T entity) where T : BaseEntity
        {
            _dbContext.Entry(entity).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}
