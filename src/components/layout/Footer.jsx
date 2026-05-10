// Footer with app info and attribution
export default function Footer() {
  return (
    <footer className="bg-olive text-parchment mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-sm mb-2">
            &copy; {new Date().getFullYear()} Mise en Place — Your Personal Recipe Companion
          </p>
          <p className="text-xs text-parchment/70">
            Recipe data provided by{' '}
            <a 
              href="https://www.themealdb.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-saffron transition-colors"
            >
              TheMealDB
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}