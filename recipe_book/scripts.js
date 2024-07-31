document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-recipe-form');
    const recipeList = document.getElementById('recipes');
    let editingIndex = -1; // To keep track of the recipe being edited

    // Load existing recipes from local storage
    loadRecipes();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('recipe-title').value;
        const image = document.getElementById('recipe-image').value;
        const ingredients = document.getElementById('recipe-ingredients').value;

        if (title && image && ingredients) {
            const recipe = {
                title,
                image,
                ingredients
            };

            if (editingIndex === -1) {
                // Add new recipe
                saveRecipe(recipe);
            } else {
                // Update existing recipe
                updateRecipe(editingIndex, recipe);
            }

            form.reset();
            editingIndex = -1; // Reset editing index
        }
    });

    function saveRecipe(recipe) {
        const recipes = getRecipes();
        recipes.push(recipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        displayRecipes();
    }

    function updateRecipe(index, updatedRecipe) {
        const recipes = getRecipes();
        recipes[index] = updatedRecipe;
        localStorage.setItem('recipes', JSON.stringify(recipes));
        displayRecipes();
    }

    function deleteRecipe(index) {
        const recipes = getRecipes();
        recipes.splice(index, 1);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        displayRecipes();
    }

    function getRecipes() {
        const recipes = localStorage.getItem('recipes');
        return recipes ? JSON.parse(recipes) : [];
    }

    function displayRecipes() {
        const recipes = getRecipes();
        recipeList.innerHTML = '';

        recipes.forEach((recipe, index) => {
            const card = document.createElement('div');
            card.className = 'recipe-card';

            card.innerHTML = `
                <h3>${recipe.title}</h3>
                <img src="${recipe.image}" alt="${recipe.title}">
                <p>${recipe.ingredients}</p>
                <button onclick="editRecipe(${index})">Edit</button>
                <button onclick="deleteRecipe(${index})">Delete</button>
            `;

            recipeList.appendChild(card);
        });
    }

    window.editRecipe = function(index) {
        const recipes = getRecipes();
        const recipe = recipes[index];

        document.getElementById('recipe-title').value = recipe.title;
        document.getElementById('recipe-image').value = recipe.image;
        document.getElementById('recipe-ingredients').value = recipe.ingredients;

        editingIndex = index; // Set the index of the recipe being edited
    };

    window.deleteRecipe = function(index) {
        if (confirm('Are you sure you want to delete this recipe?')) {
            deleteRecipe(index);
        }
    };

    function loadRecipes() {
        displayRecipes();
    }
});
