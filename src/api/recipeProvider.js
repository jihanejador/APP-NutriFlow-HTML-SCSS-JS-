const BASE_URL = 'https://dummyjson.com/recipes';

export const getAllRecipes = async () => {
    const res = await fetch(`${BASE_URL}?limit=10`);
    const data = await res.json();
    return data.recipes;
};

export const searchRecipes = async (query) => {
    const res = await fetch(`${BASE_URL}/search?q=${query}`);
    const data = await res.json();
    return data.recipes;
};
export const getRecipesByCategory = async (category) => {
    const res = await fetch(`${BASE_URL}/category/${category}`);
    const data = await res.json();
    return data.recipes;
};