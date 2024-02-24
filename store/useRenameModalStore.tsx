import { create } from 'zustand'

const defaultValues = { id: '', title: '' }

interface IRenameModalProps {
	isOpen: boolean
	initialValue: typeof defaultValues
	onOpen: (id: string, title: string) => void
	onClose: () => void
}

export const useRenameModalStore = create<IRenameModalProps>((set) => ({
	isOpen: false,
	initialValue: defaultValues,

	onOpen: (id, title) =>
		set({
			isOpen: true,
			initialValue: { id: id, title: title }
		}),

	onClose: () =>
		set({
			isOpen: false,
			initialValue: defaultValues
		})
}))
