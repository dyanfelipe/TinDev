import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import "./Main.css";
import { Link } from 'react-router-dom';

import api from '../../services/api'
import logo from "../../assets/Tindev.svg";
import dislike from "../../assets/dislike.svg";
import like from "../../assets/like.svg";
import itsamatch from "../../assets/itsamatch.png";

export default function Main({ match }) {

    const [users, setUsers] = useState([]);
    const [matchdev, setMatch] = useState(null);

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id,
                }
            })

            setUsers(response.data);

        }

        loadUsers();
    }, [match.params.id]);

    useEffect(() => {
        const socket = io('http://localhost:3333', {
            query: { users: match.params.id }
        });
        socket.on('match', dev => {
            setMatch(dev)
        })
    }, [match.params.id]);

    async function handlelike(id) {
        await api.post(`/devs/MDQ6VXNlcjIyNTQ3MzE=/likes`, null, {
            headers: { user: match.params.id },
        })
        setUsers(users.filter(user => user._id !== id));
    }

    async function handleDislike(id) {
        await api.post(`/devs/MDQ6VXNlcjIyNTQ3MzE=/dislikes`, null, {
            headers: { user: match.params.id },
        })
        setUsers(users.filter(user => user._id !== id));
    }

    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt="Tindev" />
            </Link>
            {users.length > 0 ? (
                <ul>
                    {users.map(user => (
                        <li key={user._id}>
                            <img src={user.avatar} alt={user.name} />
                            <footer>
                                <strong>{user.name}</strong>
                                <p>{user.bio}</p>
                            </footer>

                            <div className="buttons">
                                <button type="button" onclick={() => handleDislike(user._id)}>
                                    <img src={dislike} alt="Dislike" />
                                </button>
                                <button type="button">
                                    <img src={like} alt="like" onclick={() => handlelike(user._id)} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                    <div className="empty"> Acabou :( </div>
                )}
            {matchdev && (
                <div className="match-container">
                    <img src={itsamatch} alt="sei la" />
                    <img className="avatar" src={matchdev.avatar} alt="" />
                    <strong>{matchdev.name}</strong>
                    <p>{matchdev.bio}</p>
                    <button type="button" onClick={() => setMatch(null)}>Fechar</button>
                </div>
            )}
        </div>
    )
}