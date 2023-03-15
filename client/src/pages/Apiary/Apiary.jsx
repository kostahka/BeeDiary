import React from 'react';
import ApiaryElement from "../../partial/ApiaryElement";
import HiveElement from "../../partial/HiveElement";

function Apiary(props) {
    return (
        <div className="container-fluid">
            <div className="container bg-dark p-5 mb-5 d-flex flex-row justify-content-start">
                <div className="d-flex flex-column justify-content-center align-items-center text-warning mx-4">
                    <img src="images/apiary.png"/>
                    <span>Apiary #1</span>
                </div>
                <div className="d-flex flex-column justify-content-start align-items-center w-100 mx-3">
                    <div className="input-group mb-2">
                        <span className="input-group-text">Name</span>
                        <input type="text" className="form-control"/>
                    </div>
                    <button className="btn btn-outline-warning w-100">Save</button>
                </div>
                <div className="d-flex flex-column justify-content-start align-items-center w-100">
                    <div className="input-group row-cols-3">
                        <span className="input-group-text bg-dark text-warning border-warning col-2">Count</span>
                        <input type="number" className="form-control col-1"/>
                        <button className="btn btn-warning col-5">Add hives</button>
                    </div>
                </div>
            </div>
            <div className="row row-cols-6">
                <HiveElement/>
            </div>
        </div>
    );
}

export default Apiary;