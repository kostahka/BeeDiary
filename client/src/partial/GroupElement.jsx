import React from 'react';
import {Link} from "react-router-dom";

function GroupElement(props) {
    return (
        <div className="col mb-2">
            <Link to={"/group/" + props.group._id}>
                <button className="btn btn-dark btn-outline-warning w-100">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <img src="/images/beeKeepers.png"/>
                        <span>{props.group.name}</span>
                    </div>
                </button>
            </Link>
        </div>
    );
}

export default GroupElement;