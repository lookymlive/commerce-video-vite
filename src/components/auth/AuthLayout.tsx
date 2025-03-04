
import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Gradient background with logo and tagline */}
      <div className="bg-auth-gradient w-full lg:w-1/2 p-6 flex flex-col">
        <div className="flex-1 flex flex-col">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
                <span className="text-brand-purple text-xl font-bold">L</span>
              </div>
              <span className="text-white text-xl font-bold">Lookym</span>
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-auto mb-12 lg:flex flex-col max-w-md"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Welcome to the era of video commerce
            </h1>
            <p className="text-white/80 text-lg max-w-sm">
              Connect, showcase, and engage with your audience through immersive video experiences
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right side - Authentication form */}
      <div className="w-full lg:w-1/2 p-6 md:p-12 bg-background flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};
