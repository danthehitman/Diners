using NetTopologySuite.Geometries;

namespace HL.Diners.Api.Dto
{
    public class EntryDto : Dto
    {
        public int Ammount { get; set; }
        public string Name { get; set; }
        public string Notes { get; set; }
        public string Location { get; set; }
        public Point LocationPoint { get; set; }
    }
}
