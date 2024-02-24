import React from 'react'
import { NewButton } from './NewButton'
import { List } from './List'

export const Sidebar = () => {
	return (
		// TODO change the sidebar color
		<aside className="fixed z-[1] left-0 bg-yellow-300 h-full w-[60px] flex flex-col gap-y-4 text-white items-center pt-4">
			<List />
			<NewButton />
		</aside>
	)
}

export default Sidebar
