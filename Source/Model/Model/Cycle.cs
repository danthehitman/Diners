using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;

namespace HL.Diners.Core.Model
{
    public class Cycle : Entity
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public List<Bucket> Expenses { get; set; }
        public double Budget { get; set; }
        public double SavingsTarget { get; set; }
        public JObject ExtendedData { get; set; }
    }
}
