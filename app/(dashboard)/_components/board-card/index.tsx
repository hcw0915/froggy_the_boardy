'use client'

import Image from 'next/image'
import Link from 'next/link'

// import Smile from '../../../public/AwesomeSmile.svg'
import { formatDistanceToNow } from 'date-fns'
import { Overlay } from './Overlay'
import { useAuth } from '@clerk/nextjs'
import { Footer } from './Footer'
import { Skeleton } from '@/components/ui/skeleton'
import { Actions } from '@/components/actions'
import { MoreHorizontal } from 'lucide-react'
import { useApiMutation } from '@/hooks/useApiMutation'
import { api } from '@/convex/_generated/api'

interface IBoardCardProps {
	id: string
	title: string
	imageUrl: string
	authorId: string
	authorName: string
	createdAt: number
	orgId: string
	isFavorite: boolean
}

export const BoardCard = (props: IBoardCardProps) => {
	const {
		id,
		title,
		imageUrl,
		authorId,
		authorName,
		createdAt,
		orgId,
		isFavorite
	} = props

	const { userId } = useAuth()

	const { handleMutate: handleFavorite, pending: pendingFavorite } =
		useApiMutation(api.board.favorite)
	const { handleMutate: handleUnfavorite, pending: pendingUnfavorite } =
		useApiMutation(api.board.unfavorite)

	const authorLabel = userId === authorId ? 'You' : authorName
	const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true })

	const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		if (isFavorite) {
			handleUnfavorite({ id })
		} else {
			handleFavorite({ id, orgId })
		}
	}

	return (
		<Link href={`/board/${id}`}>
			{/* 這裡的 group 會觸發 group-XXXX 的統一動作 ex: hover >>> 
			https://dev.to/aasthapandey/group-hover-using-tailwind-css-4a2l*/}
			<div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
				<div className="relative flex-1 bg-amber-50">
					{/* //TODO Need to Change the size */}
					<Image
						className="object-fit sm:pt-9 lg:pt-12"
						src={'/logo.png'}
						alt={title}
						width={400}
						height={300}
					/>
					<Overlay />
					<Actions id={id} title={title} side="right">
						<button className="absolute top-[0.2rem] right-[0.25rem] opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
							<MoreHorizontal className="text-white opacity-50 hover:opacity-100 transition-opacity" />
						</button>
					</Actions>
				</div>
				<Footer
					title={title}
					authorLabel={authorLabel}
					createdAtLabel={createdAtLabel}
					isFavorite={isFavorite}
					disabled={pendingFavorite}
					toggleFavorite={toggleFavorite}
				/>
			</div>
		</Link>
	)
}

const BoardCardSkeleton = () => {
	return (
		<div className="aspect-[100/127] rounded-lg overflow-hidden">
			<Skeleton className="h-full w-full" />
		</div>
	)
}
BoardCard.Skeleton = BoardCardSkeleton
