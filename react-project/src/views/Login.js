import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import { useState } from "react";
import axios from 'axios';
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      try {
        const response = await axios.post('http://localhost:3000/api/login', {
          username: username,
          password: password
        });
        const token = response.data.token;
        const id = response.data.id;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', id);
        console.log('Connexion réussie:', response.data);
        // Redirection en utilisant la route qui a pour nom catalogue
        navigate(`/?username=${username}`)
      } catch (error) {
        console.error('Erreur lors de la connexion:', error);
      }
      
  
    };
  
    const toRegister = async (e) => {
      e.preventDefault();
      navigate('/register');
    };
  
    return (
      <div className='background'>
        <Navbar></Navbar>
        <Card className='base-container'>
                <CardContent className='sub-container'>
                    <Typography textAlign={"center"} style={{ fontSize: "4rem"}}>Connexion</Typography>
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
                    <Button
                        variant="contained"
                        style={{ width: "10rem", alignSelf: "center"}}
                        onClick={handleLogin}>
                        Valider
                    </Button>
                    <Button
                        variant="contained"
                        style={{ width: "10rem", alignSelf: "center"}}
                        onClick={toRegister}>
                        S'inscrire
                    </Button>
                </CardContent>

            </Card>
  
      </div>
    );
}
export default Login;

