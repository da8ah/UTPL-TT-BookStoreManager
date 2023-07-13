import Admin from "../../entities/Admin";

export type IPersistenciaCuentaLocal = {
	almacenarTokenEnLocal(token: string): Promise<boolean>;
	obtenerTokenAlmacenado(): Promise<string | undefined>;
	eliminarTokenAlmacenado(): Promise<boolean>;
}

export default interface IPersistenciaCuenta {
	iniciarSesion(admin: Admin): Promise<{ user: Admin, token: string } | undefined>;
	iniciarSesionConToken(token?: string): Promise<Admin | undefined>;
}
