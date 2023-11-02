const pokedex = document.getElementById('pokedex');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.toLowerCase();
  fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
    .then(response => response.json())
    .then(pokeData => {
      pokedex.innerHTML = '';
      createPokemonCard(pokeData);
    })
    .catch(error => {
      pokedex.innerHTML = `<h3>No se encontró el Pokémon "${searchTerm}"</h3>`;
    });
});

fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
  .then(response => response.json())
  .then(data => {
    const pokemon = data.results;
    pokemon.forEach(p => {
      fetchPokemonData(p);
    });
  });

function fetchPokemonData(pokemon) {
  let url = pokemon.url;

  fetch(url)
    .then(response => response.json())
    .then(pokeData => {
      createPokemonCard(pokeData);
    });
}

function createPokemonCard(pokemon) {
  const card = document.createElement('div');
  card.classList.add('card');

  const imgContainer = document.createElement('div');
  imgContainer.classList.add('img-container');

  const img = document.createElement('img');
  img.src = pokemon.sprites.front_default;

  const name = document.createElement('h3');
  name.innerText = pokemon.name;

  const types = document.createElement('p');
  types.innerText = `Tipo: ${pokemon.types.map(type => type.type.name).join(', ')}`;

  imgContainer.appendChild(img);
  card.appendChild(imgContainer);
  card.appendChild(name);
  card.appendChild(types);
  pokedex.appendChild(card);
}
