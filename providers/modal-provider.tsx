'use client'

import { RenameModal } from '@/components/modals/renameModal'
import { useState, useEffect } from 'react'

export const ModalProvider = () => {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	return <>{isMounted ? <RenameModal /> : null}</>
}
