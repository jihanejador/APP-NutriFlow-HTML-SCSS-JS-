import { getAllRecipes, searchRecipes } from './api/recipeProvider.js';
import { renderLayout, renderRecipes } from './ui/render.js';

async function init() {
    renderLayout('app');
    
    const initialData = await getAllRecipes();
    renderRecipes(initialData);

    
    const searchInput = document.getElementById('search-input');
    
    searchInput.addEventListener('input', async (e) => {
        const query = e.target.value;
        if (query.length > 0) {
            const filtered = await searchRecipes(query);
            renderRecipes(filtered);
        } else {
            renderRecipes(initialData);
        }
    });
}

init();