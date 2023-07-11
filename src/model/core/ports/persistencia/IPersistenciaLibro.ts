import StockBook from "../../entities/StockBook";

export default interface IPersistenciaLibro {
	guardarLibroNuevo(stockBook: StockBook): Promise<{ duplicado: boolean; creado: boolean }>;
	obtenerLibrosEnStock(): Promise<StockBook[]>;
	actualizarLibro(stockBook: StockBook, originalStockBookToChangeISBN?: StockBook): Promise<boolean>;
	eliminarLibro(stockBook: StockBook): Promise<boolean>;
}
