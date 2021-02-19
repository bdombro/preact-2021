window.addEventListener('submit', (e) => e.preventDefault())

import {ComponentChildren, Fragment as F,FunctionalComponent,h} from 'preact'
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'

import Checkbox from '~/layout/components/Checkbox'
import { ValidationErrorSet } from '~/lib/validation.iso'

import { useMountedState } from './hooks'
import styled from './styled'

/**
 * Hook that makes forms super easy and DRY
 * Note: Makes assumptions about server-side error handling
 */
export function useForm(): UseFormReturn {
	// Idea 1: Would be nice if we captured initial values and had an action to reset the form to initial values
	// Could be done by gettng the values of form and saving them to state

	const [state, setState] = useState(formDefaultState)
	const FormComponentMemoized = useCallback(FormComponent, [])

	return {
		Component: FormComponentMemoized,
		state,
		resetState: () => setState(formDefaultState),
	}

	function FormComponent({ children, onSubmit, ...formProps }: UseFormComponentProps) {
		const isMounted = useMountedState()
		return <Form onSubmit={onSubmitStateWrapper} {...formProps}>{children}</Form>

		async function onSubmitStateWrapper(formValues: FormValues) {
			setState(last => ({ ...last, submitting: true }))
			try {
				await onSubmit(formValues)
				if (isMounted()) setState(last => ({ ...last, submitting: false, submitted: true, accepted: true, errors: {} }))
			} catch (error) {
				if (error instanceof ValidationErrorSet)
					setState(last => ({
						...last, submitting: false, submitted: true,
						errors: {
							form: { attrName: 'form', type: 'FormError', note: 'Please check form for errors.' },
							...error.context.errorSet
						}
					}))
				else
					setState(last => ({ ...last, submitting: false, submitted: true, errors: { form: error.message } }))
			}
		}
	}
}
const formDefaultState: UseFormState = {
	submitting: false,
	submitted: false,
	accepted: false,
	errors: {}
}
interface UseFormState {
  submitting: boolean,
  submitted: boolean,
  accepted: boolean,
  // errors: Partial<Record<keyof LoginProps | 'form', any>>
  errors: Record<string, any>
}
type UseFormComponentProps = FormProps
interface UseFormReturn {
  Component: FunctionalComponent<UseFormComponentProps>
  state: UseFormState
  resetState: () => void
}


/**
 * A form with essential elements
 */
export type FormValues = Record<string, string | string[] | number | number[] | boolean | boolean[]>
interface FormProps extends Omit<h.JSX.HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  onSubmit: (formValues: FormValues) => Promise<any>
  children: ComponentChildren
}
export function Form({ onSubmit, children, class: className, ...formProps }: FormProps) {
	return (
		<FormDiv class={`form ${className}`} onSubmit={onSubmitInner} {...formProps}>
			{children}
		</FormDiv>
	)

	function onSubmitInner(formEvent: any) {
		formEvent.preventDefault()
		const formValues = formToValues(formEvent.target)
		onSubmit(formValues)
	}
}
const FormDiv = styled.form`
  :root .form-error
    color: var(--danger)
`

/**
 * A text input with label and error handling
 */
interface TextProps extends h.JSX.HTMLAttributes<HTMLInputElement> {
  name: string;
  labelText: string;
  error?: string;
}
export function TextField({ name, labelText, error, type = 'text', class: className, ...inputProps }: TextProps) {
	return (
		<TextFieldDiv class={`${className} ${!!error && 'hasError'}`}>
			<label>{labelText}
				<input type={type} name={name} {...inputProps} />
			</label>
			<div class="error">{error}</div>
		</TextFieldDiv>
	)
}
const TextFieldDiv = styled.div`
	:root
		margin-bottom: .4rem
	:root label
		font-size: .9rem
  :root input
    display: block
	:root input
		margin-top: 1px
		width: 200px
		max-width: 100%
  :root.hasError input
    border: 1px solid var(--danger)
  :root .error
    display: none
    color: var(--danger)
  :root.hasError .error
    display: block
`

/**
 * A checkbox input with label and error handling
 */
interface CheckboxProps {
  labelText: ComponentChildren
  error?: string
	divProps?: h.JSX.HTMLAttributes<HTMLDivElement>
	inputProps: Omit<h.JSX.HTMLAttributes<HTMLInputElement>, 'name'> & { name: string, 'aria-label': string }
}
// TODO: Support controlled
export function CheckboxField(p: CheckboxProps) {
	const [checked, setChecked] = useState(p.inputProps?.checked)
	const toggleBox = useCallback(function _toggleBox() { setChecked(curr => !curr) }, [])
	return (
		<CheckboxFieldDiv data-error={!!p.error} {...p.divProps} >
			<div>
				<Checkbox inputProps={{ ...p.inputProps, onClick: toggleBox, checked: checked}}/>
				<div onClick={toggleBox}>
					{p.labelText}
				</div>
			</div>
			<div class="error">{p.error}</div>
		</CheckboxFieldDiv>
	)
}
const CheckboxFieldDiv = styled.div`
	:root
		margin-bottom: .6rem
  :root>div
    display: flex
		flex-direction: row
		cursor: pointer
  :root[data-error="true"] input
    border: 1px solid var(--danger)
  :root .error
    display: none
    color: var(--danger)
  :root[data-error="true"] .error
    display: block
`

export function ErrorMessage({ children, class: className = '', ...buttonProps }: h.JSX.HTMLAttributes<HTMLDivElement>) {
	return children ? (
		<div class={`form-error-message ${className}`} {...buttonProps}>{children}</div>
	) : <F></F>
}

export function SubmitButton({ children, class: className = '', ...buttonProps }: h.JSX.HTMLAttributes<HTMLButtonElement>) {
	return (
		<button style={{marginBottom:'.3rem'}} class={`form-submit-button ${className}`} {...buttonProps} type="submit">{children}</button>
	)
}

/**
 * Extracts form values from a <form> ref, such as e.target from form.onSubmit
 */
export function formToValues(formElement: any) {
	const reqBody: Record<string, any> = {}
	Object.keys(formElement.elements).forEach(key => {
		const field = formElement.elements[key]
		if (field.type !== 'submit') {
			reqBody[field.name] = field.type === 'checkbox' ? field.checked : field.value
		}
	})
	return reqBody
}
