import { notusToast } from '~/utils/notusToast'
import * as routes from '~/../config/routes'

const debug = require('debug')('notus:signupHelper')

export const signupHelper = (component) => {
  component.props.signUp({
    variables: {
      email: component.state.email
    },
    refetchQueries: ['currentUserQuery']
  }).then((mutationResult) => {
    debug('mutationResult', mutationResult)
    const { signUp } = mutationResult.data

    if (signUp.previouslySignedUp) {
      // notusToast.error('Already signed up? Check your email for the account confirmation link.')
      component.props.setTimeout(() => {
        component.setState({
          success: true,
          signingUp: false
        })
      }, 500)
    } else if (signUp.signedIn) {
      notusToast.info('Account created successfully, welcome to Notus!')
      component.props.history.push(routes.MY_EVENTS)
    } else {
      // shouldn't end up here
      debug('unhandled mutationResult', mutationResult)
    }
  }).catch(error => {
    debug(error)

    component.props.setTimeout(() => {
      component.setState({
        success: false,
        signingUp: false
      })
    }, 1000)

    notusToast.info(error.message)
  })
}
