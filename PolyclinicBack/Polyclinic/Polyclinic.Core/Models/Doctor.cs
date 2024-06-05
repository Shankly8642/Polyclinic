using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Polyclinic.Core.Models
{
    public class Doctor
    {
        public Doctor(Guid id, string surname, string name, string patronymic, string receptionHours, Guid region_Id, Guid department_Id)
        {
            Id = id;
            Surname = surname;
            Name = name;
            Patronymic = patronymic;
            ReceptionHours = receptionHours;
            Region_Id = region_Id;
            Department_Id = department_Id;
        }
        public Guid Id { get; }
        public string Surname { get; } = string.Empty;
        public string Name { get; } = string.Empty;
        public string Patronymic { get; } = string.Empty;
        public string ReceptionHours { get; } = string.Empty;
        public Guid Region_Id { get; }
        public string TitleRegion { get; set; } = string.Empty;
        public Guid Department_Id { get; }
        public string TitleDepartment { get; set; } = string.Empty;

    }
}
