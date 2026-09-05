import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as z from "zod"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import api from '@/api/axios'
import { toast } from 'sonner'
import useAuth from '@/hooks/useAuth'
import { jwtDecode } from 'jwt-decode'
import { Loader2, User } from 'lucide-react'

const profileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Invalid email address."),
})

const passwordSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

const Profile = () => {

    const { user, token, login } = useAuth();
    const [loading, setLoading] = React.useState(false);
    const [passwordLoading, setPasswordLoading] = React.useState(false);

    const decodedToken = token ? jwtDecode(token) : null;
    const userId = decodedToken?.userId;

    const profileForm = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
        }
    })

    const passwordForm = useForm({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        }
    })

    const onProfileSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await api.patch(`/users/${userId}`, { name: data.name, email: data.email });

            if (response.status === 200) {
                toast.success("Profile updated successfully");
                login(response.data.data, token);
            } else {
                toast.error(response.data.message || "Error updating profile");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Some error occurred");
        } finally {
            setLoading(false);
        }
    }

    const onPasswordSubmit = async (data) => {
        setPasswordLoading(true);
        try {
            const response = await api.patch(`/users/${userId}`, { password: data.password });

            if (response.status === 200) {
                toast.success("Password updated successfully");
                passwordForm.reset();
            } else {
                toast.error(response.data.message || "Error updating password");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Some error occurred");
        } finally {
            setPasswordLoading(false);
        }
    }

    return (
        <div className="mt-16 p-4 md:p-8 lg:p-12 space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
                <p className="text-gray-500 mt-1">Manage your account settings.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            Personal Information
                        </CardTitle>
                        <CardDescription>Update your name and email address.</CardDescription>
                    </CardHeader>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
                        <CardContent className="space-y-4">
                            <Controller
                                name="name"
                                control={profileForm.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                                        <Input
                                            {...field}
                                            id={field.name}
                                            type="text"
                                            placeholder="Your name"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="email"
                                control={profileForm.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                        <Input
                                            {...field}
                                            id={field.name}
                                            type="email"
                                            placeholder="your@email.com"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    "Save Changes"
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Change Password</CardTitle>
                        <CardDescription>Update your password to keep your account secure.</CardDescription>
                    </CardHeader>
                    <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
                        <CardContent className="space-y-4">
                            <Controller
                                name="password"
                                control={passwordForm.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
                                        <Input
                                            {...field}
                                            id={field.name}
                                            type="password"
                                            placeholder="••••••••"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="confirmPassword"
                                control={passwordForm.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                                        <Input
                                            {...field}
                                            id={field.name}
                                            type="password"
                                            placeholder="••••••••"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" variant="outline" disabled={passwordLoading}>
                                {passwordLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    "Update Password"
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    )
}

export default Profile
