import { Route, Routes } from 'react-router'
import PublicLayout from './PublicLayout.tsx'
import HomePage from '../pages/public/HomePage.tsx'
import AboutPage from '../pages/public/AboutPage.tsx'   
import ArticlesPage from '../pages/public/ArticlesPage.tsx'
import NotFoundPage from '../pages/public/NotFoundPage.tsx'

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="articles" element={<ArticlesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}