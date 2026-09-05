import api from '@/api/axios';
import InviteForm from '@/components/shared/InviteForm';
import TripInfo from '@/components/shared/TripInfo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import useApi from '@/hooks/useApi';
import { ArrowLeft, Loader2 } from 'lucide-react';
import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const expenseSchema = z.object({
    name: z.string().min(1, "Name is required"),
    amount: z.coerce.number().min(1, "Amount must be at least 1"),
});

const TripDetails = () => {

    const [image, setImage] = React.useState(null);
    const [dependency, setDependency] = React.useState(0);
    const { tripId } = useParams();

    const { error, loading, data } = useApi(`/trips/${tripId}`, {}, [dependency]);

    const form = useForm({
        resolver: zodResolver(expenseSchema),
        defaultValues: {
            name: "",
            amount: "",
        }
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full py-24">
                <Loader2 className="animate-spin h-10 w-10 text-primary" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-full py-24">
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Error loading trip</h3>
                    <p className="text-gray-500 mb-4">{error.message}</p>
                    <Link to="/trips">
                        <Button variant="outline">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Trips
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    const expenseSubmit = async (formData) => {
        const expenseData = {
            name: formData.name,
            amount: Number(formData.amount),
            date: new Date().toISOString()
        }

        try {
            const response = await api.patch(`/trips/${tripId}/expenses`, expenseData);

            if (response.status === 200) {
                toast.success("Expense added successfully");
                form.reset();
                setDependency(dependency + 1);
            } else {
                toast.error(response.data.message || "Failed to add expense");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add expense");
        }
    }

    const handleUpload = async (e) => {
        const file = e.target.files[0];

        if (!file) {
            toast.error("No file selected.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "trip_preset");
        formData.append("cloud_name", "dblq0e8kj");

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/dblq0e8kj/image/upload", {
                method: "POST",
                body: formData
            })

            const uploadedImage = await response.json();

            if (uploadedImage.url) {
                setImage(uploadedImage.url);
                toast.success("Image ready to upload");
            } else {
                toast.error("Upload failed");
            }
        } catch {
            toast.error("Failed to upload image");
        }
    }

    const onImageSubmit = async () => {
        if (!image) {
            toast.error("No image selected.");
            return;
        }

        const files = [...data.files, image];

        try {
            const response = await api.patch(`/trips/${tripId}/`, { files });

            if (response.status === 200) {
                toast.success("Image uploaded successfully");
                setImage(null);
                setDependency(dependency + 1);
            } else {
                toast.error(response.data.message || "Failed to upload image");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to upload image");
        }
    }

    return (
        <div className="mt-16 p-4 md:p-8 lg:p-12 space-y-6">
            <div className="flex items-center gap-4">
                <Link to="/trips">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{data.title}</h1>
                    <p className="text-gray-500">Trip Details</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <TripInfo trip={data} />
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Add Expense</CardTitle>
                            <CardDescription>Record a new expense for this trip</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={form.handleSubmit(expenseSubmit)} className="space-y-4">
                                <Controller
                                    name="name"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                                            <Input
                                                {...field}
                                                id={field.name}
                                                type="text"
                                                placeholder="Bus Ticket"
                                                aria-invalid={fieldState.invalid}
                                            />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name="amount"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor={field.name}>Amount</FieldLabel>
                                            <Input
                                                {...field}
                                                id={field.name}
                                                type="number"
                                                placeholder="100"
                                                aria-invalid={fieldState.invalid}
                                            />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                                <Button type="submit" className="w-full">Add Expense</Button>
                            </form>
                        </CardContent>
                    </Card>

                    <InviteForm tripId={tripId} />

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Upload Photo</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Input type="file" accept="image/*" onChange={handleUpload} />
                            {image && (
                                <div className="relative">
                                    <img src={image} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-2 right-2 h-6 w-6"
                                        onClick={() => setImage(null)}
                                    >
                                        ×
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" onClick={onImageSubmit} disabled={!image}>
                                Upload Image
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default TripDetails