import React from "react";
import logo from "../assets/Tindev.svg";
import "./Login.css"

export default function Login() {
    return (
        <div className="login-conteiner">
            <form>
                <img src={logo} alt="Tindev"></img>
                <input placeholder="Usuário do gitHub" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}