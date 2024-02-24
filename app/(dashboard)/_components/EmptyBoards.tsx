'use client'

import { Button } from '@/components/ui/button'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'

import Image from 'next/image'
import React from 'react'
import { useOrganization } from '@clerk/nextjs'
import { useApiMutation } from '@/hooks/useApiMutation'
import { toast } from 'sonner'

export const EmptyBoards = () => {
	const { organization } = useOrganization()
	const { pending, handleMutate } = useApiMutation(api.board.create) // fetch the data (board)

	const handleCreate = () => {
		if (!organization) return

		handleMutate({
			orgId: organization.id,
			title: 'Untitled'
		})
			.then(() => {
				toast.success('Board created')
			})
			.catch(() => toast.error('Failed to create board'))
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
