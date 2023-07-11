import { IPersistenciaCuentaLocal } from "../core/ports/persistencia/IPersistenciaCuenta";

export default class LocalService implements IPersistenciaCuentaLocal {
    almacenarTokenEnLocal(token: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    obtenerTokenAlmacenado(): Promise<string> {
        throw new Error("Method not implemented.");
    }
}