'use client'

import React from 'react'
import { Info } from './Info'
import { Participants } from './Participants'
import { Toolbar } from './Toolbar'
import { useSelf } from '@/liveblocks.config'

interface CanvasProps {
	boardId: string
}

export const Canvas = (props: CanvasProps) => {
	const { boardId } = props

	const { name } = useSelf((me) => me.info)

	return (
		<main className="h-full w-full relative bg-neutral-100 touch-none">
			<Info />
			<Participants />
			<Toolbar />
		</main>
	)
}
