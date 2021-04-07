import React, { useState } from "react";

//Todo List
export function Home() {
	const [listTodo, setListTodo] = useState([]);

	function EventEnter(evento) {
		if (evento.key === "Enter" || evento.keyCode === 13) {
			AddTodoList(evento);
		}
	}
	function AddTodoList(evento) {
		let valor = evento.target.value;
		if (valor != "") {
			setListTodo(listTodo => listTodo.concat(valor));
			evento.target.value = "";
		} else {
			alert("Santo guacamole! Debe ingresar una tarea.!!!");
		}
	}

	function DeleteTodo(posicion) {
		let lista = listTodo;
		console.log(lista);

		lista.splice(posicion, 1);
		console.log(lista);

		setListTodo(listTodo => lista.concat());
	}

	function DrawTodoList() {
		const li = listTodo.map((value, index) => {
			return (
				<li className="list-group-item" key={index}>
					{value}
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
