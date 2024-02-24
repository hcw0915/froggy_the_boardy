'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
import { OrganizationSwitcher } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Star } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

const font = Poppins({
	subsets: ['latin'],
	weight: ['600']
})

export const OrgSidebar = () => {
	const searchParams = useSearchParams()
	const isFavorites = searchParams.get('favorites')

	return (
		<div className="hidden lg:flex flex-col space-y-6 w-[12.875rem] pl-5 pt-5">
			<div className="flex items-center gap-x-2">
				<Image src="/logo.png" alt="logo" height={60} width={60} />
				<span className={cn('font-semibold text-2xl', font.className)}>
					Board
				</span>
			</div>
			<OrganizationSwitcher
				hidePersonal
				appearance={{
					elements: {
						rootBox: {
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							width: '100%'
						},
						organizationSwitcherTrigger: {
							padding: '0.375rem',
							width: '100%',
							borderRadius: '0.5rem',
							border: '0.125rem solid #E5E7EB',
							justifyContent: 'space-between',
							backgroundColor: 'white'
						}
					}
				}}
			/>

			<div className="space-y-1 w-full">
				<Button
					asChild
					variant={isFavorites ? 'ghost' : 'secondary'}
					size={'lg'}
					className="font-normal justify-start px-2 w-full"
				>
					<Link href="/">
						<LayoutDashboard className="w-4 h-4 mr-2" />
						Team boards
					</Link>
				</Button>
				<Button
					asChild
					variant={isFavorites ? 'secondary' : 'ghost'}
					size={'lg'}
					className="font-normal justify-start px-2 w-full"
				>
					<Link
						href={{
							pathname: '/',
							query: { favorites: true } // localhost:3000/?favorites=true
						}}
					>
						<Star className="w-4 h-4 mr-2" />
						Favorite boards
					</Link>
				</Button>
			</div>
		</div>
	)
}
