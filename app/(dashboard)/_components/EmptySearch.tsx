import Image from 'next/image'
import React from 'react'

export const EmptySearch = () => {
	return (
		<div className="h-full flex flex-col items-center justify-center">
			<Image src="/logo.png" alt="logo" width={300} height={300} />
			<div className="text-2xl font-bold mt-6">OOPS! IT'S EMPTY HERE</div>
		</div>
	)
}
