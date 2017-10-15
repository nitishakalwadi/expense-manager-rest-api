module.exports = {
    messages:{
        api: {
            common: {
                invalidApiEndpoint: 'Invalid api end point.'
            },
            auth: {
                unauthorized: 'Unautnorized access'
            },
            recaptcha: {
                failure: 'Recaptcha validation failed'
            }
        },
        signup: {
            failure: {
                emailExists: 'That email is already taken.'
            }
        },
        login: {
            failure: {
                userNotFound: 'No user found.',
                incorrectPassword: 'Oops! Wrong password.'
            }
        }
    },
    classes: {
        success:    'alert-success',
        failure:    'alert-danger',
        info:       'alert-info',
        warning:    'alert-warning'
    }
};