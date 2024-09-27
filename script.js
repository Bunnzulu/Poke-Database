var SearchCatagory = "pokemon/"

function Turn_Off_Selection(){
    let btns = document.getElementById("SearchOptions").children
    for (let i = 0; i < btns.length; i++) {
        btns[i].classList.replace("Enabled", "Disabled")
    }
}

function Pick_Selection(ID) {
    Turn_Off_Selection()
    let btn = document.getElementById(ID)
    btn.classList.replace("Disabled", "Enabled")
    SearchCatagory = ID + "/"
}

// Set Up Page
Array.from(document.getElementById("SearchOptions").children).forEach(element => {
    element.onclick = function() {
        Pick_Selection(element.id)
    }
});

function Search(term) {
    fetch(`https://pokeapi.co/api/v2/${SearchCatagory}${term}`)
    .then(response => response.json()) // Getting the JSON data from the response, and returning another promise
    .then(data => console.log(data)) // Logging the data
    .catch(error => console.error(error))
}

document.getElementById("SearchButton").onclick = function() {
    Search(document.getElementById("SearchInput").textContent)
}