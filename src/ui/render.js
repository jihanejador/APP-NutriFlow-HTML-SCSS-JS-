export const renderLayout = (containerId) => {
    const app = document.getElementById(containerId);
    app.innerHTML = `
        <div class="mobile-container">
            <header class="header">
                <div class="user-info">
                    <div class="avatar">👩‍🍳</div>
                    <div><p>Good Morning</p><h3>Samantha</h3></div>
                </div>
                <button class="menu">☰</button>
            </header>
            <h1 class="hero-title">feeling hungry?<br>what are we cookin today?</h1>
            <div class="search-box">🔍 <input type="text" id="search-input" placeholder="Search recipes(e.g. Pizza)..."> ≡</div>
            
            <div class="categories">
                <button class="cat-btn active">see All</button>
                <button class="cat-btn">Breakfast</button>
                <button class="cat-btn">Lunch</button>
                <button class="cat-btn">Beverages</button>
            </div>
            
            <div class="section-label"><h3>Recommendation</h3><a href="#">see All</a></div>
            <div id="recipe-grid" class="grid"></div>
            <nav class="bottom-nav">🏠 🔍 📦 👤</nav>
        </div>
    `;
};

export const renderRecipes = (recipes) => {
    const grid = document.getElementById('recipe-grid');
    if (!recipes || recipes.length === 0) {
        grid.innerHTML = "<p style='padding:20px'>No recipes found.</p>";
        return;
    }
    grid.innerHTML = recipes.map(r => `
        <div class="card" data-id="${r.id}" style="cursor: pointer;">
            <div class="img-hold">
                <img src="${r.image}" alt="${r.name}">
                <span class="heart">❤</span>
            </div>
            <h4>${r.name}</h4>
            <p>${r.cuisine} • ${r.difficulty}</p>
        </div>
    `).join('');
};

