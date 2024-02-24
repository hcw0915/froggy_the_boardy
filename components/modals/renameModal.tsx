'use client'

import { useRenameModalStore } from '@/store/useRenameModalStore'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '../ui/dialog'

export const RenameModal = () => {
	const { isOpen, onClose, initialValue } = useRenameModalStore()

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit board title</DialogTitle>
				</DialogHeader>
				<DialogContent>
					<DialogDescription>
						Enter a new title for this board
					</DialogDescription>
				</DialogContent>
			</DialogContent>
		</Dialog>
	)
}
