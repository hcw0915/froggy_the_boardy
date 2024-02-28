import Image from 'next/image'

export const Loading = () => {
	return (
		<div className="h-full w-full flex flex-col justify-center items-center">
			<Image
				className="animate-pulse duration-700"
				src="/logo.png"
				alt="logo"
				width={120}
				height={120}
			/>
			<h1 className="animate-pulse duration-700">Hello, I'm Froggy.</h1>
		</div>
	)
}
