import Transaction from "../../entities/Transaction";

export default interface IPersistenciaTransacciones {
	obtenerTodasLasTransacciones(): Promise<Transaction[]>;
}
