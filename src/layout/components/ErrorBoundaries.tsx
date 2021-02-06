import { ComponentChildren, Fragment as F, h } from 'preact'
import { useEffect, useErrorBoundary, useState } from 'preact/hooks'

import styled from '~/lib/styled'

/**
 * Catch Promise Rejection Errors
 * Place this component once, at the top of your app
 */
export function UnhandledErrorNotification() {
	const [promiseErrorEvent, setPromiseErrorEvent] = useState<any>(null)
	useEffect(listenForPromiseErrors, [])
	return promiseErrorEvent ? <ErrorC/> : <F />

	function listenForPromiseErrors() {
		window.addEventListener('unhandledrejection', handleReject)
		return () => window.removeEventListener('unhandledrejection', handleReject)

		function handleReject(eventNext: any) {
			setPromiseErrorEvent(eventNext)
			// TODO: Log the error somewhere
		}
	}
}

/**
 * Catch runtime/synchronous errors
 * Wrap Components in this to catch the errors near the Component
 * Note: It cannot detect/catch promise rejections.
 */
export function ErrorBoundary({children}: {children: ComponentChildren}) {
	const [runtimeError] = useErrorBoundary()
	useEffect(reportRuntimeError, [runtimeError])
	return <F>{children}{runtimeError ? <ErrorC/> : ''}</F>
	function reportRuntimeError() {
		if (runtimeError) {
			console.error(runtimeError)
			// TODO: Log the error somewhere
		}
	}
}

function ErrorC() {
	return (
		<ErrorOuter>
			<ErrorInner>
			Something went wrong on this page! Shoot. Maybe&nbsp;
				<ErrorLink href="javascript:location.reload()">refresh</ErrorLink>?
			</ErrorInner>
		</ErrorOuter>
	)
}
const ErrorOuter = styled.div`
	:root { 
		position:absolute;
		bottom:0;
		left:0;
		width:100%;
		text-align:center;
		z-index:100;
	}
`
const ErrorInner = styled.div`
	:root {
		padding:20px;
		background-color:var(--primary);
		display:inline-block;
		color:#fff;
	}
`
const ErrorLink = styled.a`
	:root {
		color:hsl(var(--primary-h),var(--primary-s),80%);
		text-decoration:underline;
	}
	:root:hover {
		color:white;
	}
`
