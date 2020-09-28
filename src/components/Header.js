import React from 'react';
import {Link} from 'react-router-dom'

const Header = ({titulo}) => {
    return (
        <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
            <div className="container">
                <h1>
                    <Link to={'/'} className="text-light">{titulo}</Link>
                </h1>
            </div>
            <Link
                to={"/productos/nuevo"}
                className="btn btn-danger nuevo-post d-block d-md-inlne-block"
            >Agregar Productos &#43;</Link>
        </nav>
    );
}
 
export default Header;