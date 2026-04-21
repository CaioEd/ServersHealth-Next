const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL não está definida no .env");
  }

  const response = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error(`Erro ao fazer login: ${response.status}`);
  }

  const data: AuthResponse = await response.json();

  localStorage.setItem("token", data.token);
  document.cookie = `token=${data.token}; path=/; SameSite=Strict`;

  return data;
}

export function logout(): void {
  localStorage.removeItem("token");
  document.cookie = "token=; path=/; max-age=0";
}
