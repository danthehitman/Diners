using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;

namespace HL.Diners.Api.Dto
{
    public class CycleDto : Dto
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public List<BucketDto> Buckets { get; set; }
        public double Budget { get; set; }
        public double SavingsTarget { get; set; }
        public JObject ExtendedData { get; set; }
    }
}
