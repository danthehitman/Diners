using NetTopologySuite.Geometries;

namespace HL.Diners.Core.Model

{
    public class Entry : Entity
    {
        public int Ammount { get; set; }
        public string Name { get; set; }
        public string Notes { get; set; }
        public string Location { get; set; }
        public Point LocationPoint { get; set; }
    }
}
