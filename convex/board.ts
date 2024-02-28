import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

// TODO - 需要處理 Add New PICs.
const images = ['']

//~ CREATE
export const create = mutation({
	// 需要給予的 args => useMutate(<api>, args)
	args: {
		orgId: v.string(),
		title: v.string()
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()

		if (!identity) {
			throw new Error('Unauthorized access.')
		}

		/** 隨機主頁圖片 */
		const randomImage = images[Math.floor(Math.random() * images.length)]

		/** 把資料塞進 db 裡名為 boards 的表中 */
		const board = await ctx.db.insert('boards', {
			title: args.title,
			orgId: args.orgId,
			authorId: identity.subject,
			authorName: identity.name!,
			imageUrl: randomImage
		})

		return board
	}
})

//~ DELETE
export const remove = mutation({
	args: {
		id: v.id('boards')
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()

		if (!identity) {
			throw new Error('Unauthorized access.')
		}

		// TODO - delete favorites

		const userId = identity.subject

		const existingFavorite = await ctx.db
			.query('userFavorites')
			.withIndex('by_user_board', (q) =>
				q.eq('userId', userId).eq('boardId', args.id)
			)
			.unique()

		if (existingFavorite) {
			await ctx.db.delete(existingFavorite._id)
		}

		await ctx.db.delete(args.id)
	}
})

export const update = mutation({
	args: {
		// id: <TableName>
		id: v.id('boards'),
		title: v.string()
	},
	handler: async (ctx, args) => {
		// check the Auth
		const identity = await ctx.auth.getUserIdentity()

		if (!identity) {
			throw new Error('Unauthorized access.')
		}

		// validate
		const title = args.title.trim()

		if (!title) {
			throw new Error('Title is required')
		}

		if (title.length > 60) {
			throw new Error('Title cannot be longer than 60 characters.')
		}

		// update the title
		const board = await ctx.db.patch(args.id, {
			title: args.title
		})

		return board
	}
})

export const favorite = mutation({
	args: {
		id: v.id('boards'),
		orgId: v.string()
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()
		/* prettier-ignore */
		if (!identity) throw new Error('Unauthorized access.')

		const board = await ctx.db.get(args.id)
		/* prettier-ignore */
		if (!board) throw new Error('Board not found')

		const userId = identity.subject

		// 比對 使用者 ID,
		const existingFavorite = await ctx.db
			.query('userFavorites')
			.withIndex(
				'by_user_board_org',
				(q) =>
					q
						.eq('userId', userId) //
						.eq('boardId', board._id) //
			)
			.unique() // board._id 應該是唯一值

		/* prettier-ignore */
		if (existingFavorite) throw new Error('Board already Exist in Favorites.')

		await ctx.db.insert('userFavorites', {
			userId,
			boardId: board._id,
			orgId: args.orgId
		})

		return board
	}
})

export const unfavorite = mutation({
	args: {
		id: v.id('boards')
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()
		/* prettier-ignore */
		if (!identity) throw new Error('Unauthorized access.')

		const board = await ctx.db.get(args.id)
		/* prettier-ignore */
		if (!board) throw new Error('Board not found')

		const userId = identity.subject

		// 比對 使用者 ID,
		const existingFavorite = await ctx.db
			.query('userFavorites')
			.withIndex(
				'by_user_board_org',
				(q) =>
					q
						.eq('userId', userId) //
						.eq('boardId', board._id) //
				// TODO - check if orgId needed
			)
			.unique() // board._id 應該是唯一值

		/* prettier-ignore */
		if (!existingFavorite) throw new Error('Favorite board not found.')

		await ctx.db.delete(existingFavorite._id)
		return board
	}
})

export const get = query({
	args: { id: v.id('boards') },
	handler: async (ctx, args) => {
		const board = ctx.db.get(args.id)

		return board
	}
})
