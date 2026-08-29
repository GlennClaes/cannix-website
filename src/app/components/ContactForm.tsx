"use client";

import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {CheckCircle2, AlertCircle} from "lucide-react";
import {contactSchema, type ContactFormData} from "@/lib/validations";
import {Input, Textarea, Button} from "@/app/components/ui";
import {Modal} from "@/app/components/ui/Modal";
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
    const [errorMessage, setErrorMessage] = useState("");

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
        setErrorMessage("");
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data),
            });

            const result = (await response.json().catch(() => ({}))) as { error?: string };
            if (!response.ok) {
                throw new Error(result.error || "Versturen lukte niet.");
            }

            setStatus("success");
            reset();
        } catch (error) {
            setStatus("error");
            setErrorMessage(error instanceof Error ? error.message : "Versturen lukte niet.");
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
                    required
                    error={errors.name?.message}
                    {...register("name")}
                />
                <Input
                    label="E-mail"
                    type="email"
                    placeholder="naam@example.com"
                    autoComplete="email"
                    required
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
                    required
                    error={errors.phone?.message}
                    {...register("phone")}
                />
                <div>
                    <label htmlFor="eventType" className="label">Type evenement</label>
                    <select
                        id="eventType"
                        required
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
                    required
                    error={errors.location?.message}
                    {...register("location")}
                />
            </div>

            <Textarea
                label="Bericht"
                placeholder="Vertel kort over je event, timing, verwacht aantal bezoekers en wat je zoekt."
                rows={6}
                required
                error={errors.message?.message}
                {...register("message")}
            />

            {status === "error" && (
                <div
                    className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300"
                    role="alert">
                    <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5"/>
                    <div>
                        <p className="font-semibold">Versturen lukte niet.</p>
                        <p className="text-sm text-red-300/80">{errorMessage || "Probeer opnieuw of mail direct naar bookings@cannix.be."}</p>
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

            <Modal
                isOpen={status === "success"}
                onClose={() => setStatus("idle")}
                title="Aanvraag verstuurd"
                size="sm"
            >
                <div className="flex items-start gap-3 text-green-300" role="status">
                    <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0"/>
                    <div>
                        <p className="font-semibold">Bedankt voor je aanvraag.</p>
                        <p className="mt-1 text-sm text-green-300/80">
                            We nemen zo snel mogelijk contact met je op.
                        </p>
                    </div>
                </div>
                <Button
                    type="button"
                    fullWidth={true}
                    className="mt-6"
                    onClick={() => setStatus("idle")}
                >
                    Sluiten
                </Button>
            </Modal>
        </form>
    );
}