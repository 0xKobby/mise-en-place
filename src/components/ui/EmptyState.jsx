// Empty state component for when no results are found
export default function EmptyState({ message, icon = '🔍' }) {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-heading font-semibold text-charcoal mb-2">
        No recipes found
      </h3>
      <p className="text-muted">
        {message || 'Try adjusting your search or browse our categories'}
      </p>
    </div>
  )
}