import { useState, useEffect } from "react";
import './App.css';
import Navbar from '../component/Navbar.js';
import axios from 'axios';

import { Card, CardActionArea, Typography, CardContent, Button, CardActions } from "@mui/material";
import { useLocation } from "react-router-dom";
import Icon from '@mdi/react';
import { mdiCartArrowDown } from '@mdi/js';
import Categoriebar from "../component/CategorieBar.js";


function Catalogue() {

    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const username = params.get('username');
    console.log(username);
    const [products, setProducts] = useState([]);
    console.log(products)
    const [panier, setPanier] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [categorieBarOpen, setCategorieBarOpen] = useState(false);
    const [categorieFilters, setCategorieFilters] = useState([]);
    const [priceFilters, setPriceFilters] = useState([]);

    const handleToggleCategorieBar = () => {
        setCategorieBarOpen(!categorieBarOpen);
    };

    const filteredProductList = products.filter(product => {
        const matchNameOrCategory = product.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.categorie.toLowerCase().includes(searchQuery.toLowerCase());
        const matchCategory = categorieFilters.length === 0 || categorieFilters.includes(product.categorie);
        const matchPrice = priceFilters.length === 0 || priceFilters.some(filter => {
            if (filter === 'Prix bas') {
                return product.prix < 20;
            } else if (filter === 'Prix moyen') {
                return product.prix >= 20 && product.prix < 100;
            } else if (filter === 'Prix élevé') {
                return product.prix >= 100;
            }
            return false;
        });

        return matchNameOrCategory && matchCategory && matchPrice;
    });

    const addToCart = async ({ product }) => {
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
                <Navbar
                    productList={products}
                    setSearchQuery={setSearchQuery} />
                :
                <Navbar
                    productList={products}
                    username_prop={username} />}
            <Categoriebar
                open={categorieBarOpen}
                onClose={handleToggleCategorieBar}
                onCategorieFilterChange={setCategorieFilters}
                onPriceFilterChange={setPriceFilters}
            />
            <Button size="large" variant="contained" style={{ margin: "10px" }} onClick={handleToggleCategorieBar}>Barre des filtres</Button>
            {products ?
                <div className="products-container">
                    {filteredProductList.map((product, index) => (
                        <Card className="shadow hover:shadow-xl mx-1 my-1 min-h-40 min-w-48" variant="outlined" key={index}>
                            <CardActionArea>
                                <CardContent href=''>
                                    <Typography>{product.nom}</Typography>
                                    <Typography>{product.categorie}</Typography>
                                    <Typography>{product.prix} €</Typography>
                                </CardContent>
                            </CardActionArea>
                            {username == null ? '' :
                                <CardActions>
                                    <Button onClick={() => addToCart({ product })} size="small">Ajouter au panier<Icon path={mdiCartArrowDown} size={1} /></Button>
                                </CardActions>
                            }

                        </Card>
                    ))}
                </div>
                : 'Loading...'}
        </>
    );
}

export default Catalogue;
