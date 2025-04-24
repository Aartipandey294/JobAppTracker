using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JobAppTracker.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace JobAppTracker.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<JobApplication> JobApplications { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}
