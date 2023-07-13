import Admin from "../model/core/entities/Admin";
import { CardTransaction } from "../model/core/entities/CardTransaction";
import Cart from "../model/core/entities/Cart";
import StockBook from "../model/core/entities/StockBook";
import ToBuyBook from "../model/core/entities/ToBuyBook";


export enum AdminEnum {
	USER = "user",
	NAME = "name",
	EMAIL = "email",
	MOBILE = "mobile",
	PASSWORD = "password",
}

export class AdminConverter {
	public static adminToJSON(admin: Admin): JSON {
		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		const json: any = {};
		if (admin.getUser() !== undefined) json[AdminEnum.USER] = admin.getUser().toLowerCase();
		if (admin.getName() !== undefined) json[AdminEnum.NAME] = admin.getName();
		if (admin.getEmail() !== undefined) json[AdminEnum.EMAIL] = admin.getEmail();
		if (admin.getMobile() !== undefined) json[AdminEnum.MOBILE] = admin.getMobile();
		if (admin.getPassword() !== undefined) json[AdminEnum.PASSWORD] = admin.getPassword();
		return json;
	}

	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	public static jsonToAdmin(req: any): Admin {
		const { user, name, email, mobile, password } = req;
		const admin = new Admin(user, name, email, mobile, password);
		return admin;
	}
}

export enum StockBookEnum {
	ISBN = "isbn",
	IMG_REF = "imgRef",
	TITLE = "title",
	AUTHOR = "author",
	RELEASE_DATE = "releaseDate",
	CREATED_DATE = "createdDate",
	DESCRIPTION = "description",
	GROSS_PRICE_PER_UNIT = "grossPricePerUnit",
	IN_OFFER = "inOffer",
	DISCOUNT_PERCENTAGE = "discountPercentage",
	HAS_IVA = "hasIva",
	IVA_PERCENTAGE = "ivaPercentage",
	STOCK = "stock",
	VISIBLE = "visible",
	RECOMMENDED = "recommended",
	BEST_SELLER = "bestSeller",
	RECENT = "recent",
}

export class BookConverter {
	public static bookToJSON(stockBook: StockBook): JSON {
		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		const json: any = {};
		if (stockBook.getIsbn() !== undefined) json[StockBookEnum.ISBN] = stockBook.getIsbn();
		if (stockBook.getImgRef() !== undefined) json[StockBookEnum.IMG_REF] = stockBook.getImgRef();
		if (stockBook.getTitle() !== undefined) json[StockBookEnum.TITLE] = stockBook.getTitle();
		if (stockBook.getAuthor() !== undefined) json[StockBookEnum.AUTHOR] = stockBook.getAuthor();
		if (stockBook.getReleaseDate() !== undefined) json[StockBookEnum.RELEASE_DATE] = stockBook.getReleaseDate();
		if (stockBook.getCreatedDate() !== undefined) json[StockBookEnum.CREATED_DATE] = stockBook.getCreatedDate();
		if (stockBook.getDescription() !== undefined) json[StockBookEnum.DESCRIPTION] = stockBook.getDescription();
		if (stockBook.getGrossPricePerUnit() !== undefined) json[StockBookEnum.GROSS_PRICE_PER_UNIT] = stockBook.getGrossPricePerUnit();
		if (stockBook.isInOffer() !== undefined) json[StockBookEnum.IN_OFFER] = stockBook.isInOffer();
		if (stockBook.getDiscountPercentage() !== undefined) json[StockBookEnum.DISCOUNT_PERCENTAGE] = stockBook.getDiscountPercentage();
		if (stockBook.itHasIva() !== undefined) json[StockBookEnum.HAS_IVA] = stockBook.itHasIva();
		if (stockBook.getIvaPercentage() !== undefined) json[StockBookEnum.IVA_PERCENTAGE] = stockBook.getIvaPercentage();
		if (stockBook.getStock() !== undefined) json[StockBookEnum.STOCK] = stockBook.getStock();
		if (stockBook.isVisible() !== undefined) json[StockBookEnum.VISIBLE] = stockBook.isVisible();
		if (stockBook.isRecommended() !== undefined) json[StockBookEnum.RECOMMENDED] = stockBook.isRecommended();
		if (stockBook.isBestSeller() !== undefined) json[StockBookEnum.BEST_SELLER] = stockBook.isBestSeller();
		if (stockBook.isRecent() !== undefined) json[StockBookEnum.RECENT] = stockBook.isRecent();
		return json;
	}

	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	public static jsonToBook(req: any): StockBook {
		// All Attrs from body
		const { isbn, imgRef, title, author, releaseDate, createdDate, description, grossPricePerUnit, inOffer, discountPercentage, hasIva, stock, visible, recommended, bestSeller, recent } = req;
		// NewStockBook with all Attrs
		return new StockBook(isbn, imgRef, title, author, releaseDate, createdDate, description, grossPricePerUnit, inOffer, discountPercentage, hasIva, stock, visible, recommended, bestSeller, recent);
	}
}

export enum TransactionEnum {
	ID = "id",
	CARD_NUMBER = "cardNumber",
	DATE = "date",
	PAYMENT = "payment",
	CART = "cart",
}

export class TransactionConverter {
	static cardTransactionToJSON(cardTransaction: CardTransaction): JSON {
		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		const json: any = {};
		if (cardTransaction.getId() !== undefined) json[TransactionEnum.ID] = cardTransaction.getId();
		if (cardTransaction.getCardNumber() !== undefined) json[TransactionEnum.CARD_NUMBER] = cardTransaction.getCardNumber();
		if (cardTransaction.getDate() !== undefined) json[TransactionEnum.DATE] = cardTransaction.getDate();
		if (cardTransaction.getPayment() !== undefined) json[TransactionEnum.PAYMENT] = cardTransaction.getPayment();
		if (cardTransaction.getCart() !== undefined) json[TransactionEnum.CART] = JSON.parse(JSON.stringify(cardTransaction.getCart()));
		return json;
	}

	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	public static jsonToCardTransaction(req: any): CardTransaction {
		const { id, cardNumber, user, name, email, mobile, date, payment, cart } = req;
		// No se utilizan porque se recalculan los valores
		const { discountCalc, ivaCalc, subtotal, totalPrice, toBuyBooks } = cart;

		const books = toBuyBooks.map(
			// rome-ignore lint/suspicious/noExplicitAny: <explanation>
			(book: any) => new ToBuyBook(book.isbn, book.imgRef, book.title, book.author, book.releaseDate, book.grossPricePerUnit, book.inOffer, book.discountPercentage, book.hasIva, book.cant),
		);

		// Valores recalculados automáticamente
		const newCart = new Cart(books);

		return new CardTransaction(id, cardNumber, user, name, email, mobile, date, payment, newCart);
	}
}
