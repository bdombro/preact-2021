// This middleware will just add the property asyncDispatch to all actions
// Src: https://stackoverflow.com/a/41260990/1202757

/**
 * 
 * You can then do the following from a reducer:
 * action.asyncDispatch({ type: 'sidebarRight/set', payload: true })
 * or
 * action.asyncDispatch(sidebarRight.set(true))
 */
export default (store: any) => (next: any) => (action: any) => {
	let syncActivityFinished = false
	let actionQueue: any[] = []

	function flushQueue() {
		actionQueue.forEach(a => store.dispatch(a)) // flush queue
		actionQueue = []
	}

	function asyncDispatch(asyncAction: any) {
		actionQueue = actionQueue.concat([asyncAction])

		if (syncActivityFinished) {
			flushQueue()
		}
	}

	const actionWithAsyncDispatch =
    Object.assign({}, action, { asyncDispatch })

	const res = next(actionWithAsyncDispatch)

	syncActivityFinished = true
	flushQueue()

	return res
}