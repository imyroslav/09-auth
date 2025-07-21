"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { CreateUserData } from "../../../types/user"
import { register } from "../../../lib/api/clientApi"
import { useAuthStore } from "../../../lib/store/authStore"
import css from "./SignUpPage.module.css"
import { Formik } from "formik"


const initialValues: CreateUserData = {
  email: "",
  password: "",
}

export default function SignUpPage() {
  const router = useRouter()
  const setUser = useAuthStore((state) => state.setUser)
  const [error, setError] = useState("")

  const handleSubmit = async ( values: CreateUserData) => {
    try {
      const user = await register(values)
      setUser({ ...user, avatar: "" })
      router.push("/profile")
    } catch (e) {
      console.error("Registration failed", e)
      setError("Registration failed")
      
    }
  }

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ handleChange, handleSubmit, values }) => (
          <form className={css.form} onSubmit={handleSubmit}>
            <div className={css.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                className={css.input}
                value={values.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                className={css.input}
                value={values.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className={css.actions}>
              <button type="submit" className={css.submitButton}>
                Register
              </button>
            </div>
            {error && <p className={css.error}>{error}</p>}
          </form>
        )}
      </Formik>
    </main>
  )
}