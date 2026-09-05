import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import useApi from '@/hooks/useApi';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import React from 'react'
import { useParams } from 'react-router-dom'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import * as z from "zod"
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import api from '@/api/axios';
import { toast } from 'sonner';


const formSchema = z.object({
    name: z.string().min(3, "Name of item must be atleast 3 characters")
})

const BaggageDetails = () => {

    const [dependency, setDependency] = React.useState(0);

    const { tripId } = useParams();

    const { data, loading, error } = useApi(`/${tripId}/baggages`, {}, [dependency]);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    })

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full py-24">
                <Loader2 className="animate-spin h-10 w-10 text-primary" />
            </div>
        )
    }

    const onSubmit = async (formData) => {
        try {
            const response = await api.post(`/${tripId}/baggages`, formData);

            if (response.status === 201) {
                toast.success("Baggage created successfully");
                form.reset();
                setDependency(dependency+1);
            } else {
                toast.error(response.data.message || "Error creating baggage");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Some error occured");
        }
    }

    const onDelete = async (id) => {
        try {
            const response = await api.delete(`/${tripId}/baggages/${id}`);

            if (response.status === 200) {
                toast.success("Baggage deleted successfully");
                setDependency(dependency+1);
            } else {
                toast.error(response.data.message || "Error deleting baggage");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Some error occured");
        }
    }

    const onCheck = async (id, status, name) => {
        try {
            const response = await api.patch(`/${tripId}/baggages/${id}`, {completed: !status, name: name});

            if (response.status === 200) {
                if(response.data.data.completed){
                    toast.success("Baggage packed successfully");
                }else{
                    toast.success("Baggage unpacked successfully!");
                }
                setDependency(dependency+1);
            } else {
                toast.error(response.data.message || "Error updating baggage");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Some error occured");
        }
    }

    return (
        <div className="mt-16 p-4 md:p-8 lg:p-12 space-y-6">
                <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Baggage List</h1>
                    <p className="text-gray-500 mt-1">All the items you need for this trip.</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Baggage
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Baggage</DialogTitle>
                            <DialogDescription>
                                Enter the name of item you want to take to trip.
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Enter item name</FieldLabel>
                                        <Input
                                            {...field}
                                            id={field.name}
                                            type="text"
                                            placeholder="Medicines"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <Button type="submit" className={"mt-4 w-full bg-amber-500 hover:bg-amber-600 text-white"}>Submit</Button>
                        </form>

                    </DialogContent>
                </Dialog>
                </div>
            </div>

            <Card>
                <CardContent className="pt-6">
                    {!data || data.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            No baggages for this trip. Add baggage with the button above.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {data.map((item) => (
                                <div
                                    key={item._id}
                                    className={`${item.completed ? "bg-amber-100 border-amber-200" : ""} flex items-center justify-between border border-gray-200 p-4 rounded-md transition-colors`}
                                >
                                    <div className='flex gap-3 items-center'>
                                        <Checkbox
                                            onClick={() => { onCheck(item._id, item.completed, item.name) }}
                                            checked={item.completed}
                                        />
                                        <p className={item.completed ? "line-through text-gray-500" : ""}>{item.name}</p>
                                    </div>
                                    <Button
                                        size='icon'
                                        variant='ghost'
                                        className="text-gray-400 hover:text-orange-500"
                                        onClick={() => { onDelete(item._id) }}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default BaggageDetails
