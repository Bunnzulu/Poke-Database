var SearchCatagory = "pokemon"
var SilderIndex = 0
const ImageOptions = ["front_default", "back_default", "front_shiny", "back_shiny", "front_female","back_female","front_shiny_female","back_shiny_female"]
var ImgCaption = "Front Sprite"
let Images = []
let TypeColors = {"normal":"#A8A77A","fire":"#EE8130","water":"#6390F0","electric":"#F7D02C","grass":"#7AC74C","ice":"#96D9D6","fighting":"#C22E28","poison":"#A33EA1","ground":"#E2BF65","flying":"#A98FF3","psychic":"#F95587","bug":"#A6B91A","rock":"#B6A136","ghost":"#735797","dragon":"#6F35FC","dark":"#705746","steel":"#B7B7CE","fairy":"#D685AD"}
// Meanings of hexcode colors
// fire: red
// water: blue
// electric: yellow
// grass: green
// ice: light blue
// fighting: red
// poison: purple
// ground: brown
// flying: light blue
// psychic: pink
// bug: green
// rock: brown
// ghost: purple
// dragon: purple
// dark: brown
// steel: grey
// fairy: pink

let Mode = "Dark"

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
    SearchCatagory = ID
}

// Set Up Page
Array.from(document.getElementById("SearchOptions").children).forEach(element => {
    element.onclick = function() {
        Pick_Selection(element.id)
    }
});

