import React, { useState, useEffect } from "react";

//Todo List
export function Home() {
	const url = "https://assets.breatheco.de/apis/fake/todos/user/yancarq";
	let estado = false;
	const [listTodo, setListTodo] = useState([]);
	const [valueInput, setValueInput] = useState("");

	useEffect(() => {
		CreateUserApi();
		GetTodoList();
	}, []);

	useEffect(() => {
		UpdateTodolist();
	}, [valueInput]);

	const AddTodoList = task => setListTodo(listTodo => listTodo.concat(task));

	function EventEnter(evento) {
		if (evento.key === "Enter" || evento.keyCode === 13) {
			let valor = valueInput;
			if (valor != "") {
				let task = {
					label: valor,
					done: false
				};
				estado = true;
				setValueInput("");
				AddTodoList(task);
			} else {
				alert("Santo guacamole! Debe ingresar una tarea.!!!");
			}
		}
	}

	function DeleteTodo(posicion) {
		let lista = listTodo;
		lista[posicion].done = true;
		setListTodo(listTodo => lista.concat());

		fetch(url, {
			method: "PUT",
			body: JSON.stringify(listTodo),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => resp.json())
			.then(data => {
				GetTodoList();
			})
			.catch(function(error) {
				//manejo de errores
				console.log("error", error.message);
				console.log("Error");
			});
	}

	//Conectar a la API Fetch
	async function CreateUserApi() {
		let result = await fetch(url, {
			method: "POST",
			body: "[]",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => resp.json())
			.then(data => {
				console.log(data);
			})
			.catch(function(error) {
				//manejo de errores
				console.log("error", error.message);
				console.log("Error");
			});
	}

	function UpdateTodolist() {
		fetch(url, {
			method: "PUT",
			body: JSON.stringify(listTodo),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => resp.json())
			.then(data => {
				GetTodoList();
			})
			.catch(function(error) {
				//manejo de errores
				console.log("error", error.message);
				console.log("Error");
			});
	}

	async function GetTodoList() {
		let result = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => resp.json())
			.then(data => {
				let listaResultado = [];
				setListTodo(listTodo =>
					data.filter(elem => elem.done == false)
				);
			})
			.catch(function(error) {
				//manejo de errores
				console.log("error", error.message);
				console.log("Error");
			});
	}

	function DrawTodoList() {
		const li = listTodo.map((value, index) => {
			return (
				<li className="list-group-item" key={index}>
					{value.label}
					<button
						type="button"
						className="close text-danger"
						aria-label="Close"
						onClick={() => DeleteTodo(index)}>
						<span aria-hidden="true">&times;</span>
					</button>
				</li>
			);
		});

		return (
			<div>
				<ul className="list-group">{li}</ul>
			</div>
		);
	}

	return (
		<>
			<div className="container">
				<div className="text-center mt-5">
					<h1 className="display-2 alert alert-primary">To Dos</h1>
				</div>
				<div className="card">
					<div className="card-body">
						<input
							type="text"
							className="form-control"
							value={valueInput}
							placeholder="Agregar tareas por hacer!!!"
							onChange={e => setValueInput(e.target.value)}
							onKeyUp={e => EventEnter(e)}
						/>
						<DrawTodoList />
						<p className="text-secondary mt-3">
							{listTodo.length} Item left
						</p>
					</div>
				</div>
				<div className="panelFootFirst"></div>
				<div className="panelFootSecond"></div>
			</div>
		</>
	);
}

// function CreateTodoList() {
// 	fetch(url, {
// 		method: "POST",
// 		body: [],
// 		headers: {
// 			"Content-Type": "application/json"
// 		}
// 	})
// 		.then(resp => {
// 			console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
// 			console.log(resp.status); // el código de estado = 200 o código = 400 etc.
// 			console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
// 			return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
// 		})
// 		.then(data => {
// 			//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
// 			console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
// 		})
// 		.catch(error => {
// 			//manejo de errores
// 			console.log(error);
// 		});
// }

function DeleteTodoList() {}

// fetch(url, {
// 	method: "POST",
// 	body: JSON.stringify(todos),
// 	headers: {
// 		"Content-Type": "application/json"
// 	}
// })
// 	.then(resp => {
// 		console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
// 		console.log(resp.status); // el código de estado = 200 o código = 400 etc.
// 		console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
// 		return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
// 	})
// 	.then(data => {
// 		//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
// 		console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
// 	})
// 	.catch(error => {
// 		//manejo de errores
// 		console.log(error);
// 	});
