import errorImage from '../img/error.png';

export default function PokemonErrorView({ message }) {
  return (
    <div role="alert">
      <img src={errorImage} width="240" alt="error" />
      {message}
    </div>
  );
}
