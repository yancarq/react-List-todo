import React, { useState, useEffect } from "react";

//Todo List
export function Home() {
	const url = "https://assets.breatheco.de/apis/fake/todos/user/yancarq";

	const [listTodo, setListTodo] = useState([]);

	useEffect(() => {
		CreateUserApi();
		GetTodoList();
	}, []);

	useEffect(() => {
		CreateUserApi();
		GetTodoList();

		async function UpdateTodolist() {
			console.log(listTodo);
			console.log(listTodo.length + " -- ");
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
					console.log(data);
				})
				.catch(function(error) {
					//manejo de errores
					console.log("error", error.message);
					console.log("Error");
				});
		}

		UpdateTodolist();
	});

	function AddTodoList(evento) {
		let valor = evento.target.value;
		if (valor != "") {
			let task = {
				label: valor,
				done: false
			};
			setListTodo(listTodo => listTodo.concat(task));
			evento.target.value = "";
			console.log(listTodo.length);
		} else {
			alert("Santo guacamole! Debe ingresar una tarea.!!!");
		}
	}

	function EventEnter(evento) {
		if (evento.key === "Enter" || evento.keyCode === 13) {
			AddTodoList(evento);
			console.log(listTodo.length + " -- ");
			//UpdateTodolist();
		}
	}

	function DeleteTodo(posicion) {
		let lista = listTodo;
		//	lista.splice(posicion, 1);
		lista[posicion].done = true;
		setListTodo(listTodo => lista.concat());
		console.log(lista);
	}

	//Conectar a la API Fetch
	function CreateUserApi() {
		fetch(url, {
			method: "POST",
			body: [],
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
		console.log(listTodo);

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
				console.log(data);
			})
			.catch(function(error) {
				//manejo de errores
				console.log("error", error.message);
				console.log("Error");
			});
	}

	function GetTodoList() {
		fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => resp.json())
			.then(data => {
				let listaResultado = data.filter(elem => elem.done == false);
				console.log(listaResultado);
				setListTodo(listTodo => listaResultado);
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
							placeholder="Agregar tareas por hacer!!!"
							// onBlur={e => AgregarTodoLista(e)}
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
