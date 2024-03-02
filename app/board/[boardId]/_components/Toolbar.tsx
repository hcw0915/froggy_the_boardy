import React from 'react'
import { ToolButton } from './ToolButton'
import {
	Circle,
	MousePointer2,
	Pencil,
	Redo2,
	Square,
	StickyNote,
	Type,
	Undo2
} from 'lucide-react'
import {
	CanvasMode,
	CanvasState,
	LayerInsertingType,
	LayerType
} from '@/types/canvas'

interface ToolbarProps {
	canvasState: CanvasState
	setCanvasState: (newState: CanvasState) => void
	undo: () => void
	redo: () => void
	canUndo: boolean
	canRedo: boolean
}

const selectModeArray = [
	CanvasMode.None,
	CanvasMode.Translating,
	CanvasMode.SelectionNet,
	CanvasMode.Pressing,
	CanvasMode.Resizing
]

export const Toolbar = (props: ToolbarProps) => {
	const { canvasState, setCanvasState, undo, redo, canRedo, canUndo } = props

	const handleSelection = () => {
		setCanvasState({ mode: CanvasMode.None })
	}

	const handleInserting = (LayerInsertingType: LayerInsertingType) => {
		setCanvasState({
			mode: CanvasMode.Inserting,
			layerType: LayerInsertingType
		})
	}

	const handlePencil = () => {
		setCanvasState({
			mode: CanvasMode.Pencil
		})
	}

	const checkIsActive = (layerType: LayerType) =>
		canvasState.mode === CanvasMode.Inserting &&
		canvasState.layerType === layerType

	// LayerType 需要多了解一點
	const toolList = [
		{
			label: 'Select',
			icon: MousePointer2,
			isActive: selectModeArray.includes(canvasState.mode),
			handleClick: handleSelection
		},
		{
			label: 'Text',
			icon: Type,
			isActive: checkIsActive(LayerType.Text),
			handleClick: () => handleInserting(LayerType.Text)
		},
		{
			label: 'Sticky',
			icon: StickyNote,
			isActive: checkIsActive(LayerType.Note),
			handleClick: () => handleInserting(LayerType.Note)
		},
		{
			label: 'Rectangle',
			icon: Square,
			isActive: checkIsActive(LayerType.Rectangle),
			handleClick: () => handleInserting(LayerType.Rectangle)
		},
		{
			label: 'Ellipse',
			icon: Circle,
			isActive: checkIsActive(LayerType.Ellipse),
			handleClick: () => handleInserting(LayerType.Ellipse)
		},
		{
			label: 'Pen',
			icon: Pencil,
			isActive: canvasState.mode === CanvasMode.Inserting,
			handleClick: handlePencil
		}
	]

	return (
		<div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
			<div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
				{toolList.map(({ label, icon, isActive, handleClick }) => {
					return (
						<ToolButton
							key={label}
							label={label}
							icon={icon}
							isActive={isActive}
							onClick={handleClick}
						/>
					)
				})}
			</div>

			<div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
				<ToolButton
					label={'Undo'}
					icon={Undo2}
					isDisabled={!canUndo}
					onClick={undo}
				/>
				<ToolButton
					label={'Redo'}
					icon={Redo2}
					isDisabled={!canRedo}
					onClick={redo}
				/>
			</div>
		</div>
	)
}

export const ToolBarSkeleton = () => {
	return (
		<div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white h-[22.5rem] w-[3.25rem] shadow-md rounded-md" />
	)
}
