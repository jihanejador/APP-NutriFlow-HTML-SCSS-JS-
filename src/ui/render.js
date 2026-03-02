import { isFavorite } from '../services/storageService.js';

export const renderLayout = (containerId) => {
    const app = document.getElementById(containerId);
    app.innerHTML = `
        <div class="mobile-container">
            <header class="header">
                <div class="user-info">
                    <div class="avatar"><img src="./icons/user.svg" alt="User"></div>
                    <div><p>Good Morning</p><h3>Samantha</h3></div>
                </div>
                <button class="menu">☰</button>
            </header>
            
            <div class="desktop-content-wrapper">
                <h1 class="hero-title">feeling hungry?<br>what are we cookin today?</h1>
                
                <div class="search-box">
                    <div class="search-inner">
                        <img src="./icons/material-symbols--search.svg" alt=""> 
                        <input type="text" id="search-input" placeholder="Search recipes (e.g. Pizza)...">
                    </div>
                </div>
                
                <div class="categories">
                    <button class="cat-btn active">see All</button>
                    <button class="cat-btn">Breakfast</button>
                    <button class="cat-btn">Lunch</button>
                    <button class="cat-btn">Beverages</button>
                </div>
                
                <div class="section-label"><h3>Recommendation</h3><a href="#">see All</a></div>
                <div id="recipe-grid" class="grid"></div>
            </div>

            <nav class="bottom-nav">
                <img id="nav-home-btn" src="./icons/material-symbols--home-rounded.svg" alt="Home"> 
                <img src="./icons/material-symbols--search.svg" alt="Search">
                <img id="nav-fav-btn" src="./icons/oui--app-saved-objects.svg" alt="Favorites"> 
                <img src="./icons/user.svg" alt="Profile">
            </nav>
        </div>
    `;
};

export const renderRecipes = (recipes) => {
    const grid = document.getElementById('recipe-grid');
    if (!recipes || recipes.length === 0) {
        grid.innerHTML = "<p style='padding:20px'>No recipes found.</p>";
        return;
    }
    grid.innerHTML = recipes.map(r => {
        const heartClass = isFavorite(r.id) ? 'heart active' : 'heart';
        return `
            <div class="card" data-id="${r.id}">
                <div class="img-hold">
                    <img src="${r.image}" alt="${r.name}">
                    <span class="${heartClass}">❤</span>
                </div>
                <div class="card-info">
                    <h4>${r.name}</h4>
                    <p>${r.cuisine} • ${r.difficulty}</p>
                </div>
            </div>
        `;
    }).join('');
};

export const renderFavoritesPage = (containerId) => {
    const app = document.getElementById(containerId);
    app.innerHTML = `
        <div class="mobile-container">
            <header class="header">
                <button id="btn-back" style="background:none; border:none; font-size:1.5rem; cursor:pointer;">←</button>
                <h3 style="margin-right:40px">My Favorites</h3>
            </header>
            <div class="desktop-content-wrapper">
                <div id="favorites-grid" class="grid"></div>
            </div>
            <nav class="bottom-nav">
                <img id="nav-home-btn" src="./icons/material-symbols--home-rounded.svg" alt="Home"> 
                <img id="nav-fav-btn" src="./icons/oui--app-saved-objects.svg" alt="Favorites" style="filter: hue-rotate(90deg);"> 
            </nav>
        </div>
    `;
};

export const renderModal = (recipe) => {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal">✕</button>
            <div class="modal-left">
                <img src="${recipe.image}" alt="${recipe.name}">
            </div>
            <div class="modal-right details-scroll">
                <h2>${recipe.name}</h2>
                <div class="recipe-info">⏱ ${recipe.prepTimeMinutes} min • ⭐ ${recipe.rating || '4.5'}</div>
                <h3>Ingredients</h3>
                <ul>${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>
                <h3>Directions</h3>
                <ol>${recipe.instructions.map(step => `<li>${step}</li>`).join('')}</ol>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.close-modal').onclick = () => modal.remove();
};