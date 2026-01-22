import * as Yup from "yup"
import { useFormik } from "formik"
import { Input } from "../ui/input"
import { Field, FieldLabel, FieldError } from "../ui/field"
import { Button } from "../ui/button"
import { useCreateProductMutation } from "@/services/api/products/create-product"

const CreateProductForm = () => {
    const { mutate, isPending } = useCreateProductMutation()
    const initialValues = {
        title: "",
        price: 0,
        description: "",
        category: "",
        image: "",
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        price: Yup.number().required("Price is required").positive("Price must be greater than 0"),
        description: Yup.string().required("Description is required"),
        category: Yup.string().required("Category is required"),
        image: Yup.string().required("Image is required").url("Image must be a valid URL"),
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            try {
                mutate({
                    ...values,
                })
                formik.resetForm()
            } catch (error) {
                console.error(error)
            }
        },
    })
  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
        <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input 
                type="text" 
                id="title" 
                name="title" 
                value={formik.values.title} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.touched.title && formik.errors.title ? "border-destructive" : ""}
            />
            {formik.touched.title && formik.errors.title && (
                <FieldError>{formik.errors.title}</FieldError>
            )}
        </Field>
        <Field>
            <FieldLabel htmlFor="price">Price</FieldLabel>
            <Input 
                type="number" 
                id="price" 
                name="price" 
                value={formik.values.price} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.touched.price && formik.errors.price ? "border-destructive" : ""}
            />
            {formik.touched.price && formik.errors.price && (
                <FieldError>{formik.errors.price}</FieldError>
            )}
        </Field>
        <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Input 
                type="text" 
                id="description" 
                name="description" 
                value={formik.values.description} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.touched.description && formik.errors.description ? "border-destructive" : ""}
            />
            {formik.touched.description && formik.errors.description && (
                <FieldError>{formik.errors.description}</FieldError>
            )}
        </Field>
        <Field>
            <FieldLabel htmlFor="category">Category</FieldLabel>
            <Input 
                type="text" 
                id="category" 
                name="category" 
                value={formik.values.category} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.touched.category && formik.errors.category ? "border-destructive" : ""}
            />
            {formik.touched.category && formik.errors.category && (
                <FieldError>{formik.errors.category}</FieldError>
            )}
        </Field>
        <Field>
            <FieldLabel htmlFor="image">Image</FieldLabel>
            <Input 
                type="text" 
                id="image" 
                name="image" 
                value={formik.values.image} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.touched.image && formik.errors.image ? "border-destructive" : ""}
            />
            {formik.touched.image && formik.errors.image && (
                <FieldError>{formik.errors.image}</FieldError>
            )}
        </Field>
        <Button type="submit" disabled={isPending}>{isPending ? "Creating..." : "Create Product"}</Button>
    </form>
    
  )
}

export default CreateProductForm