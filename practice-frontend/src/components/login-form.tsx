import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useEffect, useState } from "react"
import { useGoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { Github } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { googleAuth } from "@/http"
import { useCookies } from 'react-cookie';

interface LoginFormProps extends React.ComponentPropsWithoutRef<"div"> {
  handleSubmit: (formData: { email: string; password: string }) => void;
}

export function LoginForm({
  className,
  handleSubmit,
  ...props
}: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [githubUser, setGithubUser] = useState(null)
  const googleMutation = useMutation({
    mutationFn: googleAuth,
    onSuccess: (data) => {
      console.log(data)
      window.location.reload()
    },
    onError: (err) => {
      console.log(err)
    }

  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
  }

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(formData)
  }


  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
     googleMutation.mutate(response.access_token)
    },
    onError: (error) => {
      console.error(error)
    },
  })


  const handleGithubLogin = () => {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}&redirect_uri=${window.location.origin}&scope=user`
    window.location.href = githubAuthUrl
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get("code")
    const fetchUser = async (token: string) => {
      console.log('receivedToken', token)
      const {data} = await axios.get(`https://api.github.com/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return data
    }  
  
    const fetchAccessToken = async () => {
      try {
        const {data} = await axios.get(`http://localhost:3011/auth/github?code=${code}`)
        console.log('HII ',data)
        const newUrl = window.location.origin + window.location.pathname
        window.history.replaceState({}, document.title, newUrl)
        // Getting user data
        const token = data.data.access_token
        console.log('data: ', data)
        console.log('token: ', token)

        const userData = await fetchUser(token)
        console.log(userData)

      } catch (error) {
        console.error("GitHub Auth Error:", error)
      }
    }
  
    if (code) {
      fetchAccessToken()
    }
  }, [])

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your GitHub or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full" type="button" onClick={handleGithubLogin}>
                  <Github className="size-4" />
                  Login with GitHub
                </Button>
                <Button variant="outline" type={"button"} className="w-full" onClick={handleGoogleLogin} >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button>
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" type="password" required value={formData.password} onChange={handleChange}/>
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
