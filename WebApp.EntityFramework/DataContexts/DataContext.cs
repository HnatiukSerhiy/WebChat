using Microsoft.EntityFrameworkCore;
using WebApp.EntityFramework.Entities;

namespace WebApp.EntityFramework.DataContexts
{
    public class DataContext : DbContext
    {
        public DbSet<UserEntity> Users { get; set; }
        public DbSet<SessionEntity> Sessions { set; get; }

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserEntity>().ToTable("Users");
            modelBuilder.Entity<SessionEntity>().ToTable("Sessions");
        }
    }
}
