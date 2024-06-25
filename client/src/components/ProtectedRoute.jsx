import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useUserStore } from '../../store/userStore'

function ProtectedRoute({ children }) {
	const [loading, setLoading] = useState(true)
	const [isAuth, setIsAuth] = useState(false)

	const checkAuth = useUserStore(state => state.checkAuth)

	useEffect(() => {
		const verifyAuth = async () => {
			const authenticated = await checkAuth()
			setIsAuth(authenticated)
			setLoading(false)
		}

		verifyAuth()
	}, [checkAuth])

	if (loading) {
		return <div>Loading...</div>
	}

	if (!isAuth) return <Navigate to='/login' />

	return children
}

ProtectedRoute.propTypes = {
	children: PropTypes.node.isRequired
}

export default ProtectedRoute
