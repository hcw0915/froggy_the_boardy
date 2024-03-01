import { api } from '@/convex/_generated/api'
import { auth, currentUser } from '@clerk/nextjs'
import { Liveblocks } from '@liveblocks/node'
import { ConvexHttpClient } from 'convex/browser'

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

//& https://liveblocks.io/docs/rooms/authentication/access-token-permissions/nextjs
const liveblocks = new Liveblocks({
	secret:
		'sk_dev_pMNUkcceusf6O2VqXWoULMWXHMmTP-AgX9-yf65yuaj97oPzlujOXb4b7LcGS60_'
})

/* 透過改寫 POST 處理權限問題 Access tokens example */
/* https://liveblocks.io/docs/api-reference/liveblocks-node */
export const POST = async (request: Request) => {
	// 跟 clerk 拿驗證資料
	const authorization = await auth()
	const user = await currentUser()

	if (!authorization || !user) {
		return new Response('Unauthorized', { status: 403 })
	}

	// 跟 props 進來的 request 拿資料， 要確認兩者 id 相符
	const { room } = await request.json()
	const board = await convex.query(api.board.get, { id: room })

	if (board?.orgId !== authorization.orgId) {
		return new Response('Unauthorized', { status: 403 })
	}

	const userInfo = {
		name: user.firstName || 'Teammate',
		picture: user.imageUrl
	}

	// 可以透過 liveblocks 的內建驗證處理權限問題。=> 可以利用第二個參數傳遞 data, 利用 useSelf() 調用
	const session = liveblocks.prepareSession(user.id, { userInfo })

	if (room) {
		session.allow(room, session.FULL_ACCESS)
	}

	const { status, body } = await session.authorize()
	return new Response(body, { status })
}
