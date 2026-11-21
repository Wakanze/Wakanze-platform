import { Navigate, Route, Routes } from 'react-router'
import PublicLayout from './PublicLayout.tsx'
import HomePage from '../pages/public/HomePage.tsx'
import AboutPage from '../pages/public/AboutPage.tsx'
import VideosPage from '../pages/public/VideosPage.tsx'
import SupportPage from '../pages/public/SupportPage.tsx'
import JoinPage from '../pages/public/JoinPage.tsx'
import SubscriptionStatusPage from '../pages/public/SubscriptionStatusPage.tsx'
import NotFoundPage from '../pages/public/NotFoundPage.tsx'

// Articles, Events and Supporters are hidden until they have real content.
// Their pages stay in pages/public/ so they can be switched back on.
export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="videos" element={<VideosPage />} />
        <Route path="support" element={<SupportPage />} />
        <Route path="donate" element={<Navigate to="/support" replace />} />
        <Route path="join" element={<JoinPage />} />
        <Route path="subscribe/confirmed" element={<SubscriptionStatusPage status="confirmed" />} />
        <Route path="unsubscribe" element={<SubscriptionStatusPage status="unsubscribed" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
