// import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
    
    return (
        <div className="nav-list">
            <ul>
                <li> <Link to="/"> Contacts </Link> </li>
                <li> <Link to="/login"> login </Link> </li>
                <li> <Link to="/signin"> signin </Link> </li>
                <li> <Link to="/logout"> logout </Link> </li>
            </ul>
        </div>
    )
}


export default Nav;