import Image from 'next/image'
import React from 'react'

export const EmptyFavorite = () => {
	return (
		<div className="h-full flex flex-col items-center justify-center">
			<Image src="/Broken_heart.svg" alt="404 error" width={300} height={300} />
			<div className="text-2xl font-bold mt-6">OOPS! NO FAVORITE HERE</div>
		</div>
	)
}
