import Admin from "../core/entities/Admin";
import { CardTransaction } from "../core/entities/CardTransaction";
import StockBook from "../core/entities/StockBook";
import IPersistenciaCuenta from "../core/ports/persistencia/IPersistenciaCuenta";
import IPersistenciaLibro from "../core/ports/persistencia/IPersistenciaLibro";
import IPersistenciaTransacciones from "../core/ports/persistencia/IPersistenciaTransacciones";

export default class RemoteService implements IPersistenciaCuenta, IPersistenciaLibro, IPersistenciaTransacciones {

    // USER
    iniciarSesion(admin: Admin): Promise<{ user: Admin; token: string; }> {
        throw new Error("Method not implemented.");
    }

    iniciarSesionConToken(token: string): Promise<Admin> {
        throw new Error("Method not implemented.");
    }

    // BOOKS
    guardarLibroNuevo(stockBook: StockBook): Promise<{ duplicado: boolean; creado: boolean; }> {
        throw new Error("Method not implemented.");
    }
    obtenerLibrosEnStock(): Promise<StockBook[]> {
        throw new Error("Method not implemented.");
    }
    actualizarLibro(stockBook: StockBook, originalStockBookToChangeISBN?: StockBook | undefined): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    eliminarLibro(stockBook: StockBook): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    // TRANSACTIONS
    obtenerTodasLasTransacciones(): Promise<CardTransaction[]> {
        throw new Error("Method not implemented.");
    }
}