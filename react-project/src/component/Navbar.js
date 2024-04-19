import Icon from '@mdi/react';
import { mdiCart, mdiDelete, mdiMagnify } from '@mdi/js';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { Button, ButtonGroup, Card, CardContent, CardHeader, IconButton, InputAdornment, OutlinedInput, Popover, TextField, Typography } from '@mui/material';
import axios from 'axios';

export default function Navbar({ productList, username_prop, setSearchQuery }) {

    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [anchorElLog, setAnchorElLog] = useState(null);
    const [anchorElPanier, setAnchorElPanier] = useState(null);
    const [username, setUsername] = useState(username_prop);
    const [panier, setPanier] = useState(null);
    const [totalCost, setTotalCost] = useState(0)
    const [searchQueryInput, setSearchQueryInput] = useState('');


    const logout = () => {
        setUsername(null);
        setPanier(null);
        setIsAuthenticated(false)
        localStorage.removeItem('token');
        navigate(`/`);
    }

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const toRegister = () => {
        navigate('/register');
    }

    const toLogin = () => {
        navigate('/login')
    }


    const handleClickLog = (event) => {
        setAnchorElLog(anchorElLog ? null : event.currentTarget);
    };

    const handleCloseLog = () => {
        setAnchorElLog(null);
    };

    const handleClosePanier = () => {
        setAnchorElPanier(null);
    };

    const deleteProduct = async ({ product }) => {
        try {
            // Récupérer l'ID de l'utilisateur depuis le stockage local
            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.error('ID utilisateur non trouvé dans le stockage local');
                return;
            }

            // Envoyer les données nécessaires au back-end
            await axios.post('http://localhost:3000/api/subPanier', { user_id: userId, id: product.id });
            console.log('Produit supprimé du panier avec succès');
            const response = await axios.post('http://localhost:3000/api/panierUser', { user_id: userId });
            setPanier(response.data);
        } catch (error) {
            console.error('Erreur lors de la suppression du produit au panier:', error);
        }
    }

    const open_log = Boolean(anchorElLog);
    const id_log = open_log ? 'simple-popover log' : undefined;

    const handleClickPanier = (event) => {
        setAnchorElPanier(anchorElPanier ? null : event.currentTarget);
    };

    const open_panier = Boolean(anchorElPanier);
    const id_panier = open_panier ? 'simple-popover panier' : undefined;

    useEffect(() => {
        if (username == null) {
            setIsAuthenticated(false)
        } else {
            setIsAuthenticated(true)
        }
    }, [username]);

    useEffect(() => {

    }, [isAuthenticated]);

    useEffect(() => {
        const fetchPanier = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const response = await axios.post('http://localhost:3000/api/panierUser', { user_id: userId });
                setPanier(response.data);
                console.log('Produits récupérés:', panier)
            } catch (error) {
                console.error('Erreur lors de la récupération des produits:', error);
            }

        };


        fetchPanier();
    }, []);

    useEffect(() => {
        const getTotalPrice = () => {
            let totalPrice = 0;
            if (panier != null) {
                panier.forEach(product => {
                    totalPrice += product.Product.prix * product.quantity;
                });
            }

            setTotalCost(totalPrice.toFixed(2));
        };

        getTotalPrice();
    }, [panier])


    const handleSearchInputChange = (event) => {
        const newSearchQuery = event.target.value;
        setSearchQueryInput(newSearchQuery);
        setSearchQuery(newSearchQuery); // Met à jour l'état de la recherche dans le composant parent
    };


    return (
        <>
            <header className='navbar-header'>
                <nav className="h-16 w-full flex items-center justify-around">
                    <div className="nav-profile">

                        <button onClick={handleClickLog}>
                            {isAuthenticated ? <span>Bonjour {username}!</span> : <span>Bonjour! Connexion ici!</span>}
                        </button>


                        <Popover id={id_log} open={open_log} anchorEl={anchorElLog} onClose={handleCloseLog}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}>
                            <Card className='portal'>
                                {isAuthenticated ? <Button onClick={logout}>Déconnexion</Button> :
                                    <ButtonGroup>
                                        <Button onClick={toLogin}>Se connecter</Button>
                                        <Button onClick={toRegister}>S'inscrire</Button>
                                    </ButtonGroup>
                                }
                            </Card>

                        </Popover>


                    </div>
                    <form className=''>
                        <TextField
                            value={searchQueryInput}
                            onChange={handleSearchInputChange}
                            placeholder="Rechercher..."
                            InputProps={{
                                style: { color: '#ffffff' }, // Couleur du texte
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton style={{ color: '#ffffff' }} onClick={handleSearchInputChange}>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                sx: {
                                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#ffffff' }, // Couleur de l'outline
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ffffff' }, // Couleur de l'outline au survol
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ffffff' }, // Couleur de l'outline en focus
                                },
                            }}
                        />
                    </form>
                    <div className="nav-panier">
                        <button onClick={handleClickPanier}>
                            <Icon path={mdiCart} size={1} />
                        </button>
                        <Popover id={id_panier} open={open_panier} anchorEl={anchorElPanier} onClose={handleClosePanier}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }} transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}>
                            {panier == null ? (
                                <Card className='portal'>
                                    <CardContent>
                                        <Typography>Ajoutez des produits à votre panier!</Typography>
                                    </CardContent>
                                </Card>
                            ) : (
                                <Card>
                                    <CardHeader title={
                                        <Typography>Votre panier</Typography>}

                                    />
                                    {panier.map((product, index) => (
                                        <CardContent className='flex items-center' key={index} href=''>
                                            <span className='mx-1.5'>{product.quantity}x</span>
                                            <span className='mx-1.5'>{product.Product.nom}</span>

                                            <Button onClick={() => deleteProduct({ product })} size="small">
                                                <Icon path={mdiDelete} size={1} />
                                            </Button>
                                        </CardContent>
                                    ))}
                                    <Typography className='px-1.5'>Coût total: {totalCost}€</Typography>
                                </Card>

                            )}
                        </Popover>
                    </div>
                </nav>
            </header>
        </>
    )
}