'use client'

import { useOrganization } from '@clerk/nextjs'
import { EmptyOrg } from './_components/EmptyOrg'
import { BoardList } from './_components/sidebar/BoardList'

interface DashboardPageProps {
	searchParams: {
		search?: string
		favorites?: string // qs would be string at default. >>> favorites=true
	}
}

const DashboardPage = (props: DashboardPageProps) => {
	const { searchParams } = props
	const { organization } = useOrganization()

	return (
		// TODO - fix the width & height
		<div className="flex-1 h-[90%] p-3 bg-[#e9e9e9]">
			{/* {JSON.stringify(searchParams)} */}
			{organization ? (
				<BoardList orgId={organization.id} querySearch={searchParams} />
			) : (
				<EmptyOrg />
			)}
		</div>
	)
}
export default DashboardPage