function Display_Data(data, catagory) {
    let Name = data.name.charAt(0).toUpperCase() + data.name.slice(1)
    switch (catagory) {
        case "pokemon":
        Name = data.name.charAt(0).toUpperCase() + data.name.slice(1)
        let Type1 = data.types[0].type.name.charAt(0).toUpperCase() + data.types[0].type.name.slice(1)
        let Type2 = data.types.length > 1 ? data.types[1].type.name.charAt(0).toUpperCase() + data.types[1].type.name.slice(1) : ""
        let Types = Type2 == "" ? Type1 : `${Type1}/${Type2}`
        let Abilty1 = data.abilities[0].ability["name"].charAt(0).toUpperCase() + data.abilities[0].ability["name"].slice(1)
        let Abilty2 = data.abilities.length > 1 ? data.abilities[1].ability["name"].charAt(0).toUpperCase() + data.abilities[1].ability["name"].slice(1) : "None"
        let Color1 = TypeColors[Type1.toLowerCase()]
        Images = data.sprites
        document.getElementById("Results").innerHTML = `
            <h1 style="color: ${Color1};" id="PokeName">${Name}</h1><br>
            <div class="ImageContainer">
                <figure>
                <img id="PokeImage" src="${Images[ImageOptions[SilderIndex]]}" alt="${Name}'s ${ImageOptions[SilderIndex]}">
                <figcaption id="PokeImageCaption">${ImgCaption}</figcaption>
                </figure>
            <div class="SliderControls">
                <button class="ImgControlButtons" onclick="prevSlide()">Prev</button>
                <button class="ImgControlButtons" onclick="nextSlide()">Next</button>
            </div>
            </div>
            <div id="PokeInfo" class="Left">
            <h2>Type: ${Types}</h2>
            <p>Height: ${data.height} inches</p>
            <p>Weight: ${data.weight} lbs</p>
            <p>Abilty 1: ${Abilty1}</p>
            <p>Abilty 2: ${Abilty2}</p>
            </div>
            <div id="PokeStats" class="Right">
            <h2>Stats</h2>
            <p>HP: ${data.stats[0].base_stat}</p>
            <p>Attack: ${data.stats[1].base_stat}</p>
            <p>Defense: ${data.stats[2].base_stat}</p>
            <p>Special Attack: ${data.stats[3].base_stat}</p>
            <p>Special Defense: ${data.stats[4].base_stat}</p>
            <p>Speed: ${data.stats[5].base_stat}</p>
            </div>
        `;
            break;
        
        case "type":
            Name = data.name.charAt(0).toUpperCase() + data.name.slice(1)
            let zerodamageto = data.damage_relations.no_damage_to.length > 0 ? data.damage_relations.no_damage_to: [{name:"None"}]
            let zerodamagefrom = data.damage_relations.no_damage_from.length > 0 ? data.damage_relations.no_damage_from: [{name:"None"}]
            document.getElementById("Results").innerHTML = `
            <h1>${Name}</h1><br>
            <div id="Offensive" class="Left">
            <table>
            <tr>
            <th class="TableName">Offensive</th>
            </tr>
            <tr>
            <th>2x Damage to:<th>
            ${data.damage_relations.double_damage_to.map(type => `<td>${type.name.charAt(0).toUpperCase() + type.name.slice(1)}</td>`).join("")}
            </tr>
            <tr>
            <th>1/2x Damage to:<th>
            ${data.damage_relations.half_damage_to.map(type => `<td>${type.name.charAt(0).toUpperCase() + type.name.slice(1)}</td>`).join("")}
            </tr>
            <tr>
            <th>0x Damage to:<th>
            ${zerodamageto.map(type => `<td>${type.name.charAt(0).toUpperCase() + type.name.slice(1)}</td>`).join("")}
            </tr>
            </table>
            </div>

            <div id="TypeofPoke">
            <h2>${Name} Pokemon</h2>
            ${data.pokemon.map(type => `<p>${type.pokemon.name.charAt(0).toUpperCase() + type.pokemon.name.slice(1)}</p>`).join("")}
            </div>
            <div id="TypeofMove">
            <h2>${Name} Moves</h2>
            ${data.moves.map(move => `<p>${move.name.charAt(0).toUpperCase() + move.name.slice(1)}</p>`).join("")}
            </div>

            <div id="Defensive" class="Right">
            <table>
            <tr>
            <th class="TableName">Defensive</th>
            </tr>
            <tr>
            <th>2x Damage from:<th>
            ${data.damage_relations.double_damage_from.map(type => `<td>${type.name.charAt(0).toUpperCase() + type.name.slice(1)}</td>`).join("")}
            </tr>
            <tr>
            <th>1/2x Damage from:<th>
            ${data.damage_relations.half_damage_from.map(type => `<td>${type.name.charAt(0).toUpperCase() + type.name.slice(1)}</td>`).join("")}
            </tr>
            <tr>
            <th>0x Damage from:<th>
            ${zerodamagefrom.map(type => `<td>${type.name.charAt(0).toUpperCase() + type.name.slice(1)}</td>`).join("")}
            </tr>
            </table>
            </div>
            `;
            break;
        
        case "ability":
            console.log(data)
            Name = data.name.charAt(0).toUpperCase() + data.name.slice(1)
            let Effect = data.effect_entries[0].language.name === "en" ? data.effect_entries[0].effect : data.effect_entries[1].effect
            document.getElementById("Results").innerHTML = `
                <h1>${Name}</h1>
                <div id="AbilityInfo" class="Left">
                <h2>Effect</h2>
                <p>${Effect}</p>
                </div>
                <div id="PokewAbility">
                <h2>Pokemon with ${Name}</h2>
                ${data.pokemon.map(poke => `<p>${poke.pokemon.name.charAt(0).toUpperCase() + poke.pokemon.name.slice(1)}</p>`).join("")}
                </div>
                <div id="DateAdded" class="Right">
                <h2>Date Added</h2>
                <p>${data.generation.name.charAt(0).toUpperCase() + data.generation.name.slice(1)}</p>
                </div>
            `;
            break;
        
        case "pokemon-species":
            console.log(data)
            Name = data.name.charAt(0).toUpperCase() + data.name.slice(1)
            let prevevo = data.evolves_from_species == null ? "Nothing" : data.evolves_from_species.name.charAt(0).toUpperCase() + data.evolves_from_species.name.slice(1)
            let flavortext = data.flavor_text_entries.filter(entry => entry.language.name === "en")
            document.getElementById("Results").innerHTML = `
                <h1>${Name}</h1>
                <div id="SpeciesInfo" class="Left">
                <h2>Egg Group:</h2>
                ${data.egg_groups.map(egg => `<p>${egg.name.charAt(0).toUpperCase() + egg.name.slice(1)}</p><br>`).join("")}
                <h2>Color:</h2>
                <p>${data.color.name.charAt(0).toUpperCase() + data.color.name.slice(1)}</p>
                </div>

                <div id="Evolution">
                <h2>Evolution Chain</h2>
                <p>Evolves from ${prevevo}</p>
                </div>

                <div id="SpeciesDesc" class="Right">
                <h2>Description</h2>
                <p>${flavortext[flavortext.length - 1].flavor_text}</p>
                </div>
            `;
    }

}

