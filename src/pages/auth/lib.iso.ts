// import { UserCreate, UserRole } from '~/db/types'
import { Roles } from '~/App.context'
import { getEnumFromClassInstance } from '~/lib/enums.iso'
import { assertAttrsWithin, assertValid, assertValidSet } from '~/lib/validation.iso'

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
export const LoginPropsPlaceholder = new LoginProps({email: userPlaceholder.email, password: userPlaceholder.password})
export const LoginPropsEnum = getEnumFromClassInstance(LoginPropsPlaceholder)

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
				acceptedTerms: assertValid('acceptedTerms', props.acceptedTerms, ['isDefined', 'isBoolean', 'isTruthy']),
			})
			Object.assign(this, props)
		}
}
export const RegisterPropsPlaceholder = new RegisterProps({
	email: userPlaceholder.email, password: userPlaceholder.password, 
	givenName: userPlaceholder.givenName, surname: userPlaceholder.surname, acceptedTerms: true
})
export const RegisterPropsEnum = getEnumFromClassInstance(RegisterPropsPlaceholder)

export class UpdatePasswordProps {
		email = ''
		passwordCurrent = ''
		passwordNext = ''
		passwordNextConfirm = ''
		constructor(props: any) {
			assertAttrsWithin(props, this)
			assertValidSet<UpdatePasswordProps>(props, {
				email: assertValid('email', props.email, ['isDefined', 'isString', 'isEmail']),
				passwordCurrent: assertValid('passwordCurrent', props.passwordCurrent, ['isDefined', 'isString', 'isNoneEmpty']),
				passwordNext: assertValid('passwordNext', props.passwordNext, 
					['isDefined', 'isString', 'isNoneEmpty', 'isPassword'],
					{ isDifferent: { expected: props.passwordCurrent, message: 'new password must be different than current' } }
				),
				passwordNextConfirm: assertValid('new password (confirm)', props.passwordNextConfirm, 
					['isDefined', 'isString', 'isNoneEmpty'], 
					{ isEqual: { expected: props.passwordNext, message: 'new confirmed needs to match new' } }
				),
			})
			Object.assign(this, props)
		}
}
export const UpdatePasswordPropsPlaceholder = new UpdatePasswordProps({
	email: userPlaceholder.email, passwordCurrent: userPlaceholder.password, 
	passwordNext: userPlaceholder.password+'2', passwordNextConfirm: userPlaceholder.password+'2'
})
export const UpdatePasswordPropsEnum = getEnumFromClassInstance(UpdatePasswordPropsPlaceholder)

export class ForgotPasswordProps {
		email = ''
		constructor(props: any) {
			assertAttrsWithin(props, this)
			assertValidSet<ForgotPasswordProps>(props, {
				email: assertValid('email', props.email, ['isDefined', 'isString', 'isEmail']),
			})
			Object.assign(this, props)
		}
}
export const ForgotPasswordPropsPlaceholder = new ForgotPasswordProps({email: userPlaceholder.email})
export const ForgotPasswordPropsEnum = getEnumFromClassInstance(ForgotPasswordPropsPlaceholder)

