import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"

const formSchema = z.object({
    name: z.string().min(5, /*"Name should be at least 5 characters"*/),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password should be minimum 8 letters"),
    confirmPassword: z.string().min(8, "Password should be minimum 8 letters")

}).refine((data) => data.password === data.confirmPassword, {
    message: "Password do no match",
    fields: ["confirmPassword"]
})

const Register = () => {

    const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
  })

  return (
    <div>Register</div>
  )
}

export default Register