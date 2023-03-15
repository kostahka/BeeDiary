import React from 'react';

function Header(props) {
    return (
        <div className="container-fluid px-0">
            <header
                className="d-flex flex-wrap align-items-center justify-content-md-between p-3 mb-4 bg-dark border-bottom">
                <a href="\"
                   className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                    <h1 className="text-warning">Bee diary</h1>
                </a>

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li><a href="/" className="nav-link px-2 link-warning">Home</a></li>
                    <li><a href="/apiaries" className="nav-link px-2 link-light">Apiaries</a></li>
                </ul>

                <div className="col-md-2 text-end">
                    <div className="input-group">
                        <a href="/login"className="btn btn-outline-warning">Login</a>
                        <a href="/register" className="btn btn-warning">Sign-up</a>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;