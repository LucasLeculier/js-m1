import { useState, useEffect } from "react";
import './App.css';
import Navbar from '../component/Navbar.js';
import axios from 'axios';

import { Card, CardActionArea, Typography, CardContent, Button, CardActions } from "@mui/material";
import { useLocation } from "react-router-dom";
import Icon from '@mdi/react';
import { mdiCartArrowDown } from '@mdi/js';


function Catalogue() {

    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const username = params.get('username');
    console.log(username);
    const [products, setProducts] = useState([]);
    const [panier, setPanier] = useState([])

    const addToCart = async ({product}) => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
              console.error('ID utilisateur non trouvé dans le stockage local');
              return;
            }
        
            await axios.post('http://localhost:3000/api/Addpanier', { user_id: userId, product_id: product.id });
            alert('Produit ajouté au panier avec succès');
          } catch (error) {
            console.error('Erreur lors de l\'ajout du produit au panier:', error);
          }
        setPanier([...panier, product])
        console.log(panier)
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.post('http://localhost:3000/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des produits:', error);
            }

        };

        fetchProducts();
    }, []);

    useEffect(() => {

    }, [panier])


    return (
        <>
            {username == null ?
                <Navbar />
                :
                <Navbar
                    username_prop={username}/>}

            {products ?
                <div className="products-container">
                    {products.map((product, index) => (
                        <Card className="shadow hover:shadow-xl" variant="outlined" key={index}>
                            <CardActionArea>
                                <CardContent href=''>
                                    <Typography>{product.id}</Typography>
                                    <Typography>{product.nom}</Typography>
                                    <Typography>{product.categorie}</Typography>
                                    <Typography>{product.prix} €</Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button onClick={() => addToCart({ product })} size="small">Ajouter au panier<Icon path={mdiCartArrowDown} size={1} /></Button>
                            </CardActions>
                            
                        </Card>
                    ))}
                </div>
                : 'Loading...'}
        </>
    );
}

export default Catalogue;
