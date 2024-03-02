'use client'

import { Hint } from '@/components/Hint'
import { Button } from '@/components/ui/button'
import { LucideIcon } from 'lucide-react'

interface ToolButtonProps {
	label: string
	icon: LucideIcon

	isActive?: boolean
	isDisabled?: boolean
	onClick: () => void
}

export const ToolButton = (props: ToolButtonProps) => {
	const { label, icon: Icon, isActive, isDisabled, onClick } = props
	return (
		<Hint label={label} side="right" sideOffset={14}>
			<Button
				disabled={isDisabled}
				onClick={onClick}
				size={'icon'}
				variant={isActive ? 'boardActive' : 'board'}
			>
				<Icon />
			</Button>
		</Hint>
	)
}
