import { Routes, Route } from "react-router-dom";
import Header from "./assets/components/Header";
import Footer from "./assets/components/footer";
import Home from "./assets/pages/Home";
import Favorites from "./assets/pages/Favorites";
import SingleRecipe from "./assets/pages/SingleRecipe";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 my-7">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/recipe/:id" element={<SingleRecipe />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
