import React from 'react';

function Hive(props) {
    return (
        <div>
            <div className="container bg-dark p-5">
                <div className="input-group mb-3 row-cols-3">
                    <div className="input-group-text bg-dark border-warning col-1 d-flex justify-content-center">
                        <img style={{height: "50px", width:"auto"}} src="../images/beeFrame.png"/>
                    </div>
                    <span className="input-group-text col-2">Hive type</span>
                    <select className="form-select col">
                        <option selected hidden>Hive type</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>


                <div className="input-group mb-3 row-cols-3">
                    <div className="input-group-text bg-dark border-warning col-1 d-flex justify-content-center">
                        <img style={{height: "50px", width:"auto"}} src="../images/beeQueen.png"/>
                    </div>
                    <span className="input-group-text col-2">Queen</span>
                    <select className="form-select col">
                        <option selected hidden>Queen</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>

                <div className="input-group row-cols-3">
                    <div className="input-group-text bg-dark border-warning col-1 d-flex justify-content-center">
                        <img style={{height: "50px", width:"auto"}} src="../images/swarmOfBees.png"/>

                    </div>
                    <label className="input-group-text border-warning col-2">Performance</label>
                    <div className="input-group-text form-control bg-dark col">
                        <input type="range" className=" form-range mb-2" min="0" max="100"/>
                    </div>
                </div>

                <div className="input-group mt-5 row-cols-2">
                    <button className="btn btn-outline-secondary">Cancel</button>
                    <button className="btn btn-warning">Save</button>
                </div>
            </div>
        </div>
    );
}

export default Hive;