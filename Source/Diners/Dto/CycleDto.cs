using System;
using System.Collections.Generic;

namespace HL.Diners.Api.Dto
{
    public class CycleDto : Dto
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public List<BucketDto> Planned { get; set; }
        public double Income { get; set; }
        public double SavingsTarget { get; set; }
    }
}
