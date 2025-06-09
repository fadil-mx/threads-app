import { NextResponse } from 'next/server'
import { clerkClient } from '@clerk/nextjs/server'

export async function POST(req: Request) {
  const { userId, orgId, role } = await req.json()

  if (!userId || !orgId || !role) {
    return NextResponse.json({ error: 'Missing data' }, { status: 400 })
  }

  try {
    // Add the current user to the organization
    const role = 'org:member'

    const client = await clerkClient()
    const membership = await client.organizations.createOrganizationMembership({
      organizationId: orgId,
      userId,
      role,
    })

    // Optional: Set the organization as active for the current session
    // await clerkClient.users.updateUser(userId, {
    //   publicMetadata: {
    //     activeOrganization: orgId,
    //   },
    // })

    return NextResponse.json({ success: true, membership })
  } catch (err) {
    console.error('Add to org error:', err)
    return NextResponse.json({ error: 'Failed to join org' }, { status: 500 })
  }
}
