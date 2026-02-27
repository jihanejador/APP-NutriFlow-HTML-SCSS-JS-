import { getAllRecipes, searchRecipes, getRecipesByCategory } from './api/recipeProvider.js';
import { renderLayout, renderRecipes, renderModal } from './ui/render.js';

async function init() {
    renderLayout('app');
    
    
    let currentRecipes = await getAllRecipes();
    renderRecipes(currentRecipes);

    const searchInput = document.getElementById('search-input');
    
   
    searchInput.addEventListener('input', async (e) => {
        const query = e.target.value;
        if (query.length > 0) {
            currentRecipes = await searchRecipes(query);
            renderRecipes(currentRecipes);
        } else {
            currentRecipes = await getAllRecipes();
            renderRecipes(currentRecipes);
        }
    });

    
   
}

init();