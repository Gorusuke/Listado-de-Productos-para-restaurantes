import React, {useState, useEffect} from 'react';
import {editarProducto} from '../actions/productoAction';
import{useHistory} from 'react-router-dom'
// Redux
import {useDispatch, useSelector} from 'react-redux';

const EditarProducto = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [product, setProduct] = useState({
        nombre: '',
        precio: ''
    });

    // Producto a editar
    const producto = useSelector(state => state.productos.productoEditar);

    useEffect(() => {
        setProduct(producto);
    }, [producto]);

    // Leer los datos del formulario
    const onChangeFormulario = e => {
        setProduct({
            ...product,
            [e.target.name] : e.target.value
        })
    }

    // Destructuring
    const {nombre, precio} = product;

    const productoEditar = e => {
        e.preventDefault();
        dispatch(editarProducto(product));
        history.push('/')
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Producto
                        </h2>
                        <form
                            onSubmit={productoEditar}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input
                                    type="text"
                                    placeholder="Nombre del Producto"
                                    className="form-control"
                                    name="nombre"
                                    value={nombre}
                                    onChange={onChangeFormulario}
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
                                    onChange={onChangeFormulario}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100 p-2"
                            >Guardar Cambios</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default EditarProducto;