import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import * as z from "zod"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Plus, Trash2 } from 'lucide-react'
import { Field, FieldError, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import api from '@/api/axios'
import { toast } from 'sonner'

const formSchema = z.object({
    collaboratorEmails: z.array(
        z.string().email("Invalid email address").min(5, "Must be atleast 5 characters."),
    ).min(1, "Atleast one email is required.")
})



const InviteForm = ({tripId}) => {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            collaboratorEmails: [""]
        }
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "collaboratorEmails"
    })

    const onSubmit = async (data) => {
        try{
            const response = await api.post(`/trips/${tripId}/invite`, data);

            if(response.status === 200){
                toast.success("Invitation sent successfully");
                form.reset();
            }else{
                toast.error( response.data.message || "Error sending invitation");
            }
        }catch(error){
            toast.error( error.response?.data?.message || "Some error occured");
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card>
                <CardHeader>
                    <CardTitle>Invite Collaborators</CardTitle>
                    <CardDescription>Enter emails of people you want to invite.</CardDescription>
                    <CardAction>
                        <Button type="button" onClick={() => append(" ")} variant='outline' size='icon'>
                            <Plus />
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent className="space-y-3">
                    {
                        fields.map((item, index) => {
                            return (
                                <div key={index} className="flex items-start gap-2">
                                    <div className="flex-1">
                                        <Controller
                                            name={`collaboratorEmails[${index}]`}
                                            control={form.control}
                                            render={({ field, fieldState }) => (
                                                <Field data-invalid={fieldState.invalid}>
                                                    <FieldLabel htmlFor={field.name}>Collaborator Email {index + 1}</FieldLabel>
                                                    <Input
                                                        {...field}
                                                        id={field.name}
                                                        type="email"
                                                        placeholder="abc@example.com"
                                                        aria-invalid={fieldState.invalid}
                                                    />
                                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                                </Field>
                                            )}
                                        />
                                    </div>
                                    {fields.length > 1 && (
                                        <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)} className="mt-8 text-red-500 hover:text-red-600">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            )
                        })
                }
                </CardContent>
                <CardFooter>
                    <Button className={"w-full bg-amber-500 hover:bg-amber-600 text-white cursor-pointer"} type='submit'>Send Invites</Button>
                </CardFooter>
            </Card>
        </form>
    )
}

export default InviteForm