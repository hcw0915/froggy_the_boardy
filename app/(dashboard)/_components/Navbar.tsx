'use client'

import {
	OrganizationSwitcher,
	UserButton,
	useOrganization
} from '@clerk/nextjs'
import { SearchInput } from './SearchInput'
import { InviteButton } from './InviteButton'

export const Navbar = () => {
	const organization = useOrganization()

	// console.log(organization) // all the organizations info

	return (
		<div className="flex items-center gap-x-4 p-5 ">
			<SearchInput />
			{/* Avatar would be pushed to right side by flex-1. */}
			<div className="block lg:hidden flex-1">
				<OrganizationSwitcher
					hidePersonal
					appearance={{
						elements: {
							rootBox: {
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								width: '100%',
								maxWidth: '376px' // lg: breakpoints
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
			</div>
			{organization && <InviteButton />}
			<UserButton />
		</div>
	)
}
