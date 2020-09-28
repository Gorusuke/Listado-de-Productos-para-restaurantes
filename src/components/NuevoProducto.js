import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';

// Actions de Redux
import {crearNuevoProductoAction} from '../actions/productoAction';
import {mostrarAlerta, cerrarAlerta} from '../actions/alertaAction';


const NuevoProducto = ({history}) => {
    // state del componente
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');

    // Utilizar useDispatch y te devuelve o crea una funcion
    const dispatch = useDispatch();

    // Acceder al state del store
    const cargando = useSelector((state) => state.productos.loading);
    const error = useSelector((state) => state.productos.error);
    const mensaje = useSelector((state) => state.alerta.alerta)

    // Manda a llamar el action de productoAction
    const agregarProducto = (producto) => dispatch(crearNuevoProductoAction(producto))


    // Cuando el usuario haga el submit
    const submitNuevoProducto = (e) => {
        e.preventDefault();

        // Validar formulario
        if(nombre.trim() === '' || precio === ''){
            const alerta = {
                msg: 'Ambos campos son obligatorios',
                classes: 'alert alert-danger text-center py-2'
            }
            dispatch(mostrarAlerta(alerta))
            return;
        }

        // Si no hay errores
        dispatch(cerrarAlerta())

        // Crear el nuevo producto
        agregarProducto({
            nombre,
            precio
        });

        // Redireccionar a listado productos(pagina principal)
        history.push('/');
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Producto
                        </h2>
                        {mensaje ? <p className={mensaje.classes}>{mensaje.msg}</p> : null}
                        <form
                            onSubmit={submitNuevoProducto}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input
                                    type="text"
                                    placeholder="Nombre del Producto"
                                    className="form-control"
                                    name="nombre"
                                    value={nombre}
                                    onChange={e => setNombre(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input
                                    type="number"
                                    placeholder="Precio del Producto"
                                    className="form-control"
                                    name="precio"
                                    value={precio}
                                    onChange={e => setPrecio(Number(e.target.value))}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100 p-2"
                            >Agregar</button>
                        </form>
                        {cargando ? <p>Cargando...</p> : null}

                        {error ? <p className="alert alert-danger p2 mt-3 text-center">Hubo un error...</p> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default NuevoProducto;