import { Link } from "react-router"
import { ShoppingCart, LogOut } from "lucide-react"
import { Button } from "../ui/button"
import { useNavigate } from "react-router"  
import { useCartStore } from "@/stores/useCartStore"
import { useAuthStore } from "@/stores/useAuthStore"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
const Navbar = () => {
  const navigate = useNavigate()
  const { cart } = useCartStore()
  const { isAuthenticated, user, logout } = useAuthStore()

  const getUserInitials = () => {
    if (!user) return "U"
    return user.username.substring(0, 2).toUpperCase()
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-xl font-semibold tracking-tight">
              <span className="bg-linear-to-r from-primary to-chart-3 bg-clip-text text-transparent">
                Store
              </span>
            </h1>
          </Link>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon-sm" className="relative cursor-pointer" onClick={() => navigate("/cart")}>
              <ShoppingCart className="size-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                {cart.length}
              </span>
            </Button>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon-sm" 
                    className="rounded-full bg-primary/10 hover:bg-primary/20"
                  >
                    <span className="text-xs font-semibold text-primary">
                      {getUserInitials()}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user?.username}</p>
                      {user?.email && (
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="cursor-pointer" onClick={() => navigate("/login")}>
                  Sign In
                </Button>
                <Button size="sm" className="cursor-pointer" onClick={() => navigate("/signup")}>
                  Sign Up
                </Button>
              </>
            )}

          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar