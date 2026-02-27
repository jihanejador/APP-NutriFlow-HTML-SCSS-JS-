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

    
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const category = btn.innerText;
            currentRecipes = (category === 'see All') ? await getAllRecipes() : await getRecipesByCategory(category);
            renderRecipes(currentRecipes);
        });
    });

   
    document.getElementById('recipe-grid').addEventListener('click', (e) => {
        const card = e.target.closest('.card'); // sse77na closest
        if (card) {
            const recipeId = card.dataset.id; // sse77na dataset
            const recipe = currentRecipes.find(r => r.id == recipeId);
            if (recipe) {
                renderModal(recipe);
            }
        }
    });
}

init();