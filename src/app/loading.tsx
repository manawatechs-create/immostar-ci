export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <span className="loader mb-4"></span>
        <p className="text-gray-500 mt-4 animate-pulse">Chargement...</p>
      </div>
    </div>
  )
}
