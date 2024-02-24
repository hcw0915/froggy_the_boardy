import { useState } from 'react'
import { useMutation } from 'convex/react'

export const useApiMutation = (mutationFunction: any) => {
	const [pending, setPending] = useState(false)
	const apiMutation = useMutation(mutationFunction)

	const handleMutate = (payload: any) => {
		setPending(() => true)

		const result = apiMutation(payload)
			.then((data) => {
				return data
			})
			.catch((err) => {
				throw err
			})
			.finally(() => setPending(() => false))

		return result
	}

	return { handleMutate, pending }
}
