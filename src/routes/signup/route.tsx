import type { APIResponse } from '@/@types/ApiResponse';
import type { SignInRequest } from '@/@types/requests/SignInRequest';
import type { User } from '@/@types/User';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from '@/hooks/useForm';
import { useMutation } from '@/hooks/useMutation';
import { useUrlShortenerStore } from '@/store/store';
import { Label } from '@radix-ui/react-label';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { ArrowRight, Eye, EyeOff, Link2 } from 'lucide-react';
import { useState, type FormEvent } from 'react';

export const Index = () => {
  const navigate = useNavigate();
  const setUser = useUrlShortenerStore((state) => state.setUser);

  const { mutateFn, pending, error } = useMutation<SignInRequest, APIResponse<User>>({
    url: 'http://localhost:5000/auth/signup',
    method: 'POST'
  });

  const initialValues = {
    email: "",
    password: ""
  };

  const validate = (values: typeof initialValues) => {
    const errors: Partial<Record<keyof typeof initialValues, string>> = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid";
    }

    if (!values.password) errors.password = "Password is required";
    else if (values.password.length < 8) {
      errors.password = "Password must be atleast 8 characters";
    }

    return errors;
  }

  const { values, handleChange, handleBlur, errors, touched, handleSubmit } = useForm(
    initialValues,
    validate,
  );

  const [showPassword, setShowPassword] = useState(false)

  const login = async (data: typeof initialValues) => {
    const result = await mutateFn(data);
    if (result) {
      setUser(result.data);
      navigate({
        to: '/dashboard',
      })
    }
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(login);
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-150 h-75 bg-accent/15 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="p-2 rounded-xl bg-primary" aria-hidden="true">
            <Link2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">Snip</span>
        </Link>

        {/* Sign In Card */}
        <article className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8">
          <header className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Welcome</h1>
            <p className="text-muted-foreground">Create your account to continue</p>
          </header>

          <form onSubmit={onSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="h-12 bg-secondary border-border text-foreground placeholder:text-muted-foreground rounded-xl"
                required
              />
              {errors.email && touched.email && (
                <p className="text-red-500 mt-1">{errors.email}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </Label>
              </div>
              <div
                className="pr-2 flex items-center bg-secondary border-border focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-1 focus-within:ring-offset-background rounded-xl">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="h-12 border-0 bg-transparent ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && touched.password && (
                <p className="text-red-500 mt-1">{errors.password}</p>
              )}
            </div>
            {
              error && (
                <p className="text-red-500">{error}</p>
              )
            }
            <Link to="/forgot-password" className="text-sm underline text-slate-400">Forgot Password?</Link>
            <Button
              type="submit"
              className="h-12 mt-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
              disabled={pending}
            >
              {pending ? 'Signing in....' : 'Sign in'}
              <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-card text-muted-foreground">or continue with</span>
            </div>
          </div>
        </article>
      </div>
    </main>
  )
}


export const Route = createFileRoute('/signup')({
  component: Index,
})

