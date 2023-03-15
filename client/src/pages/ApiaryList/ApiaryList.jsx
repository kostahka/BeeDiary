import React from 'react';
import ApiaryElement from "../../partial/ApiaryElement";

function ApiaryList(props) {
    return (
        <div className="container-fluid">
            <div className="container bg-dark p-5 mb-5 d-flex flex-column justify-content-start align-content-center">
                <span className="text-warning text-center mb-4 h4">New apiary</span>
                <div className="d-flex flex-column w-100">
                    <div className="input-group mb-2">
                        <span className="input-group-text bg-dark text-warning border-warning">Apiary name</span>
                        <input type="text" className="form-control"/>
                    </div>

                    <button className="btn btn-outline-warning">Add apiary</button>
                </div>
            </div>
            <div className="row row-cols-6">
                <ApiaryElement/>
                <ApiaryElement/>
            </div>
        </div>
    );
}

export default ApiaryList;