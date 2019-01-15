using System.Collections.Generic;

namespace HL.Diners.Api.Dto
{
    public class BucketDto : Dto
    {
        public string Name { get; set; }
        public int Target { get; set; }
        public List<EntryDto> Entries { get; set; }
    }
}