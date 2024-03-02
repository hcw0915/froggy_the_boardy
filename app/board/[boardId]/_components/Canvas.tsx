'use client'

import React, { useCallback, useState } from 'react'
import { nanoid } from 'nanoid'
import { Info } from './Info'
import { Participants } from './Participants'
import { Toolbar } from './Toolbar'
import {
	useCanRedo,
	useCanUndo,
	useHistory,
	useMutation,
	useSelf,
	useStorage
} from '@/liveblocks.config'
import {
	CanvasMode,
	CanvasState,
	Color,
	LayerType,
	Point
} from '@/types/canvas'
import { CursorPresence } from './CursorPresence'
import { pointerEventToCanvasPoint } from '@/lib/utils'
import { LiveObject } from '@liveblocks/client'
import { LayerPreview } from './LayerPreview'

const MAX_LAYERS = 100

interface CanvasProps {
	boardId: string
}

export const Canvas = (props: CanvasProps) => {
	const { boardId } = props

	const layerIds = useStorage((root) => root.layerIds)

	const [camera, setCamera] = useState({ x: 0, y: 0 })
	/* prettier-ignore */
	const [canvasState, setCanvasState] = useState<CanvasState>({ mode: CanvasMode.None })
	/* prettier-ignore */
	const [lastUsedColor, setLastUsedColor] = useState<Color>({ r: 0, g: 0, b: 0 })

	const history = useHistory()
	const canRedo = useCanRedo()
	const canUndo = useCanUndo()

	const insertLayer = useMutation(
		(
			{ storage, setMyPresence },
			layerType:
				| LayerType.Ellipse
				| LayerType.Rectangle
				| LayerType.Text
				| LayerType.Note,
			position: Point
		) => {
			const liveLayers = storage.get('layers')
			if (liveLayers.size >= MAX_LAYERS) return

			const liveLayerIds = storage.get('layerIds')
			const layerId = nanoid()
			const layer = new LiveObject({
				type: layerType,
				x: position.x,
				y: position.y,
				height: 100,
				width: 100,
				fill: lastUsedColor
			})

			liveLayerIds.push(layerId)
			liveLayers.set(layerId, layer)

			setMyPresence({ selection: [layerId] }, { addToHistory: true })
			setCanvasState({ mode: CanvasMode.None })
		},
		[lastUsedColor]
	)

	const onPointerMove = useMutation(
		({ setMyPresence }, e: React.PointerEvent) => {
			e.preventDefault()
			const current = pointerEventToCanvasPoint(e, camera)

			setMyPresence({ cursor: current })
		},
		[]
	)

	const onPointerLeave = useMutation(({ setMyPresence }) => {
		// 離開視窗直接讓 cursor 消失
		setMyPresence({ cursor: null })
	}, [])

	const onPointerUp = useMutation(
		({}, e) => {
			const point = pointerEventToCanvasPoint(e, camera)
			if (canvasState.mode === CanvasMode.Inserting) {
				insertLayer(canvasState.layerType, point)
			} else {
				setCanvasState({ mode: CanvasMode.None })
			}

			history.resume()
		},
		[camera, canvasState, history, insertLayer]
	)

	const onWheel = useCallback((e: React.WheelEvent) => {
		setCamera(() => ({
			x: camera.x - e.deltaX,
			y: camera.y - e.deltaY
		}))
	}, [])

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

			<svg
				className="h-[100vh] w-[100vw]"
				onWheel={onWheel}
				onPointerMove={onPointerMove}
				onPointerLeave={onPointerLeave}
				onPointerUp={onPointerUp}
			>
				<g
					style={{
						transform: `translate(${camera.x / 16}rem, ${camera.y / 16}rem)`
					}}
				>
					{layerIds.map((layerId) => {
						return (
							<LayerPreview
								key={layerId}
								id={layerId}
								onLayerPointerDown={() => {}}
								selectionColor={'#000'}
							/>
						)
					})}
					<CursorPresence />
				</g>
			</svg>
		</main>
	)
}
