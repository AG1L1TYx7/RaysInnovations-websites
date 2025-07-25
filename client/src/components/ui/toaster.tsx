import React from "react";
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { CheckCircle, XCircle, AlertTriangle, Info, Mail } from "lucide-react"

const getToastIcon = (variant?: string | null) => {
  const iconClass = "h-5 w-5 toast-icon-pulse"
  
  switch (variant) {
    case "success":
      return <CheckCircle className={`${iconClass} text-emerald-600 dark:text-emerald-400`} />
    case "error":
      return <XCircle className={`${iconClass} text-red-600 dark:text-red-400`} />
    case "warning":
      return <AlertTriangle className={`${iconClass} text-amber-600 dark:text-amber-400`} />
    case "info":
      return <Info className={`${iconClass} text-blue-600 dark:text-blue-400`} />
    default:
      return <Mail className={`${iconClass} text-slate-600 dark:text-slate-400`} />
  }
}

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast key={id} variant={variant} {...props} className="toast-enter">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                {getToastIcon(variant)}
              </div>
              <div className="grid gap-1 flex-1">
                {title && (
                  <ToastTitle className="font-semibold text-sm leading-tight">
                    {title}
                  </ToastTitle>
                )}
                {description && (
                  <ToastDescription className="text-sm opacity-90 leading-relaxed">
                    {description}
                  </ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose className="hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-200" />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
