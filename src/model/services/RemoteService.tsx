import { AdminConverter, BookConverter, TransactionConverter } from "../../utils/json.casts";
import Admin from "../core/entities/Admin";
import { CardTransaction } from "../core/entities/CardTransaction";
import StockBook from "../core/entities/StockBook";
import IPersistenciaCuenta from "../core/ports/persistencia/IPersistenciaCuenta";
import IPersistenciaLibro from "../core/ports/persistencia/IPersistenciaLibro";
import IPersistenciaTransacciones from "../core/ports/persistencia/IPersistenciaTransacciones";

export default class RemoteService implements IPersistenciaCuenta, IPersistenciaLibro, IPersistenciaTransacciones {

    private token: string
    private apiAdmin = `https://utpl-tt-bookstore.azurewebsites.net/api/admin`
    private apiBooks = `${this.apiAdmin}/books`
    private apiTransactions = `${this.apiAdmin}/transactions`

    constructor(token: string = '') {
        this.token = token
    }
    setToken(token: string) {
        this.token = token
    }

    // USER
    async iniciarSesion(admin: Admin): Promise<{ user: Admin; token: string; } | undefined> {
        try {
            let user, token
            const httpContent = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user: admin.getUser(), password: admin.getPassword() })
            };
            await fetch(`${this.apiAdmin}/login`, httpContent)
                .then((res) => {
                    token = res.headers.get("set-cookie")?.split(";")[0].split("=")[1];
                    return res.json();
                })
                .then((body) => (user = AdminConverter.jsonToAdmin(body)));
            return token && { token, user }
        } catch (error) {
            console.error(error)
            return
        }
    }

    async iniciarSesionConToken(): Promise<Admin | undefined> {
        try {
            if (this.token === '') throw Error('Error: Token was not provided!')

            let admin
            const httpContent = {
                method: "GET",
                headers: {
                    Authorization: this.token,
                },
            };
            await fetch(`${this.apiAdmin}/login`, httpContent)
                .then((res) => res.json())
                .then((body) => (admin = AdminConverter.jsonToAdmin(body)));
            return admin
        } catch (error) {
            console.error(error);
            return
        }
    }

    // BOOKS
    async guardarLibroNuevo(stockBook: StockBook): Promise<{ duplicado: boolean; creado: boolean; }> {
        try {
            if (this.token === '') throw Error('Error: Token was not provided!')

            const httpContent = {
                method: "POST",
                headers: {
                    Authorization: this.token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(stockBook),
            };
            return await fetch(this.apiBooks, httpContent).then((res) => res.json()).then((body) => body);
        } catch (error) {
            console.error(error);
            return { duplicado: false, creado: false }
        }
    }
    async obtenerLibrosEnStock(): Promise<StockBook[]> {
        try {
            if (this.token === '') throw Error('Error: Token was not provided!')

            const httpContent = {
                method: "GET",
                headers: {
                    Authorization: this.token
                }
            };
            let data: StockBook[] = await fetch(this.apiBooks, httpContent)
                .then((res) => res.json())
                .then((body) => body.map((item: StockBook) => BookConverter.jsonToBook(item)));
            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
    async actualizarLibro(stockBook: StockBook, originalStockBookToChangeISBN?: string): Promise<boolean> {
        try {
            if (this.token === '') throw Error('Error: Token was not provided!')

            const httpContent = {
                method: "PUT",
                headers: {
                    Authorization: this.token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(stockBook),
            }

            if (originalStockBookToChangeISBN) return await fetch(`${this.apiBooks}/${originalStockBookToChangeISBN}`, httpContent).then((res) => res.ok);
            return await fetch(`${this.apiBooks}/${stockBook.getIsbn()}`, httpContent).then((res) => res.ok);
        } catch (error) {
            console.error(error);
            return false;
        }
    }
    async eliminarLibro(stockBook: StockBook): Promise<boolean> {
        try {
            if (this.token === '') throw Error('Error: Token was not provided!')

            const httpContent = {
                method: "DELETE",
                headers: {
                    Authorization: this.token
                }
            };
            return await fetch(`${this.apiBooks}/${stockBook.getIsbn()}`, httpContent).then((res) => res.ok);
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    // TRANSACTIONS
    async obtenerTodasLasTransacciones(): Promise<CardTransaction[]> {
        try {
            if (this.token === '') throw Error('Error: Token was not provided!')

            const httpContent = {
                method: "GET",
                headers: {
                    Authorization: this.token
                },
            };
            let data: CardTransaction[] = await fetch(`${this.apiTransactions}`, httpContent)
                .then((res) => res.json())
                .then((body) => body.map((item: CardTransaction) => TransactionConverter.jsonToCardTransaction(item)));

            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}