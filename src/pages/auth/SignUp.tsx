
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SocialLoginButton } from "@/components/auth/SocialLoginButton";

const SignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    role: "user" as "merchant" | "user",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: "merchant" | "user") => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // This is a placeholder - will be replaced with actual Supabase auth
    try {
      // Authentication will be implemented after Supabase connection
      toast.success("Account created successfully! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Sign up error:", error);
      toast.error("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    try {
      // Social login will be implemented after Supabase connection
      toast.info(`${provider} signup will be implemented with Supabase`);
    } catch (error) {
      console.error(`${provider} signup error:`, error);
      toast.error(`Failed to sign up with ${provider}.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col space-y-6 w-full max-w-md fade-in">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold">Sign Up For Free</h1>
          <p className="text-muted-foreground mt-2">
            Let's sign up quickly to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="username"
                name="username"
                placeholder="username"
                value={formData.username}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="pl-10"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden mt-2">
              <div
                className={`h-full ${
                  formData.password.length === 0
                    ? "w-0"
                    : formData.password.length < 6
                    ? "w-1/4 bg-red-500"
                    : formData.password.length < 8
                    ? "w-2/4 bg-yellow-500"
                    : formData.password.length < 10
                    ? "w-3/4 bg-blue-500"
                    : "w-full bg-green-500"
                } transition-all duration-300`}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground">
              Password strength: {formData.password.length === 0
                ? "None"
                : formData.password.length < 6
                ? "Weak"
                : formData.password.length < 8
                ? "Fair"
                : formData.password.length < 10
                ? "Good"
                : "Strong"}
            </p>
          </div>

          <div className="space-y-2">
            <Label>Account Type</Label>
            <RadioGroup 
              value={formData.role} 
              onValueChange={(value) => handleRoleChange(value as "merchant" | "user")}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:border-primary transition-colors">
                <RadioGroupItem value="user" id="user" />
                <Label htmlFor="user" className="cursor-pointer">Regular User (watch & comment)</Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:border-primary transition-colors">
                <RadioGroupItem value="merchant" id="merchant" />
                <Label htmlFor="merchant" className="cursor-pointer">Merchant (upload videos)</Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating account...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />
                Sign Up
              </span>
            )}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <SocialLoginButton 
            provider="Google" 
            onClick={() => handleSocialLogin("Google")} 
            disabled={isLoading}
          />
        </div>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link
            to="/auth/sign-in"
            className="text-primary hover:underline font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
