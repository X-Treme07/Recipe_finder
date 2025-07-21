import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function SingleRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await res.json();
        setRecipe(data.meals?.[0]);
      } catch (err) {
        console.error("Failed to fetch recipe:", err);
      }
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) return <p>Loading recipe...</p>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ing && ing.trim()) {
      ingredients.push(`${ing} - ${measure || ''}`);
    }
  }

  const tagList = recipe.strTags ? recipe.strTags.split(',').map(t => t.trim()) : [];

  return (
    <div>
      <button onClick={() => navigate('/')}>← Back to Home</button>

      <h1>{recipe.strMeal}</h1>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />

      <div>
        <div>
          <h2>Ingredients</h2>
          {ingredients.length > 0 ? (
            <ul>
              {ingredients.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          ) : (
            <p>No ingredients listed.</p>
          )}

          <p>Category: {recipe.strCategory} | Area: {recipe.strArea}</p>
          {tagList.length > 0 && (
            <div>
              {tagList.map(tag =>
                <span key={tag}>{tag}</span>
              )}
            </div>
          )}
        </div>

        <div>
          <h2>Instructions</h2>
          <p>{recipe.strInstructions}</p>

          {recipe.strYoutube && (
            <a href={recipe.strYoutube} target="_blank" rel="noreferrer">
              📺 Watch on YouTube
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
