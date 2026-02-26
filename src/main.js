import { getAllRecipes } from './api/recipeProvider.js';
import { renderLayout, renderRecipes } from './ui/render.js';

async function init() {
    renderLayout('app');
    const data = await getAllRecipes();
    renderRecipes(data);
}
init();