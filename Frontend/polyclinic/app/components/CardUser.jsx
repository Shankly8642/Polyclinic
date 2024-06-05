import React, { useState } from "react";
import "../globals.css";
import {logout} from "../autorization/page"
import Link from "next/link";

export const App = ({active, setActive}) => {
    return( 
    <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
        <div className={active ? "modal_content active" : "modal_content"} onClick={e => e.stopPropagation()} >
            <p style={{fontSize:"22px", marginBottom:"13px"}}>{localStorage.getItem("username")}</p>
            <Link style={{fontSize:"20px"}}href="/autorization" onClick={logout}>Выйти</Link>
        </div>
    </div>
    ); 
}