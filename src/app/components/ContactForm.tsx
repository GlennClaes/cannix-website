"use client";

import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {CheckCircle2, AlertCircle} from "lucide-react";
import {contactSchema, type ContactFormData} from "@/lib/validations";
import {Input, Textarea, Button} from "@/app/components/ui";
import {cn} from "@/lib/utils";

const eventTypes = [
    "Clubavond",
    "Festival",
    "Fuif",
    "Rave",
    "Private party",
    "Bruiloft",
    "Anders",
]


export function ContactForm() {
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            eventType: "",
            website: "",
        },
    });

    const onSubmit = async (data: ContactFormData) => {
        setStatus("idle");
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Form submit failed");

            setStatus("success");
            reset();
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
                <Input
                    label="Naam"
                    placeholder="Je naam"
                    autoComplete="name"
                    error={errors.name?.message}
                    {...register("name")}
                />
                <Input
                    label="E-mail"
                    type="email"
                    placeholder="naam@example.com"
                    autoComplete="email"
                    error={errors.email?.message}
                    {...register("email")}
                />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
                <Input
                    label="Telefoon"
                    type="tel"
                    placeholder="+32 ..."
                    autoComplete="tel"
                    hint="Optioneel"
                    error={errors.phone?.message}
                    {...register("phone")}
                />
                <div>
                    <label htmlFor="eventType" className="label">Type evenement</label>
                    <select
                        id="eventType"
                        className={cn("input", errors.eventType && "border-red-500 focus:border-red-500 focus:ring-red-500/20")}
                        aria-invalid={errors.eventType ? "true" : "false"}
                        {...register("eventType")}
                    >
                        <option value="">Kies een type</option>
                        {eventTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    {errors.eventType &&
                        <p className="mt-1.5 text-sm text-red-400" role="alert">{errors.eventType.message}</p>}
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
                <Input
                    label="Datum"
                    type="date"
                    hint="Optioneel"
                    error={errors.eventDate?.message}
                    {...register("eventDate")}
                />
                <Input
                    label="Locatie"
                    placeholder="Stad / venue"
                    error={errors.location?.message}
                    {...register("location")}
                />
            </div>

            <Textarea
                label="Bericht"
                placeholder="Vertel kort over je event, timing, verwacht aantal bezoekers en wat je zoekt."
                rows={6}
                error={errors.message?.message}
                {...register("message")}
            />

            {status === "success" && (
                <div
                    className="flex items-start gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-300"
                    role="status">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5"/>
                    <div>
                        <p className="font-semibold">Aanvraag verstuurd.</p>
                        <p className="text-sm text-green-300/80">We nemen zo snel mogelijk contact met je op.</p>
                    </div>
                </div>
            )}

            {status === "error" && (
                <div
                    className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300"
                    role="alert">
                    <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5"/>
                    <div>
                        <p className="font-semibold">Versturen lukte niet.</p>
                        <p className="text-sm text-red-300/80">Probeer opnieuw of mail direct naar
                            bookings@cannix.be.</p>
                    </div>
                </div>
            )}

            <Button
                type="submit"
                glow={true}
                fullWidth={true}
                loading={isSubmitting}
                className="text-base font-bold uppercase tracking-wider py-4"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Versturen..." : "Verstuur aanvraag"}
            </Button>
        </form>
    );
}