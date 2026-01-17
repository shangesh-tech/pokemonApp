const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemonList = async (limit = 2000) => {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);
  const data = await response.json();
  return data.results;
};

export const fetchPokemonDetails = async (name: string) => {
  const response = await fetch(`${BASE_URL}/pokemon/${name}`);
  return await response.json();
};

export const fetchPokemonImageUrl = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data.sprites.other['official-artwork'].front_default;
};
