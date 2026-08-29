"use client";

import {useMemo, useState} from "react";
import {useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {CheckCircle2, AlertCircle} from "lucide-react";
import {createContactSchema, type ContactFormData} from "@/lib/validations";
import {Input, Textarea, Button} from "@/app/components/ui";
import {Modal} from "@/app/components/ui/Modal";
import {cn} from "@/lib/utils";
import {useLanguage} from "@/lib/i18n";

export function ContactForm() {
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const { t } = useLanguage();
    const contactSchema = useMemo(() => createContactSchema({
        name: t("validation.name"), nameLong: t("validation.nameLong"), email: t("validation.email"),
        phone: t("validation.phone"), phoneLong: t("validation.phoneLong"), reason: t("validation.reason"),
        eventType: t("validation.eventType"), questionType: t("validation.questionType"),
        collaborationType: t("validation.collaborationType"), mediaType: t("validation.mediaType"),
        location: t("validation.location"), locationLong: t("validation.locationLong"),
        message: t("validation.message"), messageLong: t("validation.messageLong"),
    }), [t]);

    const {
        register,
        control,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            contactReason: "",
            eventType: "",
            questionType: "",
            collaborationType: "",
            mediaType: "",
            website: "",
        },
    });
    const contactReason = useWatch({control, name: "contactReason"});

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
                <label htmlFor="website">{t("form.website")}</label>
                <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
                <Input
                    label={t("form.name")}
                    placeholder={t("form.namePlaceholder")}
                    autoComplete="name"
                    required
                    error={errors.name?.message}
                    {...register("name")}
                />
                <Input
                    label={t("form.email")}
                    type="email"
                    placeholder="naam@example.com"
                    autoComplete="email"
                    required
                    error={errors.email?.message}
                    {...register("email")}
                />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="contactReason" className="label">{t("form.reason")}</label>
                    <select
                        id="contactReason"
                        required
                        className={cn("input", errors.contactReason && "border-red-500 focus:border-red-500 focus:ring-red-500/20")}
                        aria-invalid={errors.contactReason ? "true" : "false"}
                        {...register("contactReason")}
                    >
                        <option value="">{t("form.choose")}</option>
                        {["booking", "question", "collaboration", "media"].map((reason) => (
                            <option key={reason} value={reason}>{t(`form.reason.${reason}`)}</option>
                        ))}
                    </select>
                    {errors.contactReason &&
                        <p className="mt-1.5 text-sm text-red-400" role="alert">{errors.contactReason.message}</p>}
                </div>
                <Input
                    label={t("form.phone")}
                    type="tel"
                    placeholder="+32 ..."
                    autoComplete="tel"
                    required
                    error={errors.phone?.message}
                    {...register("phone")}
                />
            </div>

            {contactReason === "booking" && (
                <div>
                    <label htmlFor="eventType" className="label">{t("form.eventType")}</label>
                    <select
                        id="eventType"
                        required
                        className={cn("input", errors.eventType && "border-red-500 focus:border-red-500 focus:ring-red-500/20")}
                        aria-invalid={errors.eventType ? "true" : "false"}
                        {...register("eventType")}
                    >
                        <option value="">{t("form.eventChoose")}</option>
                        {["club", "festival", "party", "rave", "private", "wedding", "other"].map((type) => <option key={type} value={type}>{t(`form.event.${type}`)}</option>)}
                    </select>
                    {errors.eventType && <p className="mt-1.5 text-sm text-red-400" role="alert">{errors.eventType.message}</p>}
                </div>
            )}

            {contactReason === "question" && (
                <ConditionalSelect id="questionType" label={t("form.questionSubject")} options={["general", "music", "availability", "technical", "other"].map((key) => ({ value: key, label: t(`form.question.${key}`) }))} register={register} error={errors.questionType?.message} chooseLabel={t("form.choose")} />
            )}
            {contactReason === "collaboration" && (
                <ConditionalSelect id="collaborationType" label={t("form.collaborationType")} options={["artist", "brand", "music", "other"].map((key) => ({ value: key, label: t(`form.collab.${key}`) }))} register={register} error={errors.collaborationType?.message} chooseLabel={t("form.choose")} />
            )}
            {contactReason === "media" && (
                <ConditionalSelect id="mediaType" label={t("form.mediaType")} options={["interview", "press", "photo", "other"].map((key) => ({ value: key, label: t(`form.media.${key}`) }))} register={register} error={errors.mediaType?.message} chooseLabel={t("form.choose")} />
            )}

            <div className="grid sm:grid-cols-2 gap-6">
                <Input
                    label={t("form.date")}
                    type="date"
                    hint={t("form.optional")}
                    error={errors.eventDate?.message}
                    {...register("eventDate")}
                />
                <Input
                    label={t("form.location")}
                    placeholder={t("form.locationPlaceholder")}
                    required
                    error={errors.location?.message}
                    {...register("location")}
                />
            </div>

            <Textarea
                label={t("form.message")}
                placeholder={t("form.messagePlaceholder")}
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
                        <p className="font-semibold">{t("form.error")}</p>
                        <p className="text-sm text-red-300/80">{errorMessage || t("form.retry")}</p>
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
                {isSubmitting ? t("form.sending") : t("form.send")}
            </Button>

            <Modal
                isOpen={status === "success"}
                onClose={() => setStatus("idle")}
                title={t("form.successTitle")}
                size="sm"
            >
                <div className="flex items-start gap-3 text-green-300" role="status">
                    <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0"/>
                    <div>
                        <p className="font-semibold">{t("form.thanks")}</p>
                        <p className="mt-1 text-sm text-green-300/80">
                            {t("form.successText")}
                        </p>
                    </div>
                </div>
                <Button
                    type="button"
                    fullWidth={true}
                    className="mt-6"
                    onClick={() => setStatus("idle")}
                >
                    {t("close")}
                </Button>
            </Modal>
        </form>
    );
}

function ConditionalSelect({
    id,
    label,
    options,
    register,
    error,
    chooseLabel,
}: {
    id: "questionType" | "collaborationType" | "mediaType";
    label: string;
    options: { value: string; label: string }[];
    register: ReturnType<typeof useForm<ContactFormData>>["register"];
    error?: string;
    chooseLabel: string;
}) {
    return (
        <div>
            <label htmlFor={id} className="label">{label}</label>
            <select
                id={id}
                required
                className={cn("input", error && "border-red-500 focus:border-red-500 focus:ring-red-500/20")}
                aria-invalid={error ? "true" : "false"}
                {...register(id)}
            >
                <option value="">{chooseLabel}</option>
                {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
            {error && <p className="mt-1.5 text-sm text-red-400" role="alert">{error}</p>}
        </div>
    );
}