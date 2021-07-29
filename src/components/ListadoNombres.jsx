import React, { useState } from 'react';
import uniqid from 'uniqid';

const ListadoNombres = () => {
    const [nombre, setNombre] = useState('');
    const [listaNombres, setListaNombres] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [id, setId] = useState('');
    const [error, setError] = useState(null);

    const addNombre = (event) => {
        event.preventDefault();
        if(!nombre.trim()) {
            setError('El campo nombre esta vacio');
            return;
        }
        const nuevoNombre = {
            id: uniqid(),
            tituloNombre: nombre
        }
        setListaNombres([...listaNombres, nuevoNombre]);
        setNombre('');
        setError(null);
    }
    const deleteNombre = (id) => {
        const nuevoArray = listaNombres.filter(item => item.id !== id);
        setListaNombres(nuevoArray);
    }
    const editar = (item) => {
        setModoEdicion(true);
        setNombre(item.tituloNombre);
        setId(item.id);
    }
    const editarNombre = (event) => {
        event.preventDefault();
        if(!nombre.trim()) {
            setError('El campo nombre esta vacio');
            return;
        }
        const nuevoArray = listaNombres.map( item => item.id === id ? {id:id, tituloNombre:nombre} : item);
        setListaNombres(nuevoArray);
        setModoEdicion(false);
        setNombre('');
        setError(null);
    }

    return (
        <div className="container">
            <h2>Aplicación CRUD Basica</h2>
            <div className="row">
                <div className="col">
                    <h2>Listado de nombres</h2>
                    <ul className="list-group">
                        {
                            listaNombres.map(item=>
                                <li key="{item.id}" className="list-group-item list-group-item-primary">
                                    {item.tituloNombre}
                                    <button 
                                        className="btn btn-danger float-end"
                                        onClick={() => {deleteNombre(item.id)}}
                                    >
                                        BORRAR
                                    </button>
                                    <button 
                                        className="btn btn-info float-end" 
                                        onClick={() => {editar(item)}}
                                    >
                                        EDITAR
                                    </button>
                                </li>
                            )
                        }
                    </ul>
                </div>
                <div className="col">
                    <h2>Formulario para añadir nombres</h2>
                    <form onSubmit={modoEdicion ? editarNombre : addNombre} className="form-group">
                        <input 
                            onChange= { (e)=> { setNombre(e.target.value) } } 
                            className="form-control mb-3" 
                            type="text" 
                            placeholder="introduce el nombre" 
                            value={nombre}
                        />
                        <input 
                            className="btn btn-info btn-block" 
                            type="submit"
                            value={modoEdicion ? 'EDITAR NOMBRE' : 'REGISTRAR NOMBRE'}
                        />
                    </form>
                    {
                        error != null ? 
                        (
                            <div className="alert alert-danger mt-4 mb-4 align-midle">
                                {error}   
                            </div>
                        ) : (
                            <div></div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default ListadoNombres;
