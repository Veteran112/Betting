import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import { Box } from '@mui/system'
import LinearProgress from '@mui/material/LinearProgress'
import { Navbar } from 'layouts'

// const Home = React.lazy(() => import('pages/Home'))
const Landing = React.lazy(() => import('pages/Landing'))
const Login = React.lazy(() => import('pages/Login'))
const Register = React.lazy(() => import('pages/Register'))
const BettingProvider = React.lazy(() => import('pages/BettingProvider'))
const Provider = React.lazy(() => import('pages/Provider'))
const Interpreters = React.lazy(() => import('pages/WorkTime'))
const ManageAccounts = React.lazy(() => import('pages/ManageAccounts'))
const ForgotPasswordContainer = React.lazy(() => import('pages/ForgotPassword'))
const ResetPasswordContainer = React.lazy(() => import('pages/ResetPassword'))
const Dashboard = React.lazy(() => import('pages/Dashboard'))
const Bet = React.lazy(() => import('pages/Bet'))
const BetHistory = React.lazy(() => import('pages/History'))

export const RouterConfig = () => {
  return (
    <div>
      <React.Suspense
        fallback={
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        }
      >
        <Routes>
          {/* List all public routes here */}
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route
            exact
            path="/betting_provider"
            element={
              <PrivateRoute>
                <>
                  <Navbar />
                  <BettingProvider />
                </>
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/provider"
            element={
              <PrivateRoute>
                <>
                  <Navbar />
                  <Provider />
                </>
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/manage_users"
            element={
              <PrivateRoute>
                <>
                  <Navbar />
                  <ManageAccounts />
                </>
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/manage_users/:id"
            element={
              <PrivateRoute>
                <>
                  <Navbar />
                  <Interpreters />
                </>
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/forgot_password"
            element={<ForgotPasswordContainer />}
          />
          <Route
            exact
            path="/reset_password/:resetPasswordToken"
            element={<ResetPasswordContainer />}
          />
          <Route
            exact
            path="/dashboard"
            element={
              <PrivateRoute>
                <div>
                  <Navbar />
                  <Dashboard />
                </div>
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/bet"
            element={
              <PrivateRoute>
                <div>
                  <Navbar />
                  <Bet />
                </div>
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/history"
            element={
              <PrivateRoute>
                <div>
                  <Navbar />
                  <BetHistory />
                </div>
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to={'/'} />} />
        </Routes>
      </React.Suspense>
    </div>
  )
}
