// User Types
export interface User {
  id: string
  email: string
  name: string
  role: 'VOLUNTEER' | 'COORDINATOR' | 'ADMIN'
  isAdmin: boolean
  groups: UserGroup[]
  trainings: UserTraining[]
  createdAt: Date
  updatedAt: Date
}

export interface UserGroup {
  id: string
  userId: string
  groupId: string
  group: Group
  joinedAt: Date
}

// Group Types
export interface Group {
  id: string
  name: string
  description?: string | null
  color: string
  icon: string
  isPublic: boolean
  requiresAdmin: boolean
  users: UserGroup[]
  trainings: GroupTraining[]
  createdAt: Date
  updatedAt: Date
}

// Training Types
export interface Training {
  id: string
  name: string
  description?: string | null
  validityMonths: number
  requiredFrequency: string
  icon: string
  color: string
  groups: GroupTraining[]
  users: UserTraining[]
  courseInstances: CourseInstance[]
  createdAt: Date
  updatedAt: Date
}

export interface GroupTraining {
  id: string
  groupId: string
  group: Group
  trainingId: string
  training: Training
  isRequired: boolean
}

// User Training (Nachweis)
export interface UserTraining {
  id: string
  userId: string
  user: User
  trainingId: string
  training: Training
  completionDate: Date
  expiryDate: Date
  certificateNo?: string | null
  status: 'ACTIVE' | 'EXPIRING_SOON' | 'EXPIRED' | 'NOT_STARTED'
  nextCourseId?: string | null
  nextCourse?: CourseInstance | null
  notes?: string | null
  createdAt: Date
  updatedAt: Date
}

// Course Instance (Termin)
export interface CourseInstance {
  id: string
  trainingId: string
  training: Training
  title: string
  description?: string | null
  startDate: Date
  endDate: Date
  location: string
  instructor?: string | null
  maxParticipants?: number | null
  registrations: UserTraining[]
  createdAt: Date
  updatedAt: Date
}

// Dashboard Widget Types
export interface TrainingWidget {
  id: string
  training: Training
  status: 'ACTIVE' | 'EXPIRING_SOON' | 'EXPIRED' | 'NOT_STARTED'
  expiryDate?: Date
  nextCourse?: CourseInstance
  daysUntilExpiry?: number
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Admin Log
export interface AdminLog {
  id: string
  adminId: string
  action: string
  resource: string
  resourceId?: string | null
  details?: Record<string, any> | null
  createdAt: Date
}
