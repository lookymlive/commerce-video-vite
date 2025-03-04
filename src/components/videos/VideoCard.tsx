
import { Link } from "react-router-dom";
import { Play, Clock, Heart, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

export interface VideoData {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: number;
  views: number;
  createdAt: string;
  merchant: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  likes: number;
  comments: number;
}

interface VideoCardProps {
  video: VideoData;
  index?: number;
}

export const VideoCard = ({ video, index = 0 }: VideoCardProps) => {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M views`;
    }
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K views`;
    }
    return `${views} views`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link to={`/videos/${video.id}`} className="block">
        <div className="relative rounded-xl overflow-hidden aspect-video mb-3">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Play className="h-6 w-6 text-white fill-white" />
            </div>
          </div>
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
            {formatDuration(video.duration)}
          </div>
        </div>

        <h3 className="font-semibold text-base line-clamp-2 group-hover:text-primary transition-colors">
          {video.title}
        </h3>

        <div className="flex items-center mt-2">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={video.merchant.avatarUrl} />
            <AvatarFallback>
              {video.merchant.name[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{video.merchant.name}</span>
            <div className="flex items-center text-xs text-muted-foreground">
              <span>{formatViews(video.views)}</span>
              <span className="mx-1">•</span>
              <span>{formatDate(video.createdAt)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
          <div className="flex items-center">
            <Heart className="h-3.5 w-3.5 mr-1" />
            <span>{video.likes}</span>
          </div>
          <div className="flex items-center">
            <MessageCircle className="h-3.5 w-3.5 mr-1" />
            <span>{video.comments}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
