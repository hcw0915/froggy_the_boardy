'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { api } from '@/convex/_generated/api'
import { useOrganization } from '@clerk/nextjs'

import { Button } from '@/components/ui/button'
import { useApiMutation } from '@/hooks/useApiMutation'
import { TOAST_MSG_MAP } from '@/constants/Toast'
import { toast } from 'sonner'

const { create } = TOAST_MSG_MAP

export const EmptyBoards = () => {
	const router = useRouter()
	const { organization } = useOrganization()
	const { pending, handleMutate } = useApiMutation(api.board.create) // fetch the data (board)

	const handleCreate = () => {
		if (!organization) return

		handleMutate({
			orgId: organization.id,
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
		<div className="h-full flex flex-col items-center justify-center">
			<Image src="/Broken_heart.svg" alt="404 error" width={300} height={300} />
			<div className="text-2xl font-bold mt-6">Create your first board!</div>
			<div className="mt-6">
				<Button disabled={pending} size={'lg'} onClick={handleCreate}>
					Create board
				</Button>
			</div>
		</div>
	)
}
