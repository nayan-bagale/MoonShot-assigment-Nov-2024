import React from 'react'
import Login from './Login'
import Signup from './Signup'

const Auth = () => {
    const [auth, setAuth] = React.useState<'login' | 'signup'>('login')
    return auth === 'login' ? (<Login setAuth={setAuth} />) : (<Signup setAuth={setAuth} /> )
}

export default Auth