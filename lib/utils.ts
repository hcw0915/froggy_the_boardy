import { Camera, Color } from '@/types/canvas'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const COLORS = ['#DC2626', '#D97706', '#059669', '#7C3AED', '#DB2777']

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

// Get Random Color from the remaining values
export function connectionIdToColor(connectionId: number): string {
	return COLORS[connectionId % COLORS.length]
}

export function pointerEventToCanvasPoint(
	e: React.PointerEvent,
	camera: Camera
) {
	return {
		x: Math.round(e.clientX) - camera.x,
		y: Math.round(e.clientY) - camera.y
	}
}

function colorToString16(color: number) {
	return `${color.toString(16).padStart(2, '0')}`
}

export function colorToCss(color: Color) {
	const { r, g, b } = color
	return `#${colorToString16(r)}${colorToString16(g)}${colorToString16(b)}`
}
