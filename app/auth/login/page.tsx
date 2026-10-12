'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Heart, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError(result.error)
      } else if (result?.ok) {
        router.push('/dashboard')
      }
    } catch (err) {
      setError('Ein Fehler ist aufgetreten')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brk-red to-red-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-white" fill="white" />
            <span className="text-2xl font-bold text-white">BRK Bayern</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Anmelden</h1>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex gap-3 items-start">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email-Adresse
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="deine@email.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brk-red focus:ring-2 focus:ring-brk-red/20 outline-none transition-all"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Passwort
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brk-red focus:ring-2 focus:ring-brk-red/20 outline-none transition-all"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 px-6 py-3 bg-brk-red text-white rounded-xl font-semibold hover:bg-brk-darkred disabled:opacity-50 transition-colors"
            >
              {isLoading ? 'Wird angemeldet...' : 'Anmelden'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">oder</span>
            </div>
          </div>

          {/* Test Credentials */}
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-sm font-medium text-blue-900 mb-2">Test-Zugänge:</p>
            <p className="text-xs text-blue-700 mb-1">
              <strong>Freiwilliger:</strong> volunteer@brk.de / password123
            </p>
            <p className="text-xs text-blue-700">
              <strong>Admin:</strong> admin@brk.de / admin123
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-white hover:text-gray-100 font-medium">
            ← Zurück zur Startseite
          </Link>
        </div>
      </div>
    </div>
  )
}
