// CategorieBar.js
import React from 'react';
import { Drawer, Typography, Checkbox, FormControlLabel, Divider } from '@mui/material';

export default function CategorieBar({ open, onClose, onCategorieFilterChange, onPriceFilterChange }) {
    const [categorieFilters, setCategorieFilters] = React.useState([]);
    const [priceFilters, setPriceFilters] = React.useState([]);

    const handleCategorieFilterChange = (categorie) => {
        const updatedFilters = categorieFilters.includes(categorie)
            ? categorieFilters.filter(item => item !== categorie)
            : [...categorieFilters, categorie];
        setCategorieFilters(updatedFilters);
        onCategorieFilterChange(updatedFilters);
    };

    const handlePriceFilterChange = (price) => {
        const updatedFilters = priceFilters.includes(price)
            ? priceFilters.filter(item => item !== price)
            : [...priceFilters, price];
        setPriceFilters(updatedFilters);
        onPriceFilterChange(updatedFilters);
    };

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
        >
            <div style={{ width: 250, padding: 16 }}>
                <Typography variant="h6">Barre des filtres</Typography>
                <Divider style={{ margin: '16px 0' }} />
                <Typography variant="subtitle1">Catégorie</Typography>
                <FormControlLabel
                    control={<Checkbox checked={categorieFilters.includes("Informatique")} onChange={() => handleCategorieFilterChange("Informatique")} />}
                    label="Informatique"
                />
                <FormControlLabel
                    control={<Checkbox checked={categorieFilters.includes("Livre")} onChange={() => handleCategorieFilterChange("Livre")} />}
                    label="Livre"
                />
                <FormControlLabel
                    control={<Checkbox checked={categorieFilters.includes("Electroménager")} onChange={() => handleCategorieFilterChange("Electroménager")} />}
                    label="Electroménager"
                />
                {/* Ajoutez d'autres filtres de catégorie ici */}
                <Typography variant="subtitle1">Prix</Typography>
                <FormControlLabel
                    control={<Checkbox checked={priceFilters.includes("Prix bas")} onChange={() => handlePriceFilterChange("Prix bas")} />}
                    label="Prix bas"
                />
                <FormControlLabel
                    control={<Checkbox checked={priceFilters.includes("Prix moyen")} onChange={() => handlePriceFilterChange("Prix moyen")} />}
                    label="Prix moyen"
                />
                <FormControlLabel
                    control={<Checkbox checked={priceFilters.includes("Prix élevé")} onChange={() => handlePriceFilterChange("Prix élevé")} />}
                    label="Prix élevé"
                />
                {/* Ajoutez d'autres filtres de prix ici */}
            </div>
        </Drawer>
    );
}
