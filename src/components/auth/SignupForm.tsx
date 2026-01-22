import * as Yup from "yup"
import { useFormik } from "formik"
import { Input } from "../ui/input"
import { Field, FieldLabel, FieldError } from "../ui/field"
import { Button } from "../ui/button"
import { useSignupMutation } from "@/services/api/auth/signup"
import { Link } from "react-router"

const SignupForm = () => {
  const { mutate, isPending } = useSignupMutation()

  const initialValues = {
    email: "",
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    confirmPassword: "",
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email"),
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"),
    firstname: Yup.string()
      .required("First name is required"),
    lastname: Yup.string()
      .required("Last name is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      mutate({
        email: values.email,
        username: values.username,
        password: values.password,
        name: {
          firstname: values.firstname,
          lastname: values.lastname
        }
      })
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.email && formik.errors.email ? "border-destructive" : ""}
        />
        {formik.touched.email && formik.errors.email && (
          <FieldError>{formik.errors.email}</FieldError>
        )}
      </Field>

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

      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="firstname">First Name</FieldLabel>
          <Input
            type="text"
            id="firstname"
            name="firstname"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={formik.touched.firstname && formik.errors.firstname ? "border-destructive" : ""}
          />
          {formik.touched.firstname && formik.errors.firstname && (
            <FieldError>{formik.errors.firstname}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="lastname">Last Name</FieldLabel>
          <Input
            type="text"
            id="lastname"
            name="lastname"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={formik.touched.lastname && formik.errors.lastname ? "border-destructive" : ""}
          />
          {formik.touched.lastname && formik.errors.lastname && (
            <FieldError>{formik.errors.lastname}</FieldError>
          )}
        </Field>
      </div>

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

      <Field>
        <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
        <Input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.confirmPassword && formik.errors.confirmPassword ? "border-destructive" : ""}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <FieldError>{formik.errors.confirmPassword}</FieldError>
        )}
      </Field>

      <div>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Creating account..." : "Create Account"}
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          Already have an account? <Link to="/login" className="text-primary/70 hover:text-primary underline">Sign in</Link>
        </p>
      </div>
    </form>
  )
}

export default SignupForm