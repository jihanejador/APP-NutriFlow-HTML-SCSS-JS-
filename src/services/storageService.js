const FAVORITES_KEY = 'nutriflow_favs';

export const getFavorites = () => {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
};

export const saveFavorite = (recipe) => {
    let favorites = getFavorites();
    if (!favorites.find(r => r.id === recipe.id)) {
        favorites.push(recipe);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
};

export const removeFavorite = (recipeId) => {
    let favorites = getFavorites();
    favorites = favorites.filter(r => r.id !== recipeId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const isFavorite = (recipeId) => {
    const favorites = getFavorites();
    return favorites.some(r => r.id === recipeId);
};