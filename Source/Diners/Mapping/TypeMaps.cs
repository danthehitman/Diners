using AutoMapper;
using HL.Diners.Api.Dto;
using HL.Diners.Core.Model;

namespace HL.Diners.Api.Mapping
{
    public class TypeMaps : Profile
    {
        public TypeMaps()
        {
            CreateMap<PostCycleDto, Cycle>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.Created, opt => opt.Ignore())
                .ForMember(dest => dest.Modified, opt => opt.Ignore());
        }
    }
}
