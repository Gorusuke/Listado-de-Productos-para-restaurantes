import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGAS_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';


// Crear nuevos productos
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch(agregarProducto());

        try {
            // Insertar en la API
            await clienteAxios.post('/productos', producto);

            // Si todo sale bien, actualizar el state
            dispatch(agregarProductoExito(producto));

            // Alerta de Exito
            Swal.fire(
                'Correcto',
                'EL producto se agrego correctamente',
                'success'
            )
        } catch (error) {
            console.info(error)
            // Si hay un error cambiar el state
            dispatch(agregarProductoError(true));

            // Alerta de error
            // Swal.fire(
            //     'Algo salio mal',
            //     'Huboo un error..',
            //     'error'
            // )
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
});

// Si le producto se guarda en la base de datos
const agregarProductoExito = (producto) => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

const agregarProductoError = (estado) => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});

// Funcion que descarga los productos de la base de datos
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch(descargarProductos());

        try {
            // Insertar en la API
            const resultado = await clienteAxios.get('/productos');
            
            // Si todo sale bien, actualizar el state
            dispatch(descargaProductosExito(resultado.data));
        } catch (error) {
            console.info(error)
            // Si hay un error cambiar el state
            dispatch(descargaProductosError());
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGAS_PRODUCTOS,
    payload: true
});

const descargaProductosExito = (productos) => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload : productos
});

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
});

// Selecciona y elemina el producto
// Funcion que descarga los productos de la base de datos
export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id));
        
        try {
            // Insertar en la API
            await clienteAxios.delete(`/productos/${id}`);
            
            // Si todo sale bien, actualizar el state
            dispatch(eliminarProductoExito());

            // Mensaje de Eliminado (proviende de producto line:29)
            Swal.fire(
                'Eliminado!',
                'Tu archivo ha sido eliminado',
                'success'
            )
        } catch (error) {
            console.info(error)
            // Si hay un error cambiar el state
            dispatch(productosEliminadoError());
        }
    }
}

const obtenerProductoEliminar = (id) => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
});

const productosEliminadoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
});

// Funcion edita los productos de la base de datos
export function editarProductoAction(producto) {
    return (dispatch) => {
        dispatch(obtenerProductoEditar(producto));
    }
}

const obtenerProductoEditar = (producto) => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
});

// edita un registro en la API
export function editarProducto(producto) {
    return async (dispatch) => {
        dispatch(comenzarEdicion());
        
        try {
            // Insertar en la API
            await clienteAxios.put(`/productos/${producto.id}`, producto);
            
            // Si todo sale bien, actualizar el state
            dispatch(productoEditadoExito(producto));
        } catch (error) {
            console.info(error)
            // Si hay un error cambiar el state
            dispatch(productoEditadoError());
        }
    }
}

const comenzarEdicion = () => ({
    type: COMENZAR_EDICION_PRODUCTO
});

const productoEditadoExito = (producto) => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
});

const productoEditadoError = () => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
});