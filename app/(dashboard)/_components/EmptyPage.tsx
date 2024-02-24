import Image from 'next/image'
import React from 'react'

interface EmptyPage {
	className?: string
	src: string
	width?: number
	height?: number
	description?: string
	renderProps?: React.ReactNode
}

export const EmptyPage = (props: EmptyPage) => {
	const {
		className,
		src,
		width = 300,
		height = 300,
		description = 'OOPS! ERROR',
		renderProps
	} = props
	return (
		<div className="h-full flex flex-col items-center justify-center">
			<Image src={src} alt="404 error" width={width} height={height} />
			<div className="text-2xl font-bold mt-6">{description}</div>
			{renderProps}
		</div>
	)
}
