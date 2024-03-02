'use client'

import React, { useState } from 'react'
import { Info } from './Info'
import { Participants } from './Participants'
import { Toolbar } from './Toolbar'
import {
	useCanRedo,
	useCanUndo,
	useHistory,
	useSelf
} from '@/liveblocks.config'
import { CanvasMode, CanvasState } from '@/types/canvas'

interface CanvasProps {
	boardId: string
}

export const Canvas = (props: CanvasProps) => {
	const { boardId } = props

	const history = useHistory()
	const canRedo = useCanRedo()
	const canUndo = useCanUndo()

	const [canvasState, setCanvasState] = useState<CanvasState>({
		mode: CanvasMode.None
	})

	return (
		<main className="h-full w-full relative bg-neutral-100 touch-none">
			<Info boardId={boardId} />
			<Participants />
			<Toolbar
				canvasState={canvasState}
				setCanvasState={setCanvasState}
				redo={history.redo}
				undo={history.undo}
				canRedo={canRedo}
				canUndo={canUndo}
			/>
		</main>
	)
}
