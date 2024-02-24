'use client'

import React from 'react'
import { useQuery } from 'convex/react'

// import { EmptySearch } from '../EmptySearch'
// import { EmptyFavorite } from '../EmptyFavorite'
import { EmptyPage } from '../EmptyPage'
import { Button } from '@/components/ui/button'
import { EmptyBoards } from '../EmptyBoards'
import { api } from '@/convex/_generated/api'
import { query } from '@/convex/_generated/server'
import { BoardCard } from '../board-card'
import { NewBoardButton } from '../NewBoardButton'

interface BoardListProps {
	orgId: string
	querySearch: {
		search?: string
		favorites?: string
	}
}

export const BoardList = (props: BoardListProps) => {
	const { orgId, querySearch } = props

	const data = useQuery(api.boards.get, { orgId })

	if (!data) {
		return (
			<div>
				<h2 className="text-3xl">
					{querySearch.favorites ? 'Favorite boards' : 'Team boards'}
				</h2>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
					<NewBoardButton orgId={orgId} disabled />
					<BoardCard.Skeleton />
					<BoardCard.Skeleton />
					<BoardCard.Skeleton />
					<BoardCard.Skeleton />
				</div>
			</div>
		)
	}

	// TODO Link to the CreateOrganization
	if (!data?.length && querySearch.search) {
		return (
			<EmptyPage
				src={'/logo.png'}
				description="CREATE YOUR FIRST BOARD~"
				// Other components which u would like to put it in the Page.
				renderProps={
					<Button
						// className="mt-3 bg-yellow-300 text-black font-bold border-2 border-x-black"
						size={'lg'}
						onClick={() => {}}
					>
						LET'S GO
					</Button>
				}
			/>
		)
	}

	if (!data?.length && querySearch.favorites) {
		return <EmptyPage src={'/Broken_heart.svg'} width={200} height={200} />
	}

	if (!data?.length) {
		return <EmptyBoards />
	}

	return (
		<div>
			<h2 className="text-3xl">
				{querySearch.favorites ? 'Favorite boards' : 'Team boards'}
			</h2>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
				<NewBoardButton orgId={orgId} />

				{data?.map((board) => {
					return (
						<BoardCard
							key={board._id}
							id={board._id}
							title={board.title}
							imageUrl={board.imageUrl}
							authorId={board.authorId}
							authorName={board.authorName}
							createdAt={board._creationTime}
							orgId={board.orgId}
							isFavorite={false}
						/>
					)
				})}
			</div>
		</div>
	)
}

//TODO use same component or individual?  Empty----
