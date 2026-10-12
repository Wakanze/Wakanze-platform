import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold text-gray-900">Page not found</h1>
      <Link to="/" className="mt-4 inline-block text-emerald-700 underline">
        Back to home
      </Link>
    </main>
  )
}