import Login from '../components/Login'
import SignUp from '../components/SignUp'
import Users from '../components/Users'
import Home from '../components/Home'
import ProtectedRoute from './ProtectedRoute'
import AdminGuard from './AdminGuard'
import SendersAddress from '../components/SendersAddress'
import SingleTemplate from '../components/SingleTemplate'
import CreateTemplate from '../components/CreateTemplate'

import { Navigate } from 'react-router-dom'

const AppRoutes = [
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <SignUp />
    },

    {
        path: '/users',
        element: <AdminGuard><Users /></AdminGuard>
    },
    {
        path: '*',
        element: <Navigate to='/login' />
    },
    {
        path: '/',
        element: <ProtectedRoute><Home /></ProtectedRoute>
    },
    {
        path: '/addsendersaddress',
        element: <ProtectedRoute><SendersAddress /></ProtectedRoute>
    },
    {
        path: '/fulltemplate',
        element: <ProtectedRoute><SingleTemplate /></ProtectedRoute>
    },
    {
        path: '/createtemplate',
        element: <ProtectedRoute><CreateTemplate /></ProtectedRoute>
    }

]

export default AppRoutes