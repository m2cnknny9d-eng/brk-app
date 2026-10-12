import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const groupName = req.nextUrl.searchParams.get('group') || 'Bereitschaft Nördlingen'

    // Check if user has access to this group
    const userGroup = await prisma.userGroup.findFirst({
      where: {
        userId: session.user.id,
        group: {
          name: groupName,
        },
      },
      include: {
        group: {
          include: {
            trainings: {
              include: {
                training: {
                  include: {
                    courseInstances: {
                      where: {
                        startDate: {
                          gte: new Date(),
                        },
                      },
                      orderBy: {
                        startDate: 'asc',
                      },
                      take: 1,
                    },
                  },
                },
              },
            },
          },
        },
      },
    })

    if (!userGroup) {
      // Check if group is public
      const publicGroup = await prisma.group.findUnique({
        where: { name: groupName },
        include: {
          trainings: {
            include: {
              training: {
                include: {
                  courseInstances: {
                    where: {
                      startDate: {
                        gte: new Date(),
                      },
                    },
                    orderBy: {
                      startDate: 'asc',
                    },
                    take: 1,
                  },
                },
              },
            },
          },
        },
      })

      if (!publicGroup || !publicGroup.isPublic) {
        return NextResponse.json(
          { error: 'Access denied to this group' },
          { status: 403 }
        )
      }

      // Get user's training status for this group
      const trainings = publicGroup.trainings.map((gt) => {
        const training = gt.training
        return {
          id: training.id,
          training,
          status: 'NOT_STARTED' as const,
          nextCourse: training.courseInstances[0] || null,
        }
      })

      return NextResponse.json({ trainings })
    }

    // Get user's training status for this group
    const userTrainings = await prisma.userTraining.findMany({
      where: {
        userId: session.user.id,
        training: {
          groups: {
            some: {
              groupId: userGroup.groupId,
            },
          },
        },
      },
      include: {
        training: {
          include: {
            courseInstances: {
              where: {
                startDate: {
                  gte: new Date(),
                },
              },
              orderBy: {
                startDate: 'asc',
              },
              take: 1,
            },
          },
        },
        nextCourse: true,
      },
    })

    // Map to training widgets
    const trainings = userGroup.group.trainings.map((gt) => {
      const userTraining = userTrainings.find(
        (ut) => ut.trainingId === gt.trainingId
      )
      const training = gt.training

      let status = 'NOT_STARTED'
      let expiryDate = null
      let daysUntilExpiry = null

      if (userTraining) {
        expiryDate = userTraining.expiryDate
        const now = new Date()
        const diffTime = expiryDate.getTime() - now.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        daysUntilExpiry = diffDays

        if (diffDays < 0) {
          status = 'EXPIRED'
        } else if (diffDays <= 90) {
          status = 'EXPIRING_SOON'
        } else {
          status = 'ACTIVE'
        }
      }

      return {
        id: training.id,
        training,
        status,
        expiryDate,
        daysUntilExpiry,
        nextCourse:
          userTraining?.nextCourse ||
          training.courseInstances[0] ||
          null,
      }
    })

    return NextResponse.json({ trainings })
  } catch (error) {
    console.error('Trainings API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
