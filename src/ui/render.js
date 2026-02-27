import { isFavorite } from '../services/storageService.js';

export const renderLayout = (containerId) => {
    const app = document.getElementById(containerId);
    app.innerHTML = `
        <div class="mobile-container">
            <header class="header">
                <div class="user-info">
                    <div class="avatar"><img src="./icons/user.svg" alt=""></div>
                    <div><p>Good Morning</p><h3>Samantha</h3></div>
                </div>
                <button class="menu">☰</button>
            </header>
            <h1 class="hero-title">feeling hungry?<br>what are we cookin today?</h1>
            <div class="search-box">
                <img src="./icons/material-symbols--search.svg" alt=""> 
                <input type="text" id="search-input" placeholder="Search recipes..."> ≡
            </div>
            
            <div class="categories">
                <button class="cat-btn active">see All</button>
                <button class="cat-btn">Breakfast</button>
                <button class="cat-btn">Lunch</button>
                <button class="cat-btn">Beverages</button>
            </div>
            
            <div class="section-label"><h3>Recommendation</h3><a href="#">see All</a></div>
            <div id="recipe-grid" class="grid"></div>

            <nav class="bottom-nav">
                <img id="nav-home-btn" src="./icons/material-symbols--home-rounded.svg" alt="" style="cursor:pointer"> 
                <img src="./icons/material-symbols--search.svg" alt="">
                <img id="nav-fav-btn" src="./icons/oui--app-saved-objects.svg" alt="" style="cursor:pointer"> 
                <img src="./icons/user.svg" alt="">
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
    // Zdt hna "return" li kant naqsa u l-path dial heart active
    grid.innerHTML = recipes.map(r => {
        const heartClass = isFavorite(r.id) ? 'heart active' : 'heart';
        return `
            <div class="card" data-id="${r.id}" style="cursor: pointer;">
                <div class="img-hold">
                    <img src="${r.image}" alt="${r.name}">
                    <span class="${heartClass}">❤</span>
                </div>
                <h4>${r.name}</h4>
                <p>${r.cuisine} • ${r.difficulty}</p>
            </div>
        `;
    }).join('');
};

export const renderModal = (recipe) => {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <button class="close-modal">←</button>
                <span class="header-title">Recipes</span>
            </div>
            <div class="modal-body">
                <div class="recipe-top-info">
                    <h2>${recipe.name}</h2>
                    <span class="rating">⭐ ${recipe.rating || '4.5'}</span>
                </div>
                <div class="recipe-stats">
                    <span>⏱ ${recipe.prepTimeMinutes} min</span>
                    <span>📊 ${recipe.difficulty}</span>
                </div>
                <div class="image-wrapper">
                    <img src="${recipe.image}" alt="${recipe.name}">
                </div>
                <div class="recipe-details">
                    <details open>
                        <summary>Ingredients</summary>
                        <ul>${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>
                    </details>
                    <details>
                        <summary>Directions</summary>
                        <ol>${recipe.instructions.map(step => `<li>${step}</li>`).join('')}</ol>
                    </details>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.close-modal').onclick = () => modal.remove();
};

export const renderFavoritesPage = (containerId) => {
    const app = document.getElementById(containerId);
    app.innerHTML = `
        <div class="mobile-container">
            <header class="header">
                <button id="btn-back" style="background:none; border:none; font-size:1.5rem; cursor:pointer;">←</button>
                <h3 style="margin-right:40px">My Favorites</h3>
            </header>
            <div id="favorites-grid" class="grid"></div>
            <nav class="bottom-nav">
                <img id="nav-home-btn" src="./icons/material-symbols--home-rounded.svg" alt="" style="cursor:pointer"> 
                <img src="./icons/material-symbols--search.svg" alt="">
                <img id="nav-fav-btn" src="./icons/oui--app-saved-objects.svg" alt="" style="cursor:pointer; filter: hue-rotate(90deg);"> 
                <img src="./icons/user.svg" alt="">
            </nav>
        </div>
    `;
};