import { toast } from 'sonner'

//! Should be rewrite to generic way

export class PromiseHandler {
	private promise: Promise<void>

	constructor(promise: Promise<void>) {
		this.promise = promise
	}

	toaster(successMessage: string, errorMessage: string): PromiseHandler {
		this.promise
			.then(() => {
				toast.success(successMessage)
			})
			.catch(() => {
				toast.error(errorMessage)
			})
		return this
	}

	//! Override the Promise methods
	then(onFulfilled: (value: any) => void): PromiseHandler {
		this.promise = this.promise.then(onFulfilled)
		return this
	}

	catch(onRejected: (error: any) => void): PromiseHandler {
		this.promise = this.promise.catch(onRejected)
		return this
	}

	finally(onRejected: () => void): PromiseHandler {
		this.promise = this.promise.finally(onRejected)
		return this
	}
}
