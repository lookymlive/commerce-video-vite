
import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { VideoCard, VideoData } from "@/components/videos/VideoCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";

// Placeholder data
const mockVideos: VideoData[] = [
  {
    id: "1",
    title: "How to style the perfect summer outfit",
    thumbnailUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
    duration: 245,
    views: 12500,
    createdAt: "2025-03-04T00:30:00Z",
    merchant: {
      id: "m1",
      name: "Fashion Boutique",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },
    likes: 350,
    comments: 42,
  },
  {
    id: "2",
    title: "Premium kitchenware showcase - Cooking made easy",
    thumbnailUrl: "https://images.unsplash.com/photo-1556911220-bff31c812dba",
    duration: 187,
    views: 8300,
    createdAt: "2025-03-04T14:20:00Z",
    merchant: {
      id: "m2",
      name: "Kitchen Essentials",
      avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
    },
    likes: 210,
    comments: 28,
  },
  {
    id: "3",
    title: "New tech gadgets review - Must have in 2023",
    thumbnailUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    duration: 320,
    views: 25600,
    createdAt: "2025-03-04T09:15:00Z",
    merchant: {
      id: "m3",
      name: "Tech Reviewers",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    },
    likes: 520,
    comments: 75,
  },
  {
    id: "4",
    title: "Home decor inspiration for modern living",
    thumbnailUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f",
    duration: 275,
    views: 15200,
    createdAt: "2025-03-04T16:45:00Z",
    merchant: {
      id: "m4",
      name: "Design Hub",
      avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    },
    likes: 430,
    comments: 58,
  },
  {
    id: "5",
    title: "Sustainable beauty products review",
    thumbnailUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    duration: 198,
    views: 9800,
    createdAt: "2025-03-02T11:30:00Z",
    merchant: {
      id: "m5",
      name: "Eco Beauty",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    },
    likes: 290,
    comments: 36,
  },
  {
    id: "6",
    title: "Fitness equipment for home workouts",
    thumbnailUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
    duration: 230,
    views: 18700,
    createdAt: "2025-08-25T08:20:00Z",
    merchant: {
      id: "m6",
      name: "Fitness Pro",
      avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61",
    },
    likes: 480,
    comments: 62,
  },
];

const Index = () => {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<"merchant" | "user" | null>(null);

  useEffect(() => {
    // Simulating data loading
    const loadData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setVideos(mockVideos);
      } catch (error) {
        console.error("Error loading videos:", error);
        toast.error("Failed to load videos. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated={isAuthenticated} userRole={userRole} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-brand-dark py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-auth-gradient opacity-90"></div>
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1535016120720-40c646be5580')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
              >
                Discover, Watch, and Engage with Commerce Videos
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-white/90 mb-8 leading-relaxed"
              >
                The ultimate platform for merchants to showcase products and for
                users to discover the latest trends
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  size="lg"
                  className="bg-white text-brand-purple hover:bg-white/90 transition-colors"
                  onClick={() => window.location.href = "/auth/sign-up"}
                >
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 transition-colors"
                  onClick={() => window.location.href = "/discover"}
                >
                  Explore Videos
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Videos */}
        <section className="py-16 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Featured Videos</h2>
              <Button variant="ghost" className="text-primary">
                View All
              </Button>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="space-y-3">
                    <div className="rounded-xl bg-muted h-48 animate-pulse"></div>
                    <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-muted rounded w-1/2 animate-pulse"></div>
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-muted animate-pulse"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-muted rounded w-24 animate-pulse"></div>
                        <div className="h-3 bg-muted rounded w-16 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video, index) => (
                  <VideoCard key={video.id} video={video} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to share your products?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join as a merchant and start uploading your videos today
              </p>
              <Button size="lg" onClick={() => window.location.href = "/auth/sign-up"}>
                Start Sharing
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-brand-dark text-white">
        <div className="container px-4 md:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  <span className="text-brand-purple text-sm font-bold">L</span>
                </div>
                <span className="text-xl font-bold">Lookym</span>
              </div>
              <p className="text-white/70">
                The ultimate platform for commerce videos
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-white/70 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/discover" className="text-white/70 hover:text-white">
                    Discover
                  </a>
                </li>
                <li>
                  <a href="/trending" className="text-white/70 hover:text-white">
                    Trending
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/privacy" className="text-white/70 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-white/70 hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/70">
            <p>&copy; {new Date().getFullYear()} Lookym. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
