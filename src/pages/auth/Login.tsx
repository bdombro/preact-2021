import { Fragment as F, h } from 'preact'
import { useCallback } from 'preact/hooks'

import { AuthCtx, ToastCtx } from '~/App.context'
import { Roles } from '~/App.context'
import { Logo } from '~/layout/components/Logo'
import { getEnumFromClassInstance } from '~/lib/enums.iso'
import { BooleanField, ErrorMessage, FormValues, SubmitButton, TextField, useForm } from '~/lib/forms'
import qs from '~/lib/queryStrings'
import { nav } from '~/lib/router'
import styled from '~/lib/styled'
import { assertAttrsWithin, assertValid, assertValidSet } from '~/lib/validation.iso'
import { Paths } from '~/routes'

export default function Login() {
	const [auth] = AuthCtx.use()
	const Form = useForm()
	const onSubmit = useCallback(_onSubmit, [])
	const { submitting, errors } = Form.state
	const { from } = qs.parse()
	
	if (auth.id) nav(from || Paths.Dashboard, { replace: true })

	return <LoginDiv>
		<Logo size={4} style={{marginLeft: -10, marginRight: -10, textAlign: 'center', display: 'block'}} />
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
			<BooleanField
				inputProps={{ name: LoginPropsEnum.asAdmin, disabled: submitting, 'aria-label': 'Sign-in as tenant?' }}
				labelText='Tenant Mode'
				checkedLabelText='Admin Mode'
				error={errors[LoginPropsEnum.asAdmin]?.note}
				type="switch"
			/>
			<SubmitButton>Login</SubmitButton>
			<ErrorMessage>{errors.form?.note}</ErrorMessage>
		</Form.Component>
		<a href={`${Paths.Register}${location.search}#replace`}>Need an account?</a><br />
		<a href={`${Paths.ForgotPassword}${location.search}#replace`}>Forgot your password?</a>
	</LoginDiv>

	async function _onSubmit(formValues: FormValues) {
		const values = new LoginProps(formValues)
		if (values.asAdmin) AuthCtx.loginAsAdmin()
		else AuthCtx.loginAsTenant()
		ToastCtx.set({ message: 'Welcome to Stacks!', location: 'right' })
	}
}
const LoginDiv = styled.div`
	:root input:not([type="checkbox"])
		width: 100%
	:root form svg.empty
		fill: var(--gray6)
	@media (max-width: 700px)
		:root
			margin-top: 5vh
		:root form
			margin-top: 20px
`

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
	asAdmin = ''
	constructor(props: any) {
		assertAttrsWithin(props, this)
		assertValidSet<LoginProps>(props, {
			email: assertValid('email', props.email, ['isDefined', 'isString', 'isEmail']),
			password: assertValid('password', props.password, ['isDefined', 'isString', 'isNoneEmpty']),
			asAdmin: assertValid('asAdmin', props.asAdmin, ['isDefined', 'isBoolean']),
		})
		Object.assign(this, props)
	}
}
export const LoginPropsPlaceholder = new LoginProps({
	email: userPlaceholder.email,
	password: userPlaceholder.password,
	asAdmin: false,
})
export const LoginPropsEnum = getEnumFromClassInstance(LoginPropsPlaceholder)