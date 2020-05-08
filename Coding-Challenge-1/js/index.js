let form = document.querySelector(".submitB");

function fetchMeal()
{
    let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

    let settings = {
        method: 'GET'
    };

    form.addEventListener('click', (e) => {
        e.preventDefault();
        console.log("Hello");
        let meal = document.querySelector('#query').nodeValue;

        fetch(url, settings).then(response => {
            if (response.ok)
            {
                return response.json();
            }
            throw new Error(response.statusText);
        }).then(responseJSON => {
            displayMeal(responseJSON);
        }).catch(error => {
            console.log(error);
        })
    })
}

function displayMeal(meal)
{
    let res = document.querySelector('.js-search-results');

    res.innerHTML = "";

    for (let i = 0; i < meal.meals.length; i++)
    {
        res.innerHTML +=`
                <div>
                    <h2> ${meal.meals[i].strMeal} </h2>
                    <h3> ${meal.meals[i].strArea} </h3>
                    <p> ${meal.meals[i].strInstructions} </p>
                    <div>
                        <img src="${meal.meals[i].strMealThumb}" />
                    </div>
                </div>`;
    }
    
}

fetchMeal();