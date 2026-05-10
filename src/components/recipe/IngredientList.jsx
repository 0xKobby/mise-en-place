// Clean ingredient list with checkboxes for cooking mode
import { useState } from 'react'

export default function IngredientList({ ingredients }) {
  // Track which ingredients have been checked off (local state only, not persisted)
  const [checkedItems, setCheckedItems] = useState({})
  
  const toggleCheck = (index) => {
    setCheckedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }
  
  return (
    <ul className="space-y-2">
      {ingredients.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <input
            type="checkbox"
            id={`ingredient-${index}`}
            checked={checkedItems[index] || false}
            onChange={() => toggleCheck(index)}
            className="mt-1 w-4 h-4 text-saffron border-gray-300 rounded focus:ring-saffron"
          />
          <label
            htmlFor={`ingredient-${index}`}
            className={`flex-1 cursor-pointer transition-opacity ${
              checkedItems[index] ? 'opacity-50 line-through' : ''
            }`}
          >
            <span className="font-medium text-charcoal">{item.measure}</span>
            {' '}
            <span className="text-muted">{item.ingredient}</span>
          </label>
        </li>
      ))}
    </ul>
  )
}