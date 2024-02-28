import React from 'react'
import { Canvas } from './_components/Canvas'
import { Room } from '@/components/room'
import { Loading } from './_components/Loading'

interface BoardIdPageProps {
	params: {
		boardId: string
	}
}

const BoardIdPage = (props: BoardIdPageProps) => {
	const { params } = props

	const { boardId } = params

	return (
		<Room roomId={boardId} fallback={<Loading />}>
			<Canvas boardId={boardId} />
		</Room>
	)
}

export default BoardIdPage
