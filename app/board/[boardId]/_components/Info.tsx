'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Poppins } from 'next/font/google'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { Menu } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Hint } from '@/components/Hint'
import { Actions } from '@/components/actions'
import { Button } from '@/components/ui/button'
import { useRenameModalStore } from '@/store/useRenameModalStore'

const font = Poppins({
	subsets: ['latin'],
	weight: ['600']
})
interface InfoProps {
	boardId: string
}

const TabSeparator = () => {
	return <div className="text-neutral-300 px-1.5">|</div>
}

export const Info = (props: InfoProps) => {
	const { boardId } = props

	const { onOpen } = useRenameModalStore()

	const data = useQuery(api.board.get, {
		id: boardId as Id<'boards'>
	})

	const handleOpen = () => {
		onOpen(data!._id, data!.title)
	}

	if (!data) return <InfoSkeleton />

	return (
		<div className="absolute top-2 left-2 bg-[#ffffff] rounded-md px-1.5 h-12 flex items-center shadow-md">
			<Hint label="Go to boards" side="bottom" sideOffset={15}>
				<Button variant={'board'} className="px-2">
					<Link href="/" className="flex items-center justify-center">
						<Image src={'/logo.png'} width={80} height={80} alt="Logo" />
						<span
							className={cn(
								'font-semibold text-xl ml-2 text-black',
								font.className
							)}
						>
							Board
						</span>
					</Link>
				</Button>
			</Hint>
			<TabSeparator />
			<Hint label="Edit title" side="bottom" sideOffset={15}>
				<Button
					variant={'board'}
					className="text-base font-normal px-2"
					onClick={handleOpen}
				>
					{data.title}
				</Button>
			</Hint>
			<TabSeparator />
			<Actions id={data._id} title={data.title} side="bottom" sideOffset={10}>
				<div>
					<Hint label="Main menu" side="bottom" sideOffset={15}>
						<Button variant={'board'} size={'icon'}>
							<Menu />
						</Button>
					</Hint>{' '}
				</div>
			</Actions>
		</div>
	)
}

export const InfoSkeleton = () => {
	return (
		<div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 w-[18.75rem] flex items-center shadow-md" />
	)
}
