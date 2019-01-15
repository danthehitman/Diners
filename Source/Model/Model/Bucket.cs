using System.Collections.Generic;

namespace HL.Diners.Core.Model
{
    public class Bucket : Entity
    {
        public string Name { get; set; }
        public int Target { get; set; }
        public List<Entry> Entries { get; set; }
    }
}