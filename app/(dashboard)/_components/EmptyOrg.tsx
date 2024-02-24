import { Button } from '@/components/ui/button'
import { DialogTrigger, Dialog, DialogContent } from '@/components/ui/dialog'
import { CreateOrganization } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

export const EmptyOrg = () => {
	return (
		<div className="h-full flex flex-col items-center justify-center">
			<Image src="/logo.png" alt="logo" width={200} height={200} />
			<h2 className="text-2xl font-bold mt-6">WelCome To Boardy</h2>

			<p className="text-sm mt-2 text-[#5e5e5e]">
				Create a group to get START!
			</p>

			<div className="mt-6">
				<Dialog>
					<DialogTrigger asChild>
						<Button>Create Organization</Button>
					</DialogTrigger>
					<DialogContent className="p-0 bg-transparent border-none max-w-[30rem]">
						<CreateOrganization />
					</DialogContent>
				</Dialog>
			</div>
		</div>
	)
}
