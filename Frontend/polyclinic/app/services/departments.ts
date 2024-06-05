export interface DepartmentRequest {
    title: string;
}

export const getAllDepartments = async () => {
    const response = await fetch("https://localhost:7142/Departments");

    return response.json();
};

export const createDepartment = async (departmentRequest: DepartmentRequest) => {
    await fetch("https://localhost:7142/Departments", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(departmentRequest),
    });
};

export const updateDepartment = async (id: string, departmentRequest: DepartmentRequest) => {
    await fetch(`https://localhost:7142/Departments/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(departmentRequest),
    });   
};

export const deleteDepartment = async (id: string) => {
    await fetch(`https://localhost:7142/Departments/${id}`, {
        method: "DELETE",
    });   
};