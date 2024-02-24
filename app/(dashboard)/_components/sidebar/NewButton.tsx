'use client'

import { Plus } from 'lucide-react'
import { CreateOrganization } from '@clerk/nextjs'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Hint } from '@/components/Hint'

export const NewButton = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="aspect-square">
					<Hint
						label="Create organization"
						side="right"
						align="start"
						sideOffset={25}
					>
						<button className="bg-[#3e3e3e] h-[2.5rem] w-[2.5rem] rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition">
							<Plus className="text-white" />
						</button>
					</Hint>
				</div>
			</DialogTrigger>
			<DialogContent className="p-0 bg-transparent border-none max-w-[30rem]">
				<CreateOrganization />
			</DialogContent>
		</Dialog>
	)
}
