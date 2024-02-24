'use client'

// https://docs.convex.dev/auth/clerk >> Step 8
import { ClerkProvider, useAuth } from '@clerk/nextjs'
import { ConvexProviderWithClerk } from 'convex/react-clerk'

import { AuthLoading, Authenticated, ConvexReactClient } from 'convex/react'
import { Loading } from '@/components/ui/auth/loading'

interface ConvexClientProviderProps {
	children: React.ReactNode
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!

const convexClient = new ConvexReactClient(convexUrl)

export const ConvexClientProvider = ({
	children
}: ConvexClientProviderProps) => {
	return (
		<ClerkProvider>
			<ConvexProviderWithClerk useAuth={useAuth} client={convexClient}>
				<Authenticated>{children}</Authenticated>

				<AuthLoading>
					<Loading />
				</AuthLoading>
			</ConvexProviderWithClerk>
		</ClerkProvider>
	)
}
