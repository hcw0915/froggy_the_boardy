export type Color = {
	r: number
	g: number
	b: number
}

export type Camera = {
	x: number
	y: number
}

export enum LayerType {
	Rectangle,
	Ellipse,
	Path,
	Text,
	Note
}

export type BaseLayer<T extends LayerType> = {
	type: T
	x: number
	y: number
	width: number
	height: number
	fill: Color
	value?: string
}

export type RectangleLayer = BaseLayer<LayerType.Rectangle>
export type EllipseLayer = BaseLayer<LayerType.Ellipse>
export type PathLayer = BaseLayer<LayerType.Path> & { points: number[][] }
export type TextLayer = BaseLayer<LayerType.Text>
export type NoteLayer = BaseLayer<LayerType.Note>

export type Point = {
	x: number
	y: number
}

export type XYWH = {
	x: number
	y: number
	width: number
	height: number
}

export enum Side {
	Top = 1,
	Bottom = 2,
	Left = 4,
	Right = 8
}

export enum CanvasMode {
	None,
	Pressing,
	SelectionNet,
	Translating,
	Inserting,
	Resizing,
	Pencil
}

export type LayerInsertingType =
	| LayerType.Ellipse
	| LayerType.Rectangle
	| LayerType.Text
	| LayerType.Note

export type CanvasState =
	| {
			mode: CanvasMode.None
	  }
	| {
			mode: CanvasMode.Pressing
			origin: Point
	  }
	| {
			mode: CanvasMode.SelectionNet
			origin: Point
			current?: Point
	  }
	| {
			mode: CanvasMode.Translating
			current: Point
	  }
	| {
			mode: CanvasMode.Inserting
			layerType: LayerInsertingType
	  }
	| {
			mode: CanvasMode.Resizing
			initialBounds: XYWH
			corner: Side
	  }
	| {
			mode: CanvasMode.Pencil
	  }

export type Layer =
	| RectangleLayer
	| EllipseLayer
	| PathLayer
	| TextLayer
	| NoteLayer
