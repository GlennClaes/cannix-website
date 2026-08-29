"use client";

import { Fragment, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export function Modal({ isOpen, onClose, children, title, className, size = "md" }: ModalProps) {
  const { t } = useLanguage();
  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-[90vw]",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Fragment>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-modal"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-modal flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
          >
            <div className={cn("w-full bg-bg-surface border border-border-subtle rounded-2xl overflow-hidden", sizes[size], className)}>
              <div className="flex items-center justify-between p-4 border-b border-border-subtle">
                {title ? (
                  <h2 id="modal-title" className="font-display text-lg font-bold">
                    {title}
                  </h2>
                ) : (
                  <span />
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-ghost p-2 rounded-lg hover:bg-bg-deep transition-colors"
                  aria-label={t("close")}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6">{children}</div>
            </div>
          </motion.div>
        </Fragment>
      )}
    </AnimatePresence>
  );
}

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "primary";
}

export function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText = "Bevestigen", cancelText = "Annuleren", variant = "primary" }: ConfirmModalProps) {
  const { t } = useLanguage();
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <p className="text-fg-muted mb-6">{message}</p>
      <div className="flex justify-end gap-3">
        <button onClick={onClose} className="btn-secondary">
          {cancelText === "Annuleren" ? t("modal.cancel") : cancelText}
        </button>
        <button
          onClick={() => { onConfirm(); onClose(); }}
          className={cn("btn", variant === "danger" ? "bg-red-600 hover:bg-red-500" : "btn-primary")}
        >
          {confirmText === "Bevestigen" ? t("modal.confirm") : confirmText}
        </button>
      </div>
    </Modal>
  );
}