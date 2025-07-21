import { useState, useEffect } from 'react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [catRes, areaRes] = await Promise.all([
          fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list'),
          fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list'),
        ]);
        const catData = await catRes.json();
        const areaData = await areaRes.json();
        setCategories(catData.meals || []);
        setAreas(areaData.meals || []);
      } catch (error) {
        console.error('Failed to fetch filters:', error);
      }
    };
    fetchFilters();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
      const res = await fetch(url);
      const data = await res.json();
      let meals = data.meals || [];

      // Filter by category and area if selected
      if (selectedCategory) {
        meals = meals.filter((meal) => meal.strCategory === selectedCategory);
      }
      if (selectedArea) {
        meals = meals.filter((meal) => meal.strArea === selectedArea);
      }

      setRecipes(meals);
    } catch (error) {
      console.error('Error fetching meals:', error);
      setRecipes([]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 px-4 pt-10">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">🍽️ Recipe Finder</h1>

        {/* 🔍 Search Input */}
        <div className="relative w-full mb-4">
          <input
            type="text"
            placeholder="Search for a recipe"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              title="Clear search"
            >
              ✖
            </button>
          )}
        </div>

        {/* Category Dropdown */}
        <select
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat.strCategory}>
              {cat.strCategory}
            </option>
          ))}
        </select>

        {/* Area Dropdown */}
        <select
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
        >
          <option value="">All Areas</option>
          {areas.map((area, idx) => (
            <option key={idx} value={area.strArea}>
              {area.strArea}
            </option>
          ))}
        </select>

        {/* 🌈 Gradient Search Button */}
        <button
          onClick={handleSearch}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Search
        </button>
      </div>

      {/* 🧾 Recipe Results */}
      <div className="mt-10 w-full max-w-6xl">
        {loading && <p className="text-center text-lg text-blue-600">Loading recipes...</p>}
        {!loading && recipes.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No recipes found. Try a different search.</p>
        )}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 mt-6">
          {recipes.map((meal) => (
            <div
              key={meal.idMeal}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-all overflow-hidden"
            >
              <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{meal.strMeal}</h2>
                <p className="text-sm text-gray-500">{meal.strArea} | {meal.strCategory}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
