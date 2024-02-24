'use client'

import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'

import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator
} from './ui/dropdown-menu'
import { Link2, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useApiMutation } from '@/hooks/useApiMutation'
import { api } from '@/convex/_generated/api'
import { ConfirmModal } from './ConfirmModal'
import { Button } from './ui/button'

interface ActionProps {
	children: React.ReactNode
	side?: DropdownMenuContentProps['side']
	sideOffset?: DropdownMenuContentProps['sideOffset']
	id: string
	title: string
}

export const Actions = (props: ActionProps) => {
	const { children, side, sideOffset, id, title } = props

	const { handleMutate, pending } = useApiMutation(api.board.remove)

	const handleCopyLink = () => {
		navigator.clipboard
			.writeText(`${window.location.origin}/board/${id}`)
			.then(() => {
				toast.success('Link copied!')
			})
			.catch(() => {
				toast.error('Failed to Copy!')
			})
	}

	const handleDelete = (title: string) => () => {
		handleMutate({
			id: id
		})
			.then(() => {
				toast.success(`Board deleted: ${title}`)
			})
			.catch((err) => {
				toast.error('Failed to delete board')
			})
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
