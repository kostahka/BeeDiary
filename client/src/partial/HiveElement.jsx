import React from 'react';

function HiveElement(props) {
    return (
        <div className="col">
            <a href="/apiary/hive">
                <button className="btn btn-dark btn-outline-warning w-100">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <img src="images/hive.png"/>
                        <span>Hive #1</span>
                        <span>Performance: 100%</span>
                    </div>
                </button>
            </a>
        </div>
    );
}

export default HiveElement;