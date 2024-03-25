import Navbar from "../component/Navbar";
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import axios from "axios";

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        try {
            if (username === '' || password === '') {
                throw new Error('identifiants ou mot de passe vide');
            }
            if (password !== confPassword) {
                throw new Error('Les mots de passe ne correspondent pas');
            }
            const response = await axios.post('http://localhost:3000/api/register', {
              username: username,
              password: password
            });
            console.log('Inscription réussie:', response.data);
            // Redirigez l'utilisateur vers une autre page après l'inscription réussie
            navigate(`/?username=${username}`);
          } catch (error) {
            console.error('Erreur lors de l\'inscription:', error);
          }
        
    };

    const toConnection = async (e) => {
        e.preventDefault();
        navigate('/login');
    }

    return (
        <div className='background'>
            <Navbar></Navbar>
            <Card className='base-container'>
                <CardContent className='sub-container'>
                    <Typography textAlign={"center"} style={{ fontSize: "4rem"}}>Inscription</Typography>
                    <TextField
                        className="input"
                        type="username"
                        id="username"
                        name="username"
                        placeholder='Pseudo'
                        required={true}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        className="input"
                        type="password"
                        id="password"
                        name="password"
                        placeholder='Mot de passe'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        className="input"
                        type="password"
                        id="confpassword"
                        name="confpassword"
                        placeholder='Confirmer le mot de passe'
                        required
                        value={confPassword}
                        onChange={(e) => setConfPassword(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        style={{ width: "10rem", alignSelf: "center"}}
                        onClick={handleRegister}>
                        Valider
                    </Button>
                    <Button
                        variant="contained"
                        style={{ width: "10rem", alignSelf: "center"}}
                        onClick={toConnection}>
                        Se connecter
                    </Button>
                </CardContent>

            </Card>
        </div>

    );
} export default Register;