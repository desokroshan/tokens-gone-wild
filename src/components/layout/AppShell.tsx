import { Outlet } from 'react-router-dom'
import { NavBar } from './NavBar'

export function AppShell() {
  return (
    <div className="min-h-screen" style={{ background: '#0f0f1a' }}>
      <NavBar />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  )
}
