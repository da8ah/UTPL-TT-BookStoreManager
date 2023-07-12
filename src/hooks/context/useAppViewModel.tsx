import { useState } from "react";
import Admin from "../../model/core/entities/Admin";
import BillingInfo from "../../model/core/entities/BillingInfo";
import Card from "../../model/core/entities/Card";
import { CardTransaction } from "../../model/core/entities/CardTransaction";
import Cart from "../../model/core/entities/Cart";
import Client from "../../model/core/entities/Client";
import StockBook from "../../model/core/entities/StockBook";
import ToBuyBook from "../../model/core/entities/ToBuyBook";
import GestionDeAdmin from "../../model/core/usecases/admin/GestionDeAdmin";
import GestionDeLibros from "../../model/core/usecases/admin/GestionDeLibros";
import GestionDeTransacciones from "../../model/core/usecases/admin/GestionDeTransacciones";
import LocalService from "../../model/services/LocalService";
import RemoteService from "../../model/services/RemoteService";

export default function useAppViewModel() {
    const [vimo] = useState<AppViewModel>(AppViewModel.getInstance());
    return { vimo }
}

class AppViewModel {

    // Singleton
    private static instance: AppViewModel | null = null;
    static getInstance() {
        if (!AppViewModel.instance) AppViewModel.instance = new AppViewModel();
        return AppViewModel.instance;
    }

    // STATE
    private draft = new StockBook('', '', '', '', '', '', '');
    private books: StockBook[] = []
    private transactions: CardTransaction[] = []
    private user: Admin = new Admin('', '', '', '', '');

    public createDraft() {
        const date = Intl.DateTimeFormat("ec", {
            day: "2-digit", month: "2-digit", year: "numeric",
        }).format(new Date)
        this.draft = new StockBook('', '', '', '', date, date, '')
    }

    public createDraftByISBN(isbn: string) {
        const book = this.books.find((book) => book.getIsbn() === isbn)
        if (book !== undefined) this.draft = Cloner.stockBook(book)
        // if (book !== undefined) this.draft = book
    }

    public getDraft() {
        return this.draft
    }

    public getBooks() {
        return this.books
    }

    public getTransactions() {
        return this.transactions
    }

    public getUser() {
        return this.user
    }

    // SERVICES
    private localService: LocalService = new LocalService()
    private remoteService: RemoteService = new RemoteService()
    private constructor() {
        this.setService()
    }
    public async setService() {
        this.remoteService.setToken(await this.localService.obtenerTokenAlmacenado() || '')
    }

    async login(admin?: Admin) {
        try {
            const user = admin === undefined ?
                await GestionDeAdmin.iniciarSesionConToken(this.remoteService, this.localService)
                :
                await GestionDeAdmin.iniciarSesionConUserPassword(this.remoteService, this.localService, new Admin(admin.getUser(), '', '', '', admin.getPassword()))
            if (user !== undefined) {
                this.user = user
                this.setService()
                await this.queryBooksFromService()
                return true
            }
            return false
        } catch (error) {
            console.error(error)
            return false
        }
    }

    async queryBooksFromService() {
        if (this.remoteService === undefined) return
        this.books = await GestionDeLibros.listarCatalogoDeLibrosEnStock(this.remoteService)
    }
    async queryTransactionsFromService() {
        if (this.remoteService === undefined) return
        this.transactions = (await GestionDeTransacciones.listarTodasLasTransacciones(this.remoteService)) as CardTransaction[]
    }

    async saveBook() {
        if (this.remoteService === undefined) return
        return GestionDeLibros.crearLibro(this.remoteService, this.draft)
    }
    async updateBook(bookISBN: string) {
        if (this.remoteService === undefined) return

        if (bookISBN === this.draft.getIsbn())
            return GestionDeLibros.actualizarLibro(this.remoteService, this.draft)

        const original = this.books.find(book => book.getIsbn() === bookISBN)
        return GestionDeLibros.actualizarLibro(this.remoteService, this.draft, original)
    }
    async deleteBook(bookISBN: string) {
        if (this.remoteService === undefined) return
        const book = this.books.find(book => book.getIsbn() === bookISBN)
        return book && GestionDeLibros.eliminarLibro(this.remoteService, book)
    }
}

class Cloner {
    public static stockBook(stockBook: StockBook) {
        return new StockBook(
            stockBook.getIsbn(),
            stockBook.getImgRef(),
            stockBook.getTitle(),
            stockBook.getAuthor(),
            stockBook.getReleaseDate(),
            stockBook.getCreatedDate(),
            stockBook.getDescription(),
            stockBook.getGrossPricePerUnit(),
            stockBook.isInOffer(),
            stockBook.getDiscountPercentage(),
            stockBook.itHasIva(),
            stockBook.getStock(),
            stockBook.isVisible(),
            stockBook.isRecommended(),
            stockBook.isBestSeller(),
            stockBook.isRecent(),
        );
    }
}

export const stockBooks = [
    new StockBook(
        "9780141988511",
        "https://azure.blob.url.jpg",
        "12 Rules for Life: An Antidote to Chaos",
        "Jordan Peterson",
        "12/01/2018",
        "10/01/2023",
        "JBP's BestSeller",
        15.99,
        true,
        10,
        false,
        100,
        true,
        true,
        true,
        false,
    ), new StockBook(
        "9789584293978",
        "https://azure.blob.url.jpg",
        "12 More Rules for Life: Beyond Order",
        "HIRR SEBASTIAN",
        "12/01/2018",
        "10/01/2023",
        "The most influential public intellectual in the Western world right now.",
        25,
        true,
        52,
        false,
        100,
        true,
        true,
        true,
        false,
    ), new StockBook(
        "9789584293930",
        "https://azure.blob.url.jpg",
        "12 More Rules for Life: Beyond Order",
        "ROUSSEAU",
        "12/01/2018",
        "10/01/2023",
        "The most influential public intellectual in the Western world right now.",
        30,
        true,
        52,
        false,
        100,
        true,
        true,
        true,
        false,
    ), new StockBook(
        "9789584293934",
        "https://azure.blob.url.jpg",
        "12 More Rules for Life: Beyond Order",
        "GOLEMAN DANIEL",
        "12/01/2018",
        "10/01/2023",
        "The most influential public intellectual in the Western world right now.",
        34,
        true,
        52,
        false,
        100,
        true,
        true,
        true,
        false,
    ), new StockBook(
        "9789584293941",
        "https://azure.blob.url.jpg",
        "12 More Rules for Life: Beyond Order",
        "DC COMICS",
        "12/01/2018",
        "10/01/2023",
        "The most influential public intellectual in the Western world right now.",
        41,
        true,
        52,
        false,
        100,
        true,
        true,
        true,
        false,
    ), new StockBook(
        "9789584291999",
        "https://azure.blob.url.jpg",
        "12 More Rules for Life: Beyond Order",
        "Aristóteles",
        "12/01/2018",
        "10/01/2023",
        "The most influential public intellectual in the Western world right now.",
        19.99,
        true,
        52,
        false,
        100,
        true,
        true,
        true,
        false,
    ), new StockBook(
        "9789584292830",
        "https://azure.blob.url.jpg",
        "12 More Rules for Life: Beyond Order",
        "Jordan B. Peterson",
        "12/01/2018",
        "10/01/2023",
        "The most influential public intellectual in the Western world right now.",
        28.30,
        true,
        52,
        false,
        100,
        true,
        true,
        true,
        false,
    )
]



const billingInfo = new BillingInfo("tiber", "1000000001", "Loja", "Loja", "000", "Principal y Secundaria");
const client = new Client("tiber", "da8ah", "tiber@email.com", "+593000000001", "tiber", billingInfo);
client.setCards([new Card("da8ah", "0000", "123", new Date().toLocaleDateString())]);
const toBuyBook = new ToBuyBook(
    stockBooks[0].getIsbn(),
    stockBooks[0].getImgRef(),
    stockBooks[0].getTitle(),
    stockBooks[0].getAuthor(),
    stockBooks[0].getReleaseDate(),
    stockBooks[0].getGrossPricePerUnit(),
    stockBooks[0].isInOffer(),
    stockBooks[0].getDiscountPercentage(),
    stockBooks[0].itHasIva(),
    1,
);

const cart = new Cart([toBuyBook]);

const cardTransactions = [
    new CardTransaction(
        "id-1",
        client.getCards()[0].getCardNumber(),
        client.getUser(),
        client.getName(),
        client.getEmail(),
        client.getMobile(),
        new Date().toLocaleDateString(),
        cart.getTotalPrice(),
        cart
    ),
    new CardTransaction(
        "id-2",
        client.getCards()[0].getCardNumber(),
        client.getUser(),
        client.getName(),
        client.getEmail(),
        client.getMobile(),
        new Date().toLocaleDateString(),
        cart.getTotalPrice(),
        cart
    ),
    new CardTransaction(
        "ffdd",
        client.getCards()[0].getCardNumber(),
        client.getUser(),
        client.getName(),
        client.getEmail(),
        client.getMobile(),
        new Date().toLocaleDateString(),
        cart.getTotalPrice(),
        cart
    ),
]