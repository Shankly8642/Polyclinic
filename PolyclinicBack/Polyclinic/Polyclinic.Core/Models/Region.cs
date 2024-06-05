
using System;

namespace Polyclinic.Core.Models
{
    public class Region
    {
        private Region(Guid id, string title)
        {
            Id = id;
            Title = title;
        }
        public Guid Id { get;  }
        public string Title { get; } = string.Empty;

        public static (Region region, string error) Create(Guid id, string title)
        {
            string error = string.Empty;

            if (string.IsNullOrEmpty(title))
            {
                error = "Поле \"Наименование\" не заполнено";
            }

            Region region = new Region(id, title);

            return (region, error);
        }
    }
}
