namespace HL.Diners.Api.Dto
{
    public class BucketDto : Dto
    {
        public string Name { get; set; }
        public int Target { get; set; }
        public int Used { get; set; }
    }
}