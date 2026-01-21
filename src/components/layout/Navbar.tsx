import { Link } from "react-router"
import { ShoppingCart, Menu } from "lucide-react"
import { Button } from "../ui/button"
import { useNavigate } from "react-router"  
import { useCartStore } from "@/services/store/CartStore"
const Navbar = () => {
  const navigate = useNavigate()
  const { cart } = useCartStore()
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-xl font-semibold tracking-tight">
              <span className="bg-linear-to-r from-primary to-chart-3 bg-clip-text text-transparent">
                Store
              </span>
            </h1>
          </Link>

          {/* Navigation Links */}
          {/* <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Products
            </Link>
            <Link 
              to="/categories" 
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Categories
            </Link>
            <Link 
              to="/about" 
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              About
            </Link>
          </div> */}

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon-sm" className="relative" onClick={() => navigate("/cart")}>
              <ShoppingCart className="size-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                {cart.length}
              </span>
            </Button>
            
            <Button variant="ghost" size="icon-sm" className="md:hidden">
              <Menu className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar