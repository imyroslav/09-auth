"use client"
import { useRouter } from "next/navigation"
import { useState  } from "react"
import { login } from "../../../lib/api/clientApii"
import { useAuthStore } from "../../../lib/store/authStore"
import { CreateUserData } from "../../../types/user"
import css from "./SignInPage.module.css"

export default function SignIn() {
    const setUser = useAuthStore((state)=> state.setUser)
    const router = useRouter()
    const [error, setError] = useState("");
    console.log(error);
    

    const handleSubmit = async (formData: FormData) => {
const userData: CreateUserData = {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        };
       
        try {
            const user = await login(userData);
            if (user) {
              setUser(user);
            router.replace("/profile")
            } else {
           setError("Sign-in data is uncorrect")
        }
        } catch(error) {
          console.error(error);
          setError("try again")
        }
    };

    return <main className={css.mainContent}>
 <form className={css.form} action={handleSubmit}>
    <h1 className={css.formTitle}>Sign in</h1>

    <div className={css.formGroup}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" className={css.input} required />
    </div>

    <div className={css.formGroup}>
      <label htmlFor="password">Password</label>
      <input id="password" type="password" name="password" className={css.input} required />
    </div>

    <div className={css.actions}>
      <button type="submit" className={css.submitButton}>
        Log in
      </button>
    </div>

  </form>
</main>
}