import './styles/PokemonList.css';

export default function PokemonList({ pokemon }) {
  return (
    <div className="pokemon-grid">
      {pokemon.map((p) => (
        <div key={p.name} className="pokemon-card">
          <img src={p.image} alt={p.name} className="pokemon-image" />
          <div>{p.name}</div>
          <div>Height: {p.height}</div>
          <div>Weight: {p.weight}</div>
          <div>Abilities: {p.abilities.join(', ')}</div>
          <div>Defense: {p.defense}</div>
          <div>Attributes: {p.attributes.join(', ')}</div>
        </div>
      ))}
    </div>
  );
}
