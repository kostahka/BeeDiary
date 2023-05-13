import React from 'react';
import {Link} from "react-router-dom";

function UserElement(props) {
    return (
        <div className="col mb-2">
            <Link to={"/user/" + props.user.id}>
                <button className="btn btn-dark btn-outline-warning w-100">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <img src="/images/beeKeeper.png"/>
                        <span>{props.user.nickname}</span>
                    </div>
                </button>
            </Link>
        </div>
    );
}

export default UserElement;