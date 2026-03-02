import { getAllRecipes, searchRecipes, getRecipesByCategory } from './api/recipeProvider.js';
import { renderLayout, renderRecipes, renderModal, renderFavoritesPage } from './ui/render.js';
import { getFavorites, saveFavorite, removeFavorite, isFavorite } from './services/storageService.js';

let allRecipes = []; 

async function init() {
    renderLayout('app');
    allRecipes = await getAllRecipes();
    renderRecipes(allRecipes);

    const searchInput = document.getElementById('search-input');
    if(searchInput) {
        searchInput.addEventListener('input', async (e) => {
            const query = e.target.value;
            const recipes = query.length > 0 ? await searchRecipes(query) : await getAllRecipes();
            renderRecipes(recipes);
        });
    }

    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const category = btn.innerText;
            const recipes = (category === 'see All') ? await getAllRecipes() : await getRecipesByCategory(category);
            renderRecipes(recipes);
        });
    });

    const grid = document.getElementById('recipe-grid');
    grid.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        if (!card) return;
        
        const recipeId = parseInt(card.dataset.id);
        const recipe = allRecipes.find(r => r.id === recipeId);

        if (e.target.classList.contains('heart')) {
            e.stopPropagation();
            if (isFavorite(recipeId)) {
                removeFavorite(recipeId);
                e.target.classList.remove('active');
            } else {
                saveFavorite(recipe);
                e.target.classList.add('active');
            }
        } else if (recipe) {
            renderModal(recipe);
        }
    });

    document.querySelector('.bottom-nav').addEventListener('click', (e) => {
        if (e.target.id === 'nav-fav-btn' || e.target.closest('#nav-fav-btn')) {
            loadFavoritesView();
        }
        if (e.target.id === 'nav-home-btn' || e.target.closest('#nav-home-btn')) {
            init();
        }
    });
}

function loadFavoritesView() {
    const favorites = getFavorites();
    renderFavoritesPage('app');
    
    const favGrid = document.getElementById('favorites-grid');
    if (favGrid) {
        favGrid.id = 'recipe-grid'; 
        renderRecipes(favorites);
        
        document.getElementById('btn-back').onclick = () => init();
        document.querySelector('.bottom-nav').onclick = (e) => {
             if (e.target.id === 'nav-home-btn') init();
        };
    }
}

init();