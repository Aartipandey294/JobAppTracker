using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JobAppTracker.Application.DTOs;

namespace JobAppTracker.Application.Interfaces
{
    public interface IJobApplicationService 
    {
        Task<IEnumerable<JobApplicationDto>> GetAllAsync();
        Task<JobApplicationDto> GetByIdAsync(int id);
        Task<JobApplicationDto> AddAsync(JobApplicationDto dto);
        Task<JobApplicationDto> UpdateStatusAsync(int id, JobStatusUpdateDto dto);
    }
}
