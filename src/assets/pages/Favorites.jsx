import { useEffect, useState } from "react";
import Recipe from "../components/Recipe";
import { Link } from "react-router-dom";
import { FaHeartBroken } from "react-icons/fa";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const removeFromFavorites = (idMeal) => {
    const updated = favorites.filter((recipe) => recipe.idMeal !== idMeal);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div>
      <div>
        <h2>Your Favorite Recipes</h2>
        <Link to="/">← Back to Home</Link>
      </div>
      
      {favorites.length === 0 ? (
        <div>
          <FaHeartBroken />
          <p>No favorites yet. Go add some!</p>
          <Link to="/">Explore recipes →</Link>
        </div>
      ) : (
        <div>
          {favorites.map((recipe) => (
            <Recipe
              key={recipe.idMeal}
              id={recipe.idMeal}
              title={recipe.strMeal}
              description={recipe.strCategory}
              image={recipe.strMealThumb}
              instructions={recipe.strInstructions}
              ingredients={[
                recipe.strIngredient1,
                recipe.strIngredient2,
                recipe.strIngredient3,
                recipe.strIngredient4,
                recipe.strIngredient5,
              ]}
              youtube={recipe.strYoutube}
              area={recipe.strArea}
              tags={recipe.strTags}
              onRemove={() => removeFromFavorites(recipe.idMeal)}
              isFavoritePage={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
