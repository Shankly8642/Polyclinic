import { token } from "../autorization/page";

export interface DoctorRequest {
    surname: string;
    name: string;
    patronymic: string;
    receptionHours: string;
    region_Id: string;
    titleRegion: string;
    department_Id: string;
    titleDepartment: string;
}

export const getAllDoctors = async () => {
  try {
    const response = await fetch("https://localhost:7142/Doctors", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Ошибка авторизации. Пожалуйста, авторизуйтесь.");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createDoctor = async (doctorRequest: DoctorRequest) => {
  await fetch("https://localhost:7142/Doctors", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(doctorRequest),
  });
};

export const updateDoctor = async (id: string, doctorRequest: DoctorRequest) => {
  await fetch(`https://localhost:7142/Doctors/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(doctorRequest),
  });
};

export const deleteDoctor= async (id: string) => {
  await fetch(`https://localhost:7142/Doctors/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};