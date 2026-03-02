import { getAllRecipes, searchRecipes, getRecipesByCategory } from './api/recipeProvider.js';
import { renderLayout, renderRecipes, renderModal, renderFavoritesPage } from './ui/render.js';
import { getFavorites, saveFavorite, removeFavorite, isFavorite } from './services/storageService.js';

let currentRecipes = [];

async function init() {
    renderLayout('app');
    currentRecipes = await getAllRecipes();
    renderRecipes(currentRecipes);

    document.getElementById('search-input').addEventListener('input', async (e) => {
        currentRecipes = e.target.value ? await searchRecipes(e.target.value) : await getAllRecipes();
        renderRecipes(currentRecipes);
    });

    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            currentRecipes = (btn.innerText === 'see All') ? await getAllRecipes() : await getRecipesByCategory(btn.innerText);
            renderRecipes(currentRecipes);
        });
    });

    
    document.getElementById('recipe-grid').addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        if (!card) return;
        const recipe = currentRecipes.find(r => r.id == card.dataset.id);

        if (e.target.classList.contains('heart')) {
            e.stopPropagation();
            if (isFavorite(recipe.id)) {
                removeFavorite(recipe.id);
                e.target.classList.remove('active');
            } else {
                saveFavorite(recipe);
                e.target.classList.add('active');
            }
        } else {
            renderModal(recipe);
        }
    });

    
    document.querySelector('.bottom-nav').addEventListener('click', (e) => {
        if (e.target.id === 'nav-fav-btn') loadFavoritesView();
        if (e.target.id === 'nav-home-btn') init();
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
        document.getElementById('nav-home-btn').onclick = () => init();
    }
}

init();