import { v } from 'convex/values'
import { mutation } from './_generated/server'

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

		await ctx.db.delete(args.id)

		// TODO - delete favorites
	}
})

/** //* 統一行為
 * convex 協助建立 _id, _creationTime 兩個 index
 * ctx 對應到 schema 裡面的 context,
 *
 * 運用 ctx 這個 Schema 建立的 instance ，調用 Auth 資訊。
 *
 * handler =>>>> 將資料加入 db 裡面
 */

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
