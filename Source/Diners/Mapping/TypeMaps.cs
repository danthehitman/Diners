using AutoMapper;
using HL.Diners.Api.Dto;
using HL.Diners.Core.Model;

namespace HL.Diners.Api.Mapping
{
    public class TypeMaps : Profile
    {
        public TypeMaps()
        {
            CreateMap<Cycle, CycleDto>();
            CreateMap<Bucket, BucketDto>();
        }
    }
}
