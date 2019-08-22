using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using ComicHero.Core.SharedKernel;

namespace ComicHero.Core.Interfaces
{
    public interface IRepository
    {
        T GetById<T>(int id) where T : BaseEntity;
        Task<T> GetByIdAsync<T>(int id) where T : BaseEntity;
        List<T> List<T>() where T : BaseEntity;
        Task<List<T>> LisAsync<T>() where T : BaseEntity;
        T Add<T>(T entity) where T : BaseEntity;
        Task<T> AddAsync<T>(T entity) where T : BaseEntity;
        void Update<T>(T entity) where T : BaseEntity;
        Task<bool> UpdateAsync<T>(T entity) where T : BaseEntity;
        void Delete<T>(T entity) where T : BaseEntity;
        void DeleteById<T>(int id) where T : BaseEntity;
        Task<bool> DeleteAsync<T>(T entity) where T : BaseEntity;
        Task<bool> DeleteByIdAsync<T>(int id) where T : BaseEntity;
    }
}
