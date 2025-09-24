import * as React from "react"
import { cn } from "@/lib/utils"

const Form = React.forwardRef<
  HTMLFormElement,
  React.FormHTMLAttributes<HTMLFormElement>
>(({ className, ...props }, ref) => (
  <form
    ref={ref}
    className={cn("font-sans space-y-6", className)} // 24px sections
    {...props}
  />
))
Form.displayName = "Form"

const FormField = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("space-y-2", className)} // 8px label gap
    {...props}
  />
))
FormField.displayName = "FormField"

const FormLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "font-sans text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
))
FormLabel.displayName = "FormLabel"

const FormInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "font-sans flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base font-normal ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
FormInput.displayName = "FormInput"

const FormTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "font-sans flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-base font-normal ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
FormTextarea.displayName = "FormTextarea"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "font-sans text-xs font-normal text-muted-foreground",
      className
    )}
    {...props}
  />
))
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "font-sans text-xs font-medium text-destructive",
      className
    )}
    {...props}
  />
))
FormMessage.displayName = "FormMessage"

export {
  Form,
  FormField,
  FormLabel,
  FormInput,
  FormTextarea,
  FormDescription,
  FormMessage,
}

/*
DESIGN SYSTEM COMPLIANT USAGE:

<Form className="space-y-6 font-sans">          // 24px sections
  <div className="space-y-4">                   // 16px fields
    <FormField className="space-y-2">           // 8px label gap
      <FormLabel className="text-sm font-medium">
        Email Address                            // 14px, 500 weight
      </FormLabel>
      <FormInput 
        className="h-10 text-base font-normal"  // 40px, 16px text
        placeholder="Enter your email"
        type="email"
      />
      <FormDescription className="text-xs font-normal text-muted-foreground">
        We'll never share your email.           // 12px helper
      </FormDescription>
    </FormField>
    
    <FormField className="space-y-2">
      <FormLabel className="text-sm font-medium">
        Message                                  // 14px, 500 weight
      </FormLabel>
      <FormTextarea 
        className="min-h-20 text-base font-normal"
        placeholder="Enter your message"
      />
    </FormField>
  </div>
  
  <Button className="h-12 w-full text-base font-semibold">
    Submit Form                                  // 48px, 600 weight
  </Button>
</Form>
*/