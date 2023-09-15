import styled from "@emotion/styled";
import Error from "./Error";
import useSelectMonedas from "../hooks/useSelectMonedas";
import { monedas } from "../data/monedas.js";
import { useEffect, useState } from "react";

const InputSubmit = styled.input`
	background-color: #9497ff;
	border: none;
	width: 100%;
	padding: 10px;
	color: #fff;
	font-weight: 700;
	text-transform: uppercase;
	font-size: 20px;
	border-radius: 5px;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #7a7dfe;
		cursor: pointer;
	}
`;

const Formulario = ({ setMonedas }) => {
	const [criptos, setCriptos] = useState([]);

	const [moneda, SelectMonedas] = useSelectMonedas(
		"Elije tu Moneda",
		monedas
	);
	const [cripto, SelectCriptos] = useSelectMonedas(
		"Elije tu Criptomoneda",
		criptos
	);
	const [error, setError] = useState(false);

	useEffect(() => {
		const consultarAPI = async () => {
			const url =
				"https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
			const respuesta = await fetch(url);
			const resultado = await respuesta.json();

			const arrayCriptos = resultado.Data.map((cripto) => {
				const objeto = {
					id: cripto.CoinInfo.Name,
					nombre: cripto.CoinInfo.FullName,
				};
				return objeto;
			});
			setCriptos(arrayCriptos);
		};
		consultarAPI();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		if ([moneda, cripto].includes("")) {
			setError(true);
			setTimeout(() => {
				setError(false);
			}, 3000);
			return;
		}

		setError(false);
		setMonedas({
			moneda,
			cripto,
		});
	};

	return (
		<>
			{error ? <Error>Todos los campos son obligatorios</Error> : null}
			<form onSubmit={handleSubmit}>
				<SelectMonedas />
				<SelectCriptos />

				<InputSubmit type="submit" value="Cotizar" />
			</form>
		</>
	);
};

export default Formulario;
