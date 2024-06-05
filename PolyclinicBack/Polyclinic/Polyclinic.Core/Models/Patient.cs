using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Polyclinic.Core.Models
{
    public class Patient
    {
        public Patient(Guid id, string surname, string name, string patronymic, DateTime dateBirth, Guid region_Id)
        {
            Id = id;
            Surname = surname;
            Name = name;
            Patronymic = patronymic;
            DateBirth = dateBirth;
            Region_Id = region_Id;  
        }

        public Guid Id { get; }
        public string Surname { get; } = string.Empty;
        public string Name { get; } = string.Empty;
        public string Patronymic { get; } = string.Empty;
        public DateTime DateBirth { get; } = DateTime.MinValue;
        public Guid Region_Id { get; }
        public string TitleRegion { get; set; } = string.Empty;

    }
}
