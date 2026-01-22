import SignupForm from '../auth/SignupForm'

const SignupPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="text-muted-foreground">
            Sign up to get started with your account
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  )
}

export default SignupPage