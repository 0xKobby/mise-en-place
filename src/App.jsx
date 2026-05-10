// Main application component — configures all routes and layout structure
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Browse from './pages/Browse'
import RecipePage from './pages/RecipePage'
import Cookbook from './pages/Cookbook'
import MealPlanner from './pages/MealPlanner'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route path="/cookbook" element={<Cookbook />} />
          <Route path="/meal-planner" element={<MealPlanner />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  )
}