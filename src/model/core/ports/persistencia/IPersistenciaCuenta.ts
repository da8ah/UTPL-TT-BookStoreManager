import Admin from "../../entities/Admin";

export type IPersistenciaCuentaLocal = {
	almacenarTokenEnLocal(token: string): Promise<boolean>;
	obtenerTokenAlmacenado(key: string): Promise<string>;
}

export default interface IPersistenciaCuenta {
	iniciarSesion(admin: Admin): Promise<{ user: Admin, token: string }>;
	iniciarSesionConToken(token: string): Promise<Admin | undefined>;
}
