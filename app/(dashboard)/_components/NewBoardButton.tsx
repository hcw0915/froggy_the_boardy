'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/convex/_generated/api'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'
import { TOAST_MSG_MAP } from '@/constants/Toast'
import { useApiMutation } from '@/hooks/useApiMutation'

const { create } = TOAST_MSG_MAP

interface INewBoardButtonProps {
	orgId: string
	disabled?: boolean
}

export const NewBoardButton = (props: INewBoardButtonProps) => {
	const { orgId, disabled } = props

	const router = useRouter()
	const { handleMutate, pending } = useApiMutation(api.board.create)

	const handleCreate = () => {
		handleMutate({
			orgId: orgId,
			title: 'Untitled'
		})
			.then((id) => {
				toast.success(create.success)
				router.push(`/board/${id}`)
			})
			.catch((err) => {
				toast.error(create.error)
			})
	}

	return (
		<button
			disabled={disabled}
			onClick={handleCreate}
			className={cn(
				'col-span-1 aspect-[100/127] bg-yellow-300 rounded-lg hover:bg-yellow-400 flex flex-col items-center justify-center py-6',
				(pending || disabled) && 'opacity-75'
			)}
		>
			<Plus className="h-12 w-12 text-[#525252] stroke-1" />
			<p className="text-sm text-[#525252] font-light">New Board</p>
		</button>
	)
}
