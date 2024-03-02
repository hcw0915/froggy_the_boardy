import { useStorage } from '@/liveblocks.config'
import { LayerType } from '@/types/canvas'
import React, { memo } from 'react'
import { Rectangle } from './Rectangle'

interface LayerPreviewProps {
	id: string
	selectionColor?: string
	onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void
}

export const LayerPreview = memo((props: LayerPreviewProps) => {
	const { id, selectionColor, onLayerPointerDown } = props

	const layer = useStorage((root) => root.layers.get(id))

	if (!layer) return null

	switch (layer.type) {
		case LayerType.Rectangle:
			return (
				<Rectangle
					id={id}
					selectionColor={selectionColor}
					layer={layer}
					onPointerDown={onLayerPointerDown}
				/>
			)
		default:
			console.warn('Unknown layer type')
			return null
	}
})

LayerPreview.displayName = 'LayerPreview'
