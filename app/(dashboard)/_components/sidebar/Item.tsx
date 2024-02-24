'use client'

import Image from 'next/image'

import { useOrganization, useOrganizationList } from '@clerk/nextjs'

import { cn } from '@/lib/utils'
import { Hint } from '@/components/Hint'

interface ItemProps {
	id: string
	name: string
	imageUrl: string
}

export const Item = ({ id, name, imageUrl }: ItemProps) => {
	const { organization } = useOrganization()
	const { setActive } = useOrganizationList()

	const isActive = organization?.id === id

	const handleClick = () => {
		if (!setActive) return
		setActive({ organization: id })
	}

	return (
		<div className="aspect-square relative">
			<Hint label={name} side="right" align="start" sideOffset={25}>
				{/* //& Clerk Dashboard < Config < Customization < Avatars */}
				<Image
					width={40}
					height={40}
					alt={name}
					src={imageUrl}
					onClick={handleClick}
					//! cn 為了可以條件是處理 tailwind
					className={cn(
						'rounded-md cursor-pointer opacity-30 hover:opacity-100 transition',
						isActive && 'opacity-100'
					)}
				/>
			</Hint>
		</div>
	)
}
