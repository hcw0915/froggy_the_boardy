import { v } from 'convex/values'
import { defineSchema, defineTable } from 'convex/server'

const Schema = {
	boards: defineTable({
		title: v.string(),
		orgId: v.string(),
		authorId: v.string(),
		authorName: v.string(),
		imageUrl: v.string()
	})
		// 索引 GPT: https://chat.openai.com/share/d5889735-2105-49db-ab3a-346607316179
		/* 建立 index */
		.index('by_org', ['orgId'])
		/* 為了 title 建立搜尋的 index */
		.searchIndex('search_title', {
			searchField: 'title',
			filterFields: ['orgId']
		})
}

export default defineSchema(Schema)
