import React from 'react'
import { RectangleLayer } from '@/types/canvas'

interface RectangleProps {
	id: string
	layer: RectangleLayer
	selectionColor?: string
	onPointerDown: (e: React.PointerEvent, id: string) => void
}

export const Rectangle = (props: RectangleProps) => {
	const { id, layer, selectionColor, onPointerDown } = props

	const { x, y, fill, width, height } = layer

	return (
		<rect
			style={{ transform: `translate(${x / 16}rem, ${y / 16}rem)` }}
			className="drop-shadow-md"
			x={0}
			y={0}
			width={width}
			height={height}
			fill="#000"
			stroke="transparent"
			strokeWidth={1}
			onPointerDown={(e) => onPointerDown(e, id)}
		/>
	)
}
