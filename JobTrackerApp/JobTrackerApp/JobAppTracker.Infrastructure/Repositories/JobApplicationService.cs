using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JobAppTracker.Application.DTOs;
using JobAppTracker.Application.Interfaces;
using JobAppTracker.Domain.Models;
using JobAppTracker.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;


namespace JobAppTracker.Infrastructure.Repositories
{
    public class JobApplicationService : IJobApplicationService
    {
        private readonly AppDbContext _context;

        public JobApplicationService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<JobApplicationDto>> GetAllAsync() =>
            await _context.JobApplications
                .Select(x => new JobApplicationDto
                {
                    Id = x.Id,
                    CompanyName = x.CompanyName,
                    Position = x.Position,
                    Status = x.Status,
                    DateApplied = x.DateApplied
                })
                .ToListAsync();

        public async Task<JobApplicationDto> GetByIdAsync(int id)
        {
            var app = await _context.JobApplications.FindAsync(id);
            if (app == null) return null;

            return new JobApplicationDto
            {
                Id = app.Id,
                CompanyName = app.CompanyName,
                Position = app.Position,
                Status = app.Status,
                DateApplied = app.DateApplied
            };
        }

        public async Task<JobApplicationDto> AddAsync(JobApplicationDto dto)
        {
            var app = new JobApplication
            {
                CompanyName = dto.CompanyName,
                Position = dto.Position,
                Status = dto.Status,
                DateApplied = dto.DateApplied
            };

            _context.JobApplications.Add(app);
            await _context.SaveChangesAsync();

            dto.Id = app.Id;
            return dto;
        }

        public async Task<JobApplicationDto> UpdateStatusAsync(int id, JobStatusUpdateDto dto)
        {
            var app = await _context.JobApplications.FindAsync(id);
            if (app == null) return null;

            app.Status = dto.Status;
            app.DateApplied = dto.DateApplied;

            await _context.SaveChangesAsync();

            return new JobApplicationDto
            {
                Id = app.Id,
                CompanyName = app.CompanyName,
                Position = app.Position,
                Status = app.Status,
                DateApplied = app.DateApplied
            };
        }
    }
}
