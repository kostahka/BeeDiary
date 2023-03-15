import React from 'react';

function ApiaryElement(props) {
    return (
        <div className="col">
            <a href="/apiary">
                <button className="btn btn-dark btn-outline-warning w-100">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <img src="images/apiary.png"/>
                        <span>Apiary #1</span>
                        <span>My apiary</span>
                    </div>
                </button>
            </a>
        </div>
    );
}

export default ApiaryElement;