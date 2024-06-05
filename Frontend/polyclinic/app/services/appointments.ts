import { token } from "../autorization/page";

export interface AppointmentRequest {
    dateTime: Date
    patientTurnOut: string;
    result: string;
    patient_Id: string;
    patientSNP: string;
    doctor_Id: string;
    doctorSNP: string;
}

export const getAllAppointments = async () => {
  try {
    const response = await fetch("https://localhost:7142/Appointments", {
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

export const createAppointment = async (appointmentRequest: AppointmentRequest) => {
  await fetch("https://localhost:7142/Appointments", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(appointmentRequest),
  });
};

export const updateAppointment = async (id: string, appointmentRequest: AppointmentRequest) => {
  await fetch(`https://localhost:7142/Appointments/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(appointmentRequest),
  });
};

export const deleteAppointment = async (id: string) => {
  await fetch(`https://localhost:7142/Appointments/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};