import { h } from 'preact'
import { useCallback } from 'preact/hooks'

import { AuthCtx, ToastCtx } from '~/App.context'
import { Roles } from '~/App.context'
import { Logo } from '~/layout/components/Logo'
import { getEnumFromClassInstance } from '~/lib/enums.iso'
import { CheckboxField, ErrorMessage, FormValues, SubmitButton, TextField, useForm } from '~/lib/forms'
import qs from '~/lib/queryStrings'
import { nav } from '~/lib/router'
import { assertAttrsWithin, assertValid, assertValidSet } from '~/lib/validation.iso'
import { Paths } from '~/routes'

export default function Register() {
	const Form = useForm()
	const onSubmit = useCallback(_onSubmit, [])
	const { submitting, errors } = Form.state
	return <div>
		<Logo size={3} style={{ marginLeft: -10 }} />
		<Form.Component onSubmit={onSubmit}>
			<TextField
				name={RegisterPropsEnum.givenName}
				labelText="First Name"
				type="text"
				placeholder={RegisterPropsPlaceholder.givenName}
				value={RegisterPropsPlaceholder.givenName}
				disabled={submitting}
				error={errors[RegisterPropsEnum.givenName]?.note}
				autoFocus
			/>
			<TextField
				name={RegisterPropsEnum.surname}
				labelText="Last Name"
				type="text"
				placeholder={RegisterPropsPlaceholder.surname}
				value={RegisterPropsPlaceholder.surname}
				disabled={submitting}
				error={errors[RegisterPropsEnum.surname]?.note}
			/>
			<TextField
				name={RegisterPropsEnum.email}
				labelText="Email"
				type="text"
				placeholder={RegisterPropsPlaceholder.email}
				value={RegisterPropsPlaceholder.email}
				disabled={submitting}
				error={errors[RegisterPropsEnum.email]?.note}
			/>
			<TextField
				name={RegisterPropsEnum.password}
				labelText="Password"
				type="password"
				placeholder="********"
				value={RegisterPropsPlaceholder.password}
				disabled={submitting}
				error={errors[RegisterPropsEnum.password]?.note}
			/>
			<CheckboxField
				inputProps={{ name: RegisterPropsEnum.acceptedTerms, disabled: submitting, 'aria-label': 'Do you agree to the terms at the following link? {put link here}'}}
				labelText={<span>Do you agree to these<br/>terms?</span>}
				error={errors[RegisterPropsEnum.acceptedTerms]?.note}
			/>
			<SubmitButton>Register</SubmitButton>
			<ErrorMessage>{errors.form?.note}</ErrorMessage>
		</Form.Component>
		<a href={`${Paths.Login}${location.search}#replace`}>Have an account?</a><br />
		<a href={`${Paths.ForgotPassword}${location.search}#replace`}>Forgot your password?</a>
	</div>

	async function _onSubmit(formValues: FormValues) {
		const values = new RegisterProps(formValues)
		AuthCtx.loginAsAdmin()
		ToastCtx.set({ message: 'Welcome, admin!', location: 'right' })
		const { from } = qs.parse()
		if (from) nav(from, { replace: true })
		else nav(Paths.AdminRoot)
	}
}

const userPlaceholder = {
	email: 'admin@example.com',
	roles: [Roles.admin],
	password: 'Password8',
	givenName: 'Sally',
	surname: 'Fields',
} as const

export class RegisterProps {
	email = ''
	password = ''
	givenName = ''
	surname = ''
	acceptedTerms = ''
	constructor(props: any) {
		assertAttrsWithin(props, this)
		assertValidSet<RegisterProps>(props, {
			email: assertValid('email', props.email, ['isDefined', 'isString', 'isEmail']),
			password: assertValid('password', props.password, ['isDefined', 'isString', 'isNoneEmpty', 'isPassword']),
			givenName: assertValid('givenName', props.givenName, ['isDefined', 'isString', 'isNoneEmpty']),
			surname: assertValid('surname', props.surname, ['isDefined', 'isString', 'isNoneEmpty']),
			acceptedTerms: assertValid('accept terms', props.acceptedTerms, ['isDefined', 'isBoolean', 'isTruthy']),
		})
		Object.assign(this, props)
	}
}
export const RegisterPropsPlaceholder = new RegisterProps({
	email: userPlaceholder.email, password: userPlaceholder.password,
	givenName: userPlaceholder.givenName, surname: userPlaceholder.surname, acceptedTerms: true
})
export const RegisterPropsEnum = getEnumFromClassInstance(RegisterPropsPlaceholder)
