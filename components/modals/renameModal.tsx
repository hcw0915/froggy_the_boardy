'use client'

import { useRenameModalStore } from '@/store/useRenameModalStore'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '../ui/dialog'
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useApiMutation } from '@/hooks/useApiMutation'
import { api } from '@/convex/_generated/api'
import { PromiseHandler } from '@/utils/toaster'
import { TOAST_MSG_MAP } from '@/constants/Toast'

const { rename } = TOAST_MSG_MAP

export const RenameModal = () => {
	const { isOpen, onClose, initialValue } = useRenameModalStore(
		(state) => state
	)
	const { handleMutate, pending } = useApiMutation(api.board.update)

	const [title, setTitle] = useState(initialValue.title)

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value)
	}

	const handleTitleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const mutator = handleMutate({
			id: initialValue.id,
			title: title
		})

		const mutatorWrapper = new PromiseHandler(mutator)
		mutatorWrapper.toaster(rename.success, rename.error).then(() => onClose())
	}

	useEffect(() => {
		setTitle(initialValue.title)
	}, [initialValue.title])

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit board title</DialogTitle>
				</DialogHeader>
				<DialogDescription>Enter a new title for this board</DialogDescription>

				<form onSubmit={handleTitleSubmit} className="space-y-4">
					<Input
						required
						disabled={pending}
						maxLength={60}
						value={title}
						placeholder="Board title"
						onChange={handleTitleChange}
					/>
					<DialogFooter>
						<DialogClose>
							<Button type="button" variant={'outline'}>
								Cancel
							</Button>
						</DialogClose>
						<Button disabled={pending} type="submit">
							Save
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
