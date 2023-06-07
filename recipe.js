class Ingredient {
    constructor(name, amount) {
        this.name = name;
        this.amount = amount;
    }
}

class Recipe {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.ingredients = [];
    }

    addIngredient(ingredient) {
        this.ingredients.push(ingredient);
    }

    deleteIngredient(ingredient) {
        let index = this.ingredients.indexOf(ingredient);
        this.ingredients.splice(index, 1);
    }
}

let recipes = [];
let recipeId = 0;

onClick('new-recipe', () => {
    recipes.push(new Recipe(recipeId++, getValue('new-recipe-name')));
    drawDOM();
});

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

function getValue(id) {
    return document.getElementById(id).value;
}

function drawDOM() {
    let recipeDiv = document.getElementById('recipes');
    clearElement(recipeDiv);
    for (recipe of recipes) {
        let table = createRecipeTable(recipe);
        let title = document.createElement('h2');
        title.innerHTML = recipe.name;
        title.appendChild(createDeleteRecipeButton(recipe));
        recipeDiv.appendChild(title);
        recipeDiv.appendChild(table);
        for (ingredient of recipe.ingredients) {
            createIngredientRow(recipe, table, ingredient);
        }
    }
}

function createIngredientRow(recipe, table, ingredient) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = ingredient.name;
    row.insertCell(1).innerHTML = ingredient.amount;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(recipe, ingredient));
}

function createDeleteRowButton (recipe, ingredient) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = recipe.ingredients.indexOf(ingredient);
        recipe.ingredients.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createDeleteRecipeButton(recipe) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete Recipe';
    btn.onclick = () => {
        let index = recipes.indexOf(recipe);
        recipes.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createNewIngredientButton(recipe) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        recipe.ingredients.push(new Ingredient(getValue(`name-input-${recipe.id}`), getValue(`amount-input-${recipe.id}`)));
        drawDOM();
    };
    return btn;
}

function createRecipeTable(recipe) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let amountColumn = document.createElement('th');
    nameColumn.innerHTML = 'Ingredient Name';
    amountColumn.innerHTML = 'Amount';
    row.appendChild(nameColumn);
    row.appendChild(amountColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let amountTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${recipe.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let amountInput = document.createElement('input');
    amountInput.setAttribute('id', `amount-input-${recipe.id}`);
    amountInput.setAttribute('type', 'text');
    amountInput.setAttribute('class', 'form-control');
    let newIngredientButton = createNewIngredientButton(recipe);
    nameTh.appendChild(nameInput);
    amountTh.appendChild(amountInput);
    createTh.appendChild(newIngredientButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(amountTh);
    formRow.appendChild(createTh);
    return table;
}

function clearElement (element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}