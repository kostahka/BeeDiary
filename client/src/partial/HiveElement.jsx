import React from 'react';
import {useFetching} from "../hooks/useFetching";
import ApiaryService from "../services/ApiaryService";
import {Link, useParams} from "react-router-dom";
import HiveService from "../services/HiveService";

function HiveElement(props) {
    return (
        <div className="col mb-2">
            <Link to={"/apiary/hive/" + props.hive._id}>
                <button className="btn btn-dark btn-outline-warning w-100">
                    <div className="d-flex  flex-column justify-content-center align-items-center">
                        <img src="/images/hive.png"/>
                        <span className="border-bottom border-warning rounded-4
                        w-100">Number #{props.hive.number}</span>
                        <div className="container d-flex flex-column align-items-center border-top
                        border-warning rounded-4">
                            <span>Type: {props.hive.type}</span>
                            <span>Queen: {props.hive.queen}</span>
                            <span>Performance: {props.hive.performance}%</span>
                        </div>

                    </div>
                </button>
            </Link>
        </div>
    );
}

export default HiveElement;