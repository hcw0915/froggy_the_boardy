'use client'

import { useOthers, useSelf } from '@/liveblocks.config'
import { UserAvatar } from './UserAvatar'
import { connectionIdToColor } from '@/lib/utils'

const MAX_SHOWN_USERS = 2

export const Participants = () => {
	const users = useOthers()
	const currentUser = useSelf()

	const hasMoreUsers = users.length > MAX_SHOWN_USERS

	const userData = users.slice(0, MAX_SHOWN_USERS)

	return (
		<div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
			<div className="flex gap-x-2">
				{userData.map(({ connectionId, info }) => {
					return (
						<UserAvatar
							key={connectionId}
							name={info?.name}
							src={info?.picture}
							fallback={info?.name?.[0] || 'T'}
							borderColor={connectionIdToColor(connectionId)}
						/>
					)
				})}

				{currentUser && (
					<UserAvatar
						name={`${currentUser.info?.name} (You)`}
						src={currentUser.info?.picture}
						fallback={currentUser.info?.name?.[0] || 'T'}
						borderColor={connectionIdToColor(currentUser.connectionId)}
					/>
				)}

				{hasMoreUsers && (
					<UserAvatar
						name={`${users.length - MAX_SHOWN_USERS} more`}
						fallback={`+${users.length - MAX_SHOWN_USERS}`}
					/>
				)}
			</div>
		</div>
	)
}

export const ParticipantsSkeleton = () => {
	return (
		<div className="absolute h-12 w-[6.25rem] top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md " />
	)
}