function Search(term) {
    fetch(`https://pokeapi.co/api/v2/${SearchCatagory}/${term}`)
    .then(response => response.json()) // Getting the JSON data from the response, and returning another promise
    .then(data => Display_Data(data,SearchCatagory)) // Displaying the data to the user
    .catch(error => {
        console.error(error)
        alert("No Results Found, Try Again later")
    })
}

document.getElementById("SearchButton").onclick = function() {
    let term = document.getElementById("SearchInput").value
    term = term.charAt(0).toLowerCase() + term.slice(1)
    Search(term)
}

document.getElementById("SearchInput").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        document.getElementById("SearchButton").click()
    }
})

function prevSlide() {
    SilderIndex--
    if(SilderIndex < 0) {
        SilderIndex = 7
    };
    if (Images[ImageOptions[SilderIndex]] == null) {
        prevSlide()
    }
    document.getElementById("PokeImage").src = Images[ImageOptions[SilderIndex]]
    SetCaption(SilderIndex)

}

function nextSlide() {
    SilderIndex++
    if(SilderIndex > 7) {
        SilderIndex = 0
    };
    if (Images[ImageOptions[SilderIndex]] == null) {
        nextSlide()
    }
    document.getElementById("PokeImage").src = Images[ImageOptions[SilderIndex]]
    SetCaption(SilderIndex)
}

function SetCaption(Index) {
    if (Index % 2 == 0) {
        ImgCaption = "Front "
    } else {
        ImgCaption = "Back "
    }
    if (Index == 2 || Index == 3 || Index == 6 || Index == 7) {
        ImgCaption += "Shiny "
    } 
    if (Index > 3) {
        ImgCaption += "Female "
    } else {
        ImgCaption += "Male "
    }
    ImgCaption += "Sprite"
    document.getElementById("PokeImageCaption").innerText = ImgCaption
}

function ModeChange(){
    let texts = ["p","h1","h2","h3","label","figcaption","th","td"]
    if (Mode == "Light") {
        document.body.style.backgroundColor = "white"
        document.body.style.color = "black"
        document.getElementById("ModeSwitch").style.backgroundColor = "Black"
        document.getElementById("SearchOptions").style.backgroundColor = "White"
        document.getElementById("SearchInput").style.color = "White"
        document.getElementById("SearchInput").style.backgroundColor = "Black"
        for (let i = 0; i < texts.length; i++) {
            Array.from(document.getElementsByTagName(texts[i])).forEach(element => {
                if (element.id !== "PokeName"){
                    element.style.color = "black"
                }
            });
        }
        Array.from(document.getElementsByTagName("button")).forEach(element => {
            if (element.classList.contains("Enabled")){
                element.style.backgroundColor = "red"
            } else {
                element.style.backgroundColor = "black"
                element.style.color = "white"
            }
        });
    } else {
        document.body.style.backgroundColor = "black"
        document.body.style.color = "white"
        document.getElementById("ModeSwitch").style.backgroundColor = "White"
        document.getElementById("SearchOptions").style.backgroundColor = "Black"
        document.getElementById("SearchInput").style.color = "Black"
        document.getElementById("SearchInput").style.backgroundColor = "White"
        for (let i = 0; i < texts.length; i++) {
            Array.from(document.getElementsByTagName(texts[i])).forEach(element => {
                if (element.id !== "PokeName"){
                    element.style.color = "white"
                }
            });
        }
        Array.from(document.getElementsByTagName("button")).forEach(element => {
            if (element.classList.contains("Enabled") || element.id == "SearchButton"){
                element.style.backgroundColor = "red"
                if (element.classList.contains("Enabled")){
                    element.style.color = "black"
                }
            } else if (element.classList.contains("Disabled")){
                element.style.backgroundColor = "black"
                element.style.color = "red"

            } else {
                element.style.backgroundColor = "white"
                element.style.color = "black"
            }
        });
    }
}

document.getElementById("ModeSwitch").onclick = function() {
    if (Mode == "Light") {
        Mode = "Dark"
    } else {
        Mode = "Light"
    }
    ModeChange()
}

setInterval(ModeChange,10)