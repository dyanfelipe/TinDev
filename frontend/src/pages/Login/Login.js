import React, {useState} from "react";
import logo from "../../assets/Tindev.svg";
import "./Login.css"
import api from '../../services/api'
export default function Login({history}) {
    const [username, setUsername] = useState('');

    async function handleSubmit(e){
        e.preventDefault();

        const response = await api.post('/devs',{
            username,
        })
        console.log(response);
        const {_id } = response.data;
        history.push(`/devs/${_id}`);
    }
    return (
        <div className="login-conteiner">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev"></img>
                <input placeholder="Usuário do gitHub" value = {username} onChange={e => setUsername(e.target.value)}/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}