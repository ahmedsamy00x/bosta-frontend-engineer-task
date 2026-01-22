import { PackageOpen } from 'lucide-react'

const Empty = ({message, description, children}: {message?: string, description?: string, children?: React.ReactNode}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 gap-y-3">
        <div className="text-center space-y-3">
            <div className="text-center space-y-3 flex flex-col items-center justify-center">

                <PackageOpen className="size-16 text-muted-foreground/50 mb-4" />
                <div className="flex flex-col items-center justify-center">

                    <h3 className="text-lg font-semibold text-foreground">
                        {message || "No products found"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {description || "Check back later for new items"}
                    </p>
                </div>
            </div>
        </div>
    {children}
  </div>
  )
}

export default Empty