namespace Polyclinic.Core.Models
{
    public class Department
    {
        private Department(Guid id, string title)
        {
            Id = id;
            Title = title; 
        }
        public Guid Id { get; } 
        public string Title { get; } = string.Empty;

        public static (Department department, string error) Create(Guid guid, string title)
        {
            string error = string.Empty;

            if (string.IsNullOrEmpty(title))
            {
                error = "Поле \"Наименование\" не заполнено";
            }

            Department department = new Department(guid, title); 

            return (department, error);
        }
    }
}
