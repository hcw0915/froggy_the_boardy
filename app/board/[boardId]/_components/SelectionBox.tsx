'use client'

import { useSelectionBounds } from '@/hooks/useSelectionBounds'
import { useSelf, useStorage } from '@/liveblocks.config'
import { LayerType, Side, XYWH } from '@/types/canvas'
import { memo } from 'react'

interface SelectionBoxProps {
	oResizeHandlePointerDown: (corner: Side, initialBounds: XYWH) => void
}

const HANDLE_WIDTH = 6

export const SelectionBox = memo((props: SelectionBoxProps) => {
	const { oResizeHandlePointerDown } = props

	const soleLayerId = useSelf((me) =>
		me.presence.selection.length === 1 ? me.presence.selection[0] : null
	)

	const isShowingHandles = useStorage(
		(root) =>
			soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path
	)

	const bounds = useSelectionBounds()

	if (!bounds) return null

	const basicX = bounds.x - HANDLE_WIDTH / 2
	const basicY = bounds.y - HANDLE_WIDTH / 2

	const resizeMappingCfg = [
		/* prettier-ignore */
		/* NW */ { x: basicX, y: basicY, cursor: 'nwse-resize'},
		/* prettier-ignore */
		/* N  */ { x: basicX + bounds.width / 2,	y: basicY, cursor: 'ns-resize'},
		/* prettier-ignore */
		/* NE */ { x: basicX + bounds.width, y: basicY, cursor: 'nesw-resize'},
		/* prettier-ignore */
		/* E  */ { x: basicX + bounds.width, y: basicY + bounds.height / 2, cursor: 'ew-resize'},
		/* prettier-ignore */
		/* SE */ { x: basicX + bounds.width, y: basicY + bounds.height,	cursor: 'nwse-resize'},
		/* prettier-ignore */
		/* S  */ { x: basicX + bounds.width / 2,	y: basicY + bounds.height, cursor: 'ns-resize'},
		/* prettier-ignore */
		/* SW */ { x: basicX, y: basicY + bounds.height, cursor: 'nesw-resize'},
		/* prettier-ignore */
		/* W  */ { x: basicX, y: basicY + bounds.height / 2, cursor: 'ew-resize'}
	]

	return (
		<>
			<rect
				// priority: className > properties in Svg.
				// className="fill-transparent pointer-events-none"
				x={0}
				y={0}
				width={bounds.width}
				height={bounds.height}
				transform={`matrix(1, 0, 0, 1, ${bounds.x}, ${bounds.y})`}
				fill={'transparent'}
				strokeWidth={2}
				stroke={'#3b82f6'}
				pointerEvents={'none'}
			/>

			{isShowingHandles && (
				<>
					{resizeMappingCfg.map((handle, index) => (
						<rect
							key={index}
							x={0}
							y={0}
							style={{
								width: `${HANDLE_WIDTH}px`,
								height: `${HANDLE_WIDTH}px`,
								transform: `translate(${handle.x}px, ${handle.y}px)`
							}}
							fill={'white'}
							strokeWidth={1}
							stroke={'#3b82f6'}
							cursor={handle.cursor}
							onPointerDown={(e) => e.stopPropagation()}
						/>
					))}
				</>
			)}
		</>
	)
})

SelectionBox.displayName = 'SelectionBox'
