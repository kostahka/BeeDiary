import React from 'react';

function Register(props) {
    return (
        <div>
            <div className="container bg-dark d-flex flex-column p-5 w-50">
                <div>
                    <div className="input-group mb-2">
                        <span className="input-group-text">Nickname</span>
                        <input type="text" className="form-control"/>
                    </div>
                    <div className="input-group mb-2">
                        <span className="input-group-text">Password</span>
                        <input type="password" className="form-control"/>
                    </div>
                    <div className="input-group mb-4">
                        <span className="input-group-text">Confirm password</span>
                        <input type="password" className="form-control"/>
                    </div>
                    <button className="btn btn-outline-warning w-100">Register</button>
                </div>
            </div>
        </div>
    );
}

export default Register;