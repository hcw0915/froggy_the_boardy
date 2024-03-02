'use client'

import React, { memo } from 'react'
import { useOthersConnectionIds } from '@/liveblocks.config'
import { Cursor } from './Cursor'

const Cursors = () => {
	const ids = useOthersConnectionIds()
	return (
		<>
			{ids.map((connectionId) => {
				return <Cursor key={connectionId} connectionId={connectionId} />
			})}
		</>
	)
}

export const CursorPresence = memo(() => {
	return (
		<>
			{/* TODO: Draft pencil */}
			<Cursors />
		</>
	)
})

CursorPresence.displayName = 'CursorPresence'
