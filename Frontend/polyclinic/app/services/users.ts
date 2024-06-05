
export interface UserRequest {
    login: string;
    password: string;
    surname: string;
    name: string;
    patronymic: string;
    email: string;
  }
  
  export const getUserToken = async (userRequest: UserRequest) => {
    const response = await fetch("https://localhost:7142/Users/authorization", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userRequest),
    });
  
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Ошибка при получении токена: ${error}`);
    }
  
    const tokenResponse = await response.json();
    return tokenResponse;
  };
  
  export const createUser = async (userRequest: UserRequest) => {
    const response = await fetch("https://localhost:7142/Users/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userRequest),
    });
  };

  export const updateUser = async (id: string, userRequest: UserRequest) => {
    await fetch(`https://localhost:7142/Users/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(userRequest),
    });   
};

export const deleteUser = async (id: string) => {
    await fetch(`https://localhost:7142/Users/${id}`, {
        method: "DELETE",
    });   
};

export const getAllUsers = async () => {
  const response = await fetch("https://localhost:7142/Users");

  return response.json();
};
  