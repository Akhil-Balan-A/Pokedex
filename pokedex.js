const axios = require("axios");
const XLSX = require("xlsx");

async function fetchPokemon() {
  const list = [];

  const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=2000");

  for (let i = 0; i < res.data.results.length; i++) {
    const url = res.data.results[i].url;
    const poke = await axios.get(url);

    const name = poke.data.name;
    const types = poke.data.types.map(t => t.type.name);

    list.push({
      No: i + 1,
      Name: name,
      Form: "Normal",
      Type1: types[0] || "",
      Type2: types[1] || ""
    });

    console.log(`Fetched: ${name}`);
  }

  const worksheet = XLSX.utils.json_to_sheet(list);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Pokedex");

  XLSX.writeFile(workbook, "full_pokedex.xlsx");
}

fetchPokemon();