const ErrorMessage = ({ children, error }: { children?: React.ReactNode, error: Error  | null}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-4 py-12 px-4">
    <div className="text-center space-y-3">
      <div className="text-destructive text-lg font-semibold">
        Failed to load products
      </div>
      <p className="text-sm text-muted-foreground">
        {error?.message || "An unexpected error occurred"}
      </p>
    </div>
    {children}
  </div>
  )
}

export default ErrorMessage