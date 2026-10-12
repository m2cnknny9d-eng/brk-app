'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Heart, LogOut, Settings, Menu, Plus, Trash2, CheckCircle } from 'lucide-react'

interface Invite {
  id: string
  email: string
  group: {
    id: string
    name: string
  }
  usedAt: string | null
  usedBy?: string
  expiresAt: string
  createdAt: string
}

export default function AdminPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [invites, setInvites] = useState<Invite[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [newInviteEmail, setNewInviteEmail] = useState('')
  const [selectedGroup, setSelectedGroup] = useState('group_2') // SEG Behandlung
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Redirect if not admin
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    } else if (status === 'authenticated' && !session?.user?.isAdmin) {
      router.push('/dashboard')
    }
  }, [status, router, session?.user?.isAdmin])

  // Load invites
  useEffect(() => {
    if (session?.user?.isAdmin) {
      loadInvites()
    }
  }, [session?.user?.isAdmin])

  const loadInvites = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/admin/invites')
      if (response.ok) {
        const data = await response.json()
        setInvites(data.invites || [])
      }
    } catch (error) {
      console.error('Failed to load invites:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newInviteEmail || !selectedGroup) return

    setIsSubmitting(true)
    setMessage(null)

    try {
      const response = await fetch('/api/admin/invites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: newInviteEmail,
          groupId: selectedGroup,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: data.message })
        setNewInviteEmail('')
        setInvites([data.invite, ...invites])
      } else {
        setMessage({ type: 'error', text: data.error || 'Fehler beim Erstellen der Einladung' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Ein Fehler ist aufgetreten' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteInvite = async (inviteId: string) => {
    if (!confirm('Möchtest du diese Einladung wirklich löschen?')) return

    try {
      const response = await fetch(`/api/admin/invites/${inviteId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setInvites(invites.filter((i) => i.id !== inviteId))
        setMessage({ type: 'success', text: 'Einladung gelöscht' })
      } else {
        setMessage({ type: 'error', text: 'Fehler beim Löschen' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Ein Fehler ist aufgetreten' })
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
        <Heart className="w-12 h-12 text-brk-red animate-pulse" fill="currentColor" />
      </div>
    )
  }

  if (!session?.user?.isAdmin) return null

  return (
    <div className="min-h-screen bg-brk-gray dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-brk-red" fill="currentColor" />
              <span className="text-xl font-bold text-brk-text dark:text-white">
                BRK Admin
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-6">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <strong>{session.user?.name}</strong>
              </div>
              <button
                onClick={() => router.push('/dashboard')}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                Zum Dashboard
              </button>
              <button
                onClick={() => router.push('/api/auth/signout')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className="sm:hidden">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-brk-text dark:text-white mb-2">
            Admin Panel
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Verwalte Einladungen für SEG Behandlung Nördlingen
          </p>
        </div>

        {/* Messages */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-xl ${
              message.type === 'success'
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
                : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Create Invite Form */}
        <div className="widget mb-8">
          <h2 className="widget-header">Neue Einladung erstellen</h2>

          <form onSubmit={handleCreateInvite} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email-Adresse
              </label>
              <input
                type="email"
                value={newInviteEmail}
                onChange={(e) => setNewInviteEmail(e.target.value)}
                placeholder="benutzer@example.com"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white focus:border-brk-red focus:ring-2 focus:ring-brk-red/20 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Gruppe
              </label>
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white focus:border-brk-red focus:ring-2 focus:ring-brk-red/20 outline-none"
              >
                <option value="group_2">SEG Behandlung Nördlingen</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-brk-red text-white rounded-lg font-semibold hover:bg-brk-darkred disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              {isSubmitting ? 'Wird erstellt...' : 'Einladung erstellen'}
            </button>
          </form>
        </div>

        {/* Invites List */}
        <div className="widget">
          <h2 className="widget-header">Einladungen</h2>

          {isLoading ? (
            <div className="text-center py-8 text-gray-500">Wird geladen...</div>
          ) : invites.length === 0 ? (
            <div className="text-center py-8 text-gray-500">Keine Einladungen erstellt</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold">Email</th>
                    <th className="text-left py-3 px-4 font-semibold">Gruppe</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 font-semibold">Erstellt</th>
                    <th className="text-left py-3 px-4 font-semibold">Aktion</th>
                  </tr>
                </thead>
                <tbody>
                  {invites.map((invite) => (
                    <tr
                      key={invite.id}
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700/50"
                    >
                      <td className="py-3 px-4">{invite.email}</td>
                      <td className="py-3 px-4">{invite.group.name}</td>
                      <td className="py-3 px-4">
                        {invite.usedAt ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs font-medium">
                            <CheckCircle className="w-3 h-3" />
                            Verwendet
                          </span>
                        ) : new Date(invite.expiresAt) < new Date() ? (
                          <span className="inline-block px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 text-xs font-medium">
                            Abgelaufen
                          </span>
                        ) : (
                          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs font-medium">
                            Ausstehend
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                        {new Date(invite.createdAt).toLocaleDateString('de-DE')}
                      </td>
                      <td className="py-3 px-4">
                        {!invite.usedAt && (
                          <button
                            onClick={() => handleDeleteInvite(invite.id)}
                            className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
