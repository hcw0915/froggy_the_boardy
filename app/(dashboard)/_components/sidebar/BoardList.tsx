import React from 'react'
import { EmptySearch } from '../EmptySearch'
import { EmptyFavorite } from '../EmptyFavorite'
import { EmptyPage } from '../EmptyPage'
import { Button } from '@/components/ui/button'

interface BoardListProps {
	orgId: string
	querySearch: {
		search?: string
		favorites?: string
	}
}

export const BoardList = (props: BoardListProps) => {
	const { orgId, querySearch } = props

	const data = []

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

	//& 404 Error Page >>>> error.tsx ?
	if (!data?.length) {
		return <EmptyPage src={'/logo.png'} />
	}

	return <ul></ul>
}
