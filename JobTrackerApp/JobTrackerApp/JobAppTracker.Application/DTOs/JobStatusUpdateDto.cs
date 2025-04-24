using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobAppTracker.Application.DTOs
{
    public class JobStatusUpdateDto
    {
        public string Status { get; set; }
        public DateTime DateApplied { get; set; }
    }
}
