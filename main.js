var allCategories = [];
var categoryFilter = [];

Load();

function Load()
{
    fetch("data.json")
    .then(response => response.json())
    .then(data => {
        var content = "";
        data.forEach(element => {
            element.category.forEach(category => {
            if (!allCategories.includes(category.toLowerCase())) {
                allCategories.push(category.toLowerCase());
            }
        });

            if (categoryFilter.length <= 0 
                || categoryFilter.every(c => {return element.category.includes(c.toLowerCase());}))
            {
                categories =
                `<span class="category-box">
                    ${element.category.join("</span><span class='category-box'>")}
                </span>`;
    
                content += `<div class="problem-container">
                    <p class="problem-name">${element.name}</p>
                    <p class="problem-difficulty">${element.difficulty}</p>
                    <p class="problem-points">${element.points} points</p>
                    <p class="categories">${categories}</p>
                    <a class="problem-link link-btn" href="${element.link}" target="_blank">Go to AtCoder</a>
                </div>`;
            }
        });
        document.getElementById("content").innerHTML = content;
    })
    .catch(error => console.error("Error loading data:", error));

    SearchFilter("");
};

function AddFilter(categoryName)
{
    if (!categoryFilter.includes(categoryName))
    {
        categoryFilter.push(categoryName);
    }

    Load();
    RenderFilter();
}

function RemoveFilter(categoryName)
{
    const index = categoryFilter.indexOf(categoryName);
    if (index > -1)
    {
        categoryFilter.splice(index, 1);
    }

    Load();
    RenderFilter();
}

function SearchFilter(categoryName)
{
    var searched = [];
    if (categoryName === "")
    {
        allCategories.forEach(categories => searched.push(categories.toLowerCase()));
    }
    else
    {
        allCategories.forEach(categories => {
            if (categories.includes(categoryName.toLowerCase()))
            {
                searched.push(categories.toLowerCase());
            }
        });
    }

    var content = "";
    searched.forEach(categories => {
        content += `<button class="category-item" onclick="AddFilter('${categories}')">${categories}</button>`;
    });

    // console.log(content);

    document.getElementById("category-list").innerHTML = content;
}

function ClearFilter()
{
    categoryFilter = [];
    Load();
    RenderFilter();
}

function RenderFilter()
{
    var content = "";
    categoryFilter.forEach(categories => {
        content += `<button class="category-item" onclick="RemoveFilter('${categories}')">${categories}</button>`;
    });

    document.getElementById("category-filters-list").innerHTML = content;
}