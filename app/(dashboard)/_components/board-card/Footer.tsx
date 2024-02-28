import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface IFooterProps {
	title: string
	authorLabel: string
	createdAtLabel: string
	disabled: boolean
	isFavorite: boolean
	toggleFavorite: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Footer = (props: IFooterProps) => {
	const {
		title,
		authorLabel,
		createdAtLabel,
		disabled,
		isFavorite,
		toggleFavorite
	} = props

	return (
		<div className="relative bg-white p-3">
			<p className="text-[0.75rem] truncate max-w-[calc(100%-1.25rem)]">
				{title}
			</p>

			<p className="opacity-0 group-hover:opacity-100 transition-opacity text-[0.75rem] text-muted-foreground truncate">
				{authorLabel}, {createdAtLabel}
			</p>
			<button
				className={cn(
					'opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-blue-600',
					disabled && 'cursor-not-allowed opacity-75'
				)}
				disabled={disabled}
				onClick={toggleFavorite}
			>
				<Star
					className={cn(
						'h-4, w-4',
						isFavorite && 'fill-blue-600 text-blue-600'
					)}
				/>
			</button>
		</div>
	)
}
