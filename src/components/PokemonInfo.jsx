import { useState, useEffect } from 'react';
import PokemonErrorView from './PokemonErrorView';
import PokemonDataView from './PokemonDataView';
import PokemonPendingView from './PokemonPendingView';
import pokemonAPI from 'components/services/pokemon-api';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function PokemonInfo({ pokemonName }) {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (!pokemonName) {
      return;
    }
    
    setStatus(Status.PENDING);

    setTimeout(() => {
      pokemonAPI
        .fetchPokemon(pokemonName)
        .then(pokemon => {
          setPokemon(pokemon);
          setStatus(Status.RESOLVED);
        })
        .catch(error => {
          setError(error);
          setStatus(Status.REJECTED);
        });
    }, 2000);
  }, [pokemonName]);

  if (status === Status.IDLE) {
    return <div>input name pokemon</div>;
  }

  if (status === Status.PENDING) {
    return <PokemonPendingView pokemonName={pokemonName} />;
  }

  if (status === Status.REJECTED) {
    return <PokemonErrorView message={error.message} />;
  }

  if (status === Status.RESOLVED) {
    return <PokemonDataView pokemon={pokemon} />;
  }
}
