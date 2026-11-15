import { Route, Routes } from 'react-router'
import PublicLayout from './PublicLayout.tsx'
import HomePage from '../pages/public/HomePage.tsx'
import AboutPage from '../pages/public/AboutPage.tsx'
import ArticlesPage from '../pages/public/ArticlesPage.tsx'
import ArticlePage from '../pages/public/ArticlePage.tsx'
import EventsPage from '../pages/public/EventsPage.tsx'
import SupportersPage from '../pages/public/SupportersPage.tsx'
import DonatePage from '../pages/public/DonatePage.tsx'
import JoinPage from '../pages/public/JoinPage.tsx'
import SubscriptionStatusPage from '../pages/public/SubscriptionStatusPage.tsx'
import NotFoundPage from '../pages/public/NotFoundPage.tsx'

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="articles" element={<ArticlesPage />} />
        <Route path="articles/:slug" element={<ArticlePage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="supporters" element={<SupportersPage />} />
        <Route path="donate" element={<DonatePage />} />
        <Route path="join" element={<JoinPage />} />
        <Route path="subscribe/confirmed" element={<SubscriptionStatusPage status="confirmed" />} />
        <Route path="unsubscribe" element={<SubscriptionStatusPage status="unsubscribed" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
