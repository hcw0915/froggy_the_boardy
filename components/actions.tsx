'use client'

import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'

import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem
} from './ui/dropdown-menu'
import { Link2, Pencil, Trash2 } from 'lucide-react'
import { useApiMutation } from '@/hooks/useApiMutation'
import { api } from '@/convex/_generated/api'
import { ConfirmModal } from './ConfirmModal'
import { Button } from './ui/button'
import { useRenameModalStore } from '@/store/useRenameModalStore'
import { TOAST_MSG_MAP } from '@/constants/Toast'
import { PromiseHandler } from '@/utils/toaster'

const { copyLink, deletion } = TOAST_MSG_MAP

interface ActionProps {
	children: React.ReactNode
	side?: DropdownMenuContentProps['side']
	sideOffset?: DropdownMenuContentProps['sideOffset']
	id: string
	title: string
}

export const Actions = (props: ActionProps) => {
	const { children, side, sideOffset, id, title } = props

	const { onOpen } = useRenameModalStore()

	const { handleMutate, pending } = useApiMutation(api.board.remove)

	const handleCopyLink = () => {
		const duplicator = navigator.clipboard.writeText(
			`${window.location.origin}/board/${id}`
		)

		const copyWrapper = new PromiseHandler(duplicator)
		copyWrapper.toaster(copyLink.success, copyLink.error)
	}

	const handleDelete = (title: string) => () => {
		const mutator = handleMutate({ id })

		const mutatorWrapper = new PromiseHandler(mutator)
		mutatorWrapper.toaster(`${deletion.success}: ${title}`, deletion.error)
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			{/* // TODO - size of MenuContent should be changed! */}
			<DropdownMenuContent
				className="w-60"
				side={side}
				sideOffset={sideOffset}
				onClick={(e) => {
					e.stopPropagation()
				}}
			>
				<DropdownMenuItem
					className="p-3 cursor-pointer"
					onClick={handleCopyLink}
				>
					<Link2 className="h-4 w-4 mr-2" />
					Copy the Link!
				</DropdownMenuItem>
				<DropdownMenuItem
					className="p-3 cursor-pointer"
					onClick={() => onOpen(id, title)}
				>
					<Pencil className="h-4 w-4 mr-2" />
					Rename
				</DropdownMenuItem>
				<ConfirmModal
					header="Delete board"
					description="This will delete the board en all of its contents."
					disabled={pending}
					onConfirm={handleDelete(title)}
				>
					<Button
						variant={'destructive'}
						className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
					>
						<Trash2 className="h-4 w-4 mr-2" />
						Delete
					</Button>
				</ConfirmModal>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
