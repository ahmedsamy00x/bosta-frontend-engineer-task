import CreateProductForm from "../products/CreateProductForm"

const CreateProductPage = () => {
  return (
    <div className="space-y-4">
        <div>

            <h1 className="text-2xl font-bold">Create Product</h1>
            <p className="text-sm text-muted-foreground">
                Create a new product to add to your store.
            </p>
        </div>
        <CreateProductForm />
    </div>
  )
}

export default CreateProductPage