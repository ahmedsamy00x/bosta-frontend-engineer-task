import * as Yup from "yup"
import { useFormik } from "formik"
import { Input } from "../ui/input"
import { Field, FieldLabel, FieldError } from "../ui/field"
import { Button } from "../ui/button"
import { useLoginMutation } from "@/services/api/auth/login"
import { Link } from "react-router"

const LoginForm = () => {
  const { mutate, isPending } = useLoginMutation()

  const initialValues = {
    username: "",
    password: "",
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      mutate(values)
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <Field>
        <FieldLabel htmlFor="username">Username</FieldLabel>
        <Input
          type="text"
          id="username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.username && formik.errors.username ? "border-destructive" : ""}
        />
        {formik.touched.username && formik.errors.username && (
          <FieldError>{formik.errors.username}</FieldError>
        )}
      </Field>

      <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <Input
          type="password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.password && formik.errors.password ? "border-destructive" : ""}
        />
        {formik.touched.password && formik.errors.password && (
          <FieldError>{formik.errors.password}</FieldError>
        )}
      </Field>
        <div>

            <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Signing in..." : "Sign In"}
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
                Don't have an account? <Link to="/signup" className="text-primary/70 hover:text-primary underline">Sign up</Link>
            </p>
        </div>
    </form>
  )
}

export default LoginForm