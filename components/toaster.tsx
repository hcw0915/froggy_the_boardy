import { toast } from 'sonner'

export const toaster = async (success?: string, error?: string) => {
	return new Promise((resolve, reject) => {
		resolve('Success data')
	})
		.then(() => {
			toast.success(success || 'Success')
		})
		.catch((err) => {
			toast.error(error || 'Error')
		})
}
