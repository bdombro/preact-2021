import { h } from 'preact'
import { useCallback } from 'preact/hooks'

import { AuthCtx, ToastCtx } from '~/App.context'
import { Roles } from '~/App.context'
import { getEnumFromClassInstance } from '~/lib/enums.iso'
import { ErrorMessage, FormValues, SubmitButton, TextField, useForm } from '~/lib/forms'
import qs from '~/lib/queryStrings'
import { nav } from '~/lib/router'
import { assertAttrsWithin, assertValid, assertValidSet } from '~/lib/validation.iso'
import { Paths } from '~/routes'

export default function Login() {
	const Form = useForm()
	const onSubmit = useCallback(_onSubmit, [])
	const { submitting, errors } = Form.state
	return <div>
		<h1>Login</h1>
		<Form.Component onSubmit={onSubmit}>
			<TextField
				name={LoginPropsEnum.email}
				labelText="Email"
				type="text"
				placeholder={LoginPropsPlaceholder.email}
				value={LoginPropsPlaceholder.email}
				disabled={submitting}
				error={errors[LoginPropsEnum.email]?.note}
				autoFocus
			/>
			<TextField
				name={LoginPropsEnum.password}
				labelText="Password"
				type="password"
				placeholder="********"
				value={LoginPropsPlaceholder.password}
				disabled={submitting}
				error={errors[LoginPropsEnum.password]?.note}
			/>
			<SubmitButton>Login</SubmitButton>
			<ErrorMessage>{errors.form?.note}</ErrorMessage>
		</Form.Component>
		<a href={`${Paths.Register}${location.search}#replace`}>Need an account?</a><br />
		<a href={`${Paths.ForgotPassword}${location.search}#replace`}>Forgot your password?</a>
	</div>

	async function _onSubmit(formValues: FormValues) {
		const values = new LoginProps(formValues)
		AuthCtx.loginAsAdmin()
		ToastCtx.set({ message: 'Welcome, admin!', location: 'right' })
		const {from} = qs.parse()
		if (from) nav(from, {replace: true})
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

export class LoginProps {
	email = ''
	password = ''
	constructor(props: any) {
		assertAttrsWithin(props, this)
		assertValidSet<LoginProps>(props, {
			email: assertValid('email', props.email, ['isDefined', 'isString', 'isEmail']),
			password: assertValid('password', props.password, ['isDefined', 'isString', 'isNoneEmpty']),
		})
		Object.assign(this, props)
	}
}
export const LoginPropsPlaceholder = new LoginProps({ email: userPlaceholder.email, password: userPlaceholder.password })
export const LoginPropsEnum = getEnumFromClassInstance(LoginPropsPlaceholder)