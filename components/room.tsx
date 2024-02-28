'use client'

import { ClientSideSuspense } from '@liveblocks/react'
import { RoomProvider } from '@/liveblocks.config'

interface RoomProps {
	children: React.ReactNode
	roomId: string
	fallback?: React.ReactNode
}

export const Room = (props: RoomProps) => {
	const { children, roomId, fallback = <div>Loading...</div> } = props

	return (
		<RoomProvider id={roomId} initialPresence={{}}>
			<ClientSideSuspense fallback={fallback}>
				{/* https://liveblocks.io/docs/api-reference/liveblocks-react#RoomProvider */}
				{() => children}
			</ClientSideSuspense>
		</RoomProvider>
	)
}
