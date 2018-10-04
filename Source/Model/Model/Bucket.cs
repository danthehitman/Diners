namespace HL.Diners.Core.Model
{
    public class Bucket : Entity
    {
        public string Name { get; set; }
        public int Target { get; set; }
        public int Used { get; set; }
    }
}