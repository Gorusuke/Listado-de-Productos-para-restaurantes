import React from 'react';
import {useHistory} from 'react-router-dom';
import Swal from 'sweetalert2';

// Redux
import {useDispatch} from 'react-redux';
import {borrarProductoAction, editarProductoAction} from '../actions/productoAction';


const Producto = ({producto}) => {

    // Utilizar useDispatch y te devuelve o crea una funcion
    const dispatch = useDispatch();
    const history = useHistory(); // habilita history para redireccion

    // Confirmar si desea eliminar
    const eliminarProducto = id => {
        // Preguntar al usuario
        Swal.fire({
            title: '¿Estas Seguro?',
            text: "Esto no se puede revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                // Pasar al action
                dispatch(borrarProductoAction(id));
            }
          })

        
    }

    // Funcion que redirige de forma programada
    const redireccionar = producto => {
        dispatch(editarProductoAction(producto));
        history.push(`/productos/editar/${producto.id}`)
    }


    return (
        <tr>
            <td>{producto.nombre}</td>
            <td><span className="font-weight-bold">${producto.precio}</span></td>
            <td className="acciones">
                <button 
                    type="button"
                    onClick={() => redireccionar(producto)}
                    className="btn btn-primary mr-2 btn-sm">
                    Editar
                </button>
                <button
                    type="button"
                    className="btn btn-danger btn-sm ml-2" 
                    onClick={() => eliminarProducto(producto.id)}        
                >Eliminar</button>
            </td>
        </tr>
    );
}
 
export default Producto;