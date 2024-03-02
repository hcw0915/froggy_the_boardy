import { Hint } from '@/components/Hint'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'

interface UserAvatarProps {
	src?: string
	name?: string
	fallback?: string
	borderColor?: string
}

export const UserAvatar = (props: UserAvatarProps) => {
	const { src, name, fallback, borderColor } = props

	return (
		<Hint label={name || 'Teammate'} side="bottom" sideOffset={18}>
			<Avatar className="h-8 w-8 border-2">
				<AvatarImage src={src} className="text-xs font-semibold" />
				<AvatarFallback>{fallback}</AvatarFallback>
			</Avatar>
		</Hint>
	)
}
