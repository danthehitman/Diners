using System;
using System.Collections.Generic;

namespace HL.Diners.Model
{
    public class Cycle : Entity
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public List<Bucket> Planned { get; set; }
        public double Income { get; set; }
        public double SavingsTarget { get; set; }
    }
}
