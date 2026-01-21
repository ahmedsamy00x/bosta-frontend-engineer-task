import { Outlet } from "react-router"
import Navbar from "./Navbar"

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto max-w-4xl mt-12 px-4">
        <Outlet />
      </main>
      {/* Optional: Add footer here */}
      <footer className="border-t border-border/40 py-6 mt-auto">
        <div className="container mx-auto max-w-7xl px-4">
          <p className="text-center text-sm text-muted-foreground">
            © 2026 Your Store. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default AppLayout