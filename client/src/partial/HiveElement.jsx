import React from 'react';
import {useFetching} from "../hooks/useFetching";
import ApiaryService from "../services/ApiaryService";
import {Link, useParams} from "react-router-dom";
import HiveService from "../services/HiveService";

function HiveElement(props) {
    return (
        <div className="col m-2">
            <Link to={"/apiary/hive/" + props.hive._id}>
                <button className="btn btn-dark btn-outline-warning w-100">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <img src="../images/hive.png"/>
                        <span>Number #{props.hive.number}</span>
                        <span>Performance: {props.hive.performance}</span>
                    </div>
                </button>
            </Link>
        </div>
    );
}

export default HiveElement;