import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, Upload, Bell, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  isAuthenticated?: boolean;
  userRole?: "merchant" | "user" | null;
  username?: string;
  avatarUrl?: string;
}

export const Navbar = ({
  isAuthenticated = false,
  userRole = null,
  username = "",
  avatarUrl = "",
}: NavbarProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSignOut = () => {
    // Will be implemented with Supabase
    navigate("/auth/sign-in");
  };

  const navLinks = [
    { text: "Home", href: "/" },
    { text: "Discover", href: "/discover" },
    { text: "Trending", href: "/trending" },
  ];

  // Merchant-specific links
  const merchantLinks = [
    { text: "My Videos", href: "/my-videos" },
    { text: "Analytics", href: "/analytics" },
  ];

  const mobileNavLinks = [
    ...navLinks,
    ...(userRole === "merchant" ? merchantLinks : []),
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-background"
      }`}
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Toggle Menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-xs">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-2 pt-4">
                    <div className="w-8 h-8 rounded-full bg-brand-purple flex items-center justify-center">
                      <span className="text-white text-sm font-bold">L</span>
                    </div>
                    <span className="text-xl font-bold">Lookym</span>
                  </div>
                  <nav className="flex flex-col mt-8 gap-1">
                    {mobileNavLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        className="flex items-center py-2 px-4 hover:bg-muted rounded-md transition-colors"
                      >
                        {link.text}
                      </Link>
                    ))}
                    {userRole === "merchant" && (
                      <Link
                        to="/upload"
                        className="flex items-center mt-2 py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                      >
                        <Upload className="h-5 w-5 mr-2" />
                        Upload New Video
                      </Link>
                    )}
                  </nav>
                  <div className="mt-auto mb-8">
                    {isAuthenticated ? (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleSignOut}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => navigate("/auth/sign-in")}
                        >
                          Sign In
                        </Button>
                        <Button
                          className="w-full"
                          onClick={() => navigate("/auth/sign-up")}
                        >
                          Sign Up
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Link to="/" className="flex items-center gap-2">
              <motion.div
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.5 }}
                className="w-8 h-8 rounded-full bg-brand-purple flex items-center justify-center"
              >
                <span className="text-white text-sm font-bold">L</span>
              </motion.div>
              <span className="text-xl font-bold hidden sm:inline-block">
                Lookym
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-6 ml-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.text}
                </Link>
              ))}
              {userRole === "merchant" &&
                merchantLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.text}
                  </Link>
                ))}
            </nav>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <form
              onSubmit={handleSearch}
              className="hidden md:flex items-center relative max-w-sm"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </form>

            {isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </Button>

                {userRole === "merchant" && (
                  <Button
                    className="hidden md:flex gap-2"
                    onClick={() => navigate("/upload")}
                  >
                    <Upload className="h-4 w-4" />
                    <span>Upload</span>
                  </Button>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-8 w-8 ml-1"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={avatarUrl} alt={username} />
                        <AvatarFallback>
                          {username ? username[0].toUpperCase() : "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={avatarUrl} alt={username} />
                        <AvatarFallback>
                          {username ? username[0].toUpperCase() : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span>{username || "User"}</span>
                        <span className="text-xs text-muted-foreground">
                          {userRole === "merchant" ? "Merchant" : "User"}
                        </span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => navigate("/profile")}
                      className="cursor-pointer"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    {userRole === "merchant" && (
                      <DropdownMenuItem
                        onClick={() => navigate("/upload")}
                        className="cursor-pointer md:hidden"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Video
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="cursor-pointer text-destructive focus:text-destructive"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/auth/sign-in">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/auth/sign-up">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
