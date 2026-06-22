import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as z from "zod"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

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

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>

      <Card className="w-1/3 mx-auto mt-32">
        <CardHeader>
            <CardTitle>Register to WanderWise</CardTitle>
            <CardDescription>Fill your details to create an Account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
           <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                <Input
                    {...field}
                    id={field.name}
                    type="text"
                    placeholder="John Doe"
                    aria-invalid={fieldState.invalid}
                    />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field> )}/>

                <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                    {...field}
                    id={field.name}
                    type="email"
                    placeholder="youremail@email.com"
                    aria-invalid={fieldState.invalid}
                    />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field> )}/>

                <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                    {...field}
                    id={field.name}
                    type="password"
                    placeholder="****"
                    aria-invalid={fieldState.invalid}
                    />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field> )}/>

                <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                <Input
                    {...field}
                    id={field.name}
                    type="password"
                    placeholder="****"
                    aria-invalid={fieldState.invalid}
                    />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field> )}/>
        </CardContent>
        <CardFooter>
           <p>Card Footer</p>
        </CardFooter>
      </Card>
    </form>
  )
}

export default Register