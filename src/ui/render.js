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
            <div class="search-box">🔍 <input type="text" placeholder="Search recipes..."> ≡</div>
            <div class="categories">
                <button class="active">see All</button><button>Soup</button><button>Salad</button>
            </div>
            <div class="section-label"><h3>Recommendation</h3><a href="#">see All</a></div>
            <div id="recipe-grid" class="grid"></div>
            <nav class="bottom-nav">🏠 🔍 📦 👤</nav>
        </div>
    `;
};

