interface Sprites {
  front_default: string | null;
  back_default: string | null;
  other: {
    showdown: {
      front_default: string | null;
      back_default: string | null;
      front_female: string | null;
      back_female: string | null;
    };
  };
}
interface Cries {
  latest: string;
}
interface PokemonType {
  slot: number;
  type: {
    name: string;
  };
}
interface evolves {
  species: {
    name: string;
    url: string;
  };
  evolves_to?: evolves[];
}
interface ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
}
export interface flavourText {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
}

export interface PokemonEvoChain {
  chain: {
    evolves_to: evolves[];
    species: {
      name: string;
      url: string;
    };
  };
  id: number;
}
export interface PokemonSpicies {
  evolution_chain: {
    url: string;
  };
  flavor_text_entries: flavourText[];
}
export interface Pokemons {
  name: string;
  url: string;
}

export interface PokemonDetails {
  name: string;
  sprites: Sprites;
  cries: Cries;
  types: PokemonType[];
  id: number;
  weight: number;
  height: number;
  abilities: ability[];
  species: {
    name: string;
    url: string;
  };
}
