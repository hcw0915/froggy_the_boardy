'use client'

import { ClientSideSuspense } from '@liveblocks/react'
import { RoomProvider } from '@/liveblocks.config'
import { LiveList, LiveMap, LiveObject } from '@liveblocks/client'
import { Layer } from '@/types/canvas'

interface RoomProps {
	children: React.ReactNode
	roomId: string
	fallback?: React.ReactNode
}

export const Room = (props: RoomProps) => {
	const { children, roomId, fallback = <div>Loading...</div> } = props

	return (
		// refs from liveblocks.config.ts (presence)
		<RoomProvider
			id={roomId}
			initialPresence={{ cursor: null, selection: [] }}
			initialStorage={{
				layers: new LiveMap<string, LiveObject<Layer>>(),
				layerIds: new LiveList()
			}}
		>
			<ClientSideSuspense fallback={fallback}>
				{/* https://liveblocks.io/docs/api-reference/liveblocks-react#RoomProvider */}
				{() => children}
			</ClientSideSuspense>
		</RoomProvider>
	)
}
