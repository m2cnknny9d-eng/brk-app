'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Heart, LogOut, Settings, Menu } from 'lucide-react'
import { TrainingWidget } from '@/types'

interface Group {
  id: string
  name: string
  description?: string
  color: string
  icon: string
  isPublic: boolean
  requiresAdmin: boolean
}

export default function DashboardPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [trainings, setTrainings] = useState<TrainingWidget[]>([])
  const [groups, setGroups] = useState<Group[]>([])
  const [activeGroup, setActiveGroup] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingGroups, setIsLoadingGroups] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    }
  }, [status, router])

  // Load groups
  useEffect(() => {
    if (session?.user?.id) {
      loadGroups()
    }
  }, [session?.user?.id])

  // Load trainings
  useEffect(() => {
    if (session?.user?.id && activeGroup) {
      loadTrainings()
    }
  }, [session?.user?.id, activeGroup])

  const loadGroups = async () => {
    try {
      setIsLoadingGroups(true)
      const response = await fetch('/api/user/groups')
      if (response.ok) {
        const data = await response.json()
        setGroups(data.groups || [])
        // Set first group as active
        if (data.groups.length > 0) {
          setActiveGroup(data.groups[0].name)
        }
      }
    } catch (error) {
      console.error('Failed to load groups:', error)
    } finally {
      setIsLoadingGroups(false)
    }
  }

  const loadTrainings = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `/api/trainings?group=${encodeURIComponent(activeGroup || '')}`
      )
      if (response.ok) {
        const data = await response.json()
        setTrainings(data.trainings || [])
      }
    } catch (error) {
      console.error('Failed to load trainings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
        <div className="animate-pulse">
          <Heart className="w-12 h-12 text-brk-red" fill="currentColor" />
        </div>
      </div>
    )
  }

  if (!session) return null

  return (
    <div className="min-h-screen bg-brk-gray dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-brk-red" fill="currentColor" />
              <span className="text-xl font-bold text-brk-text dark:text-white">
                BRK Bayern
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-6">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Hallo, <strong>{session.user?.name}</strong>
              </div>
              <button
                onClick={() => router.push('/settings')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={() => router.push('/api/auth/signout')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Mobile Menu */}
            <div className="sm:hidden">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'block' : 'hidden'
          } sm:block w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 p-6 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto`}
        >
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Gruppen
            </h3>

            {isLoadingGroups ? (
              <div className="text-sm text-gray-500">Wird geladen...</div>
            ) : groups.length === 0 ? (
              <div className="text-sm text-gray-500">Keine Gruppen verfügbar</div>
            ) : (
              groups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => {
                    setActiveGroup(group.name)
                    setSidebarOpen(false)
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-colors ${
                    activeGroup === group.name
                      ? 'bg-brk-red text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {group.requiresAdmin ? '🔴' : '🟢'} {group.name}
                </button>
              ))
            )}
          </div>

          {/* Admin Section */}
          {session.user?.isAdmin && (
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-slate-700">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Admin
              </h3>
              <button
                onClick={() => router.push('/admin')}
                className="w-full text-left px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors font-medium"
              >
                📋 Einladungen
              </button>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="max-w-6xl mx-auto p-6">
            {/* Title */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-brk-text dark:text-white mb-2">
                Lehrgänge & Fortbildungen
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {activeGroup}
              </p>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="widget h-48 animate-pulse bg-gray-200 dark:bg-slate-700"
                  ></div>
                ))}
              </div>
            ) : trainings.length === 0 ? (
              <div className="widget text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Keine Lehrgänge für diese Gruppe konfiguriert
                </p>
              </div>
            ) : (
              /* Training Widgets */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {trainings.map((training) => (
                  <TrainingWidgetComponent
                    key={training.id}
                    training={training}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

function TrainingWidgetComponent({ training }: { training: TrainingWidget }) {
  const statusColors: Record<string, string> = {
    ACTIVE: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    EXPIRING_SOON:
      'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
    EXPIRED:
      'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    NOT_STARTED:
      'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700',
  }

  const statusBadges: Record<string, string> = {
    ACTIVE: 'status-active',
    EXPIRING_SOON: 'status-expiring',
    EXPIRED: 'status-expired',
    NOT_STARTED: 'status-not-started',
  }

  const statusLabels: Record<string, string> = {
    ACTIVE: '✅ Aktiv',
    EXPIRING_SOON: '⚠️ Läuft bald ab',
    EXPIRED: '❌ Abgelaufen',
    NOT_STARTED: '📋 Nicht gestartet',
  }

  return (
    <div
      className={`widget cursor-pointer hover:shadow-widget-lg transition-all transform hover:scale-105 ${
        statusColors[training.status]
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{training.training.icon}</div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {training.training.name}
            </h3>
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="mb-4">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusBadges[training.status]}`}>
          {statusLabels[training.status]}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 mb-4">
        {training.expiryDate && (
          <div className="flex justify-between">
            <span>Gültig bis:</span>
            <span className="font-medium">
              {new Date(training.expiryDate).toLocaleDateString('de-DE')}
            </span>
          </div>
        )}

        {training.daysUntilExpiry !== undefined && (
          <div className="flex justify-between">
            <span>Tage verbleibend:</span>
            <span className="font-medium">{training.daysUntilExpiry}</span>
          </div>
        )}
      </div>

      {/* Next Course Info */}
      {training.nextCourse && (
        <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2">
            Nächster Termin
          </p>
          <p className="font-medium text-gray-900 dark:text-white">
            {training.nextCourse.title}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            {new Date(training.nextCourse.startDate).toLocaleDateString(
              'de-DE'
            )}{' '}
            - {training.nextCourse.location}
          </p>
        </div>
      )}

      {/* Action Button */}
      <button className="mt-4 w-full px-4 py-2 bg-brk-red text-white rounded-lg font-medium hover:bg-brk-darkred transition-colors">
        Details ansehen
      </button>
    </div>
  )
}
