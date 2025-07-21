import React from "react";
import { FaList, FaUtensils, FaYoutube, FaHeart, FaTrash, FaTag } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Recipe({
  title,
  description,
  image,
  instructions,
  ingredients = [],
  youtube,
  area,
  tags,
  onSave,
  onRemove,
  isFavoritePage = false,
  id,
}) {
  const filteredIngredients = ingredients.filter(Boolean);

  const displayInstructions = instructions
    ? instructions.length > 200
      ? instructions.slice(0, 200).replace(/\\s+\\S*$/, "") + "..."
      : instructions
    : "Instructions not available.";

  const tagList = tags ? tags.split(",").map(tag => tag.trim()) : [];

  return (
    <div>
      <img src={image} alt={title} />

      {tagList.length > 0 && (
        <div>
          {tagList.map((tag) => (
            <span key={tag}>
              <FaTag /> {tag}
            </span>
          ))}
        </div>
      )}

      <h3>{title}</h3>
      <p>{description}{area ? ` • ${area}` : ""}</p>

      <div>
        <p><FaList /> Ingredients:</p>
        {filteredIngredients.length > 0 ? (
          <ul>
            {filteredIngredients.map((ing, idx) => (
              <li key={idx}>{ing}</li>
            ))}
          </ul>
        ) : (
          <p>No ingredients listed.</p>
        )}
      </div>

      <div>
        <p><FaUtensils /> Instructions:</p>
        <p>{displayInstructions}</p>
      </div>

      {youtube && (
        <a href={youtube} target="_blank" rel="noreferrer">
          <FaYoutube /> Watch Video
        </a>
      )}

      <div>
        {!isFavoritePage && (
          <button onClick={onSave}>
            <FaHeart /> Save to Favorites
          </button>
        )}

        {isFavoritePage && (
          <button onClick={onRemove}>
            <FaTrash /> Remove
          </button>
        )}

        {id && (
          <Link to={`/recipe/${id}`}>
            View Details
          </Link>
        )}
      </div>
    </div>
  );
}
