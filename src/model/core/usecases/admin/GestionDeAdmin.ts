import Admin from "../../entities/Admin";
import IPersistenciaCuenta, { IPersistenciaCuentaLocal } from "../../ports/persistencia/IPersistenciaCuenta";

export default class GestionDeAdmin {
	public static async iniciarSesionConUserPassword(iPersistenciaCuenta: IPersistenciaCuenta, iPersistenciaCuentaLocal: IPersistenciaCuentaLocal, admin: Admin): Promise<Admin | undefined> {
		const result = await iPersistenciaCuenta.iniciarSesion(new Admin(admin.getUser(), "", "", "", admin.getPassword()));
		if (result === undefined || !(await iPersistenciaCuentaLocal.almacenarTokenEnLocal(result.token))) return
		return result.user
	}

	public static async iniciarSesionConToken(iPersistenciaCuenta: IPersistenciaCuenta, iPersistenciaCuentaLocal: IPersistenciaCuentaLocal): Promise<Admin | undefined> {
		const token = await iPersistenciaCuentaLocal.obtenerTokenAlmacenado()
		return await iPersistenciaCuenta.iniciarSesionConToken(token)
	}
}
