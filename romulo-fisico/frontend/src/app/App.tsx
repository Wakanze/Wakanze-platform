import { Route, Routes } from 'react-router'
import PublicLayout from './PublicLayout.tsx'
import HomePage from '../pages/public/HomePage.tsx'
import AboutPage from '../pages/public/AboutPage.tsx'
import ArticlesPage from '../pages/public/ArticlesPage.tsx'
import ArticlePage from '../pages/public/ArticlePage.tsx'
import EventsPage from '../pages/public/EventsPage.tsx'
import CreatorsPage from '../pages/public/CreatorsPage.tsx'
import JoinPage from '../pages/public/JoinPage.tsx'
import SubscriptionStatusPage from '../pages/public/SubscriptionStatusPage.tsx'
import NotFoundPage from '../pages/public/NotFoundPage.tsx'
import StaffHomePage from '../pages/admin/StaffHomePage.tsx'
import AuthProvider from '../features/auth/AuthProvider.tsx'
import LoginPage from '../features/auth/LoginPage.tsx'
import RequireStaff from '../features/auth/RequireStaff.tsx'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="articles/:slug" element={<ArticlePage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="creators" element={<CreatorsPage />} />
          <Route path="join" element={<JoinPage />} />
          <Route path="subscribe/confirmed" element={<SubscriptionStatusPage status="confirmed" />} />
          <Route path="unsubscribe" element={<SubscriptionStatusPage status="unsubscribed" />} />
          <Route path="staff/login" element={<LoginPage />} />
          <Route
            path="staff"
            element={
              <RequireStaff>
                <StaffHomePage />
              </RequireStaff>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
