import { token } from "../autorization/page";

export interface PatientRequest {
    surname: string;
    name: string;
    patronymic: string;
    dateBirth: Date;
    region_Id: string;
    titleRegion: string;
}

export const getAllPatients = async () => {
  try {
    const response = await fetch("https://localhost:7142/Patients", {
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

export const createPatient = async (patientRequest: PatientRequest) => {
  await fetch("https://localhost:7142/Patients", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(patientRequest),
  });
};

export const updatePatient = async (id: string, patientRequest: PatientRequest) => {
  await fetch(`https://localhost:7142/Patients/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(patientRequest),
  });
};

export const deletePatient = async (id: string) => {
  await fetch(`https://localhost:7142/Patients/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};