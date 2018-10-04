using System;

namespace HL.Diners.Core.Model
{
    public class Entity
    {
        public Entity()
        {
            Id = Guid.NewGuid().ToString();
        }

        public string Id { get; set; }
    }
}