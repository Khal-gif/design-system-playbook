/**
 * Brand Form Component Template
 * Built on shadcn/ui Form components with brand styling
 * Follows Design System Law Book compliance
 */

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

// Contact Form Example
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  newsletter: z.boolean().default(false)
})

type ContactFormValues = z.infer<typeof contactFormSchema>

interface ContactFormProps {
  onSubmit: (values: ContactFormValues) => void
  isLoading?: boolean
  title?: string
  description?: string
}

export function ContactForm({ 
  onSubmit, 
  isLoading = false,
  title = "Contact Us",
  description = "Send us a message and we'll get back to you."
}: ContactFormProps) {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "", 
      subject: "",
      message: "",
      newsletter: false
    }
  })

  return (
    <Card className="w-full max-w-2xl"> {/* Responsive max width */}
      <CardHeader className="pb-6"> {/* 24px bottom padding - on grid */}
        <CardTitle className="text-2xl font-bold">{title}</CardTitle> {/* 24px text - on grid */}
        <CardDescription className="text-base">{description}</CardDescription> {/* 16px text - on grid */}
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6"> {/* 24px spacing - on grid */}
            
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Name</FormLabel> {/* 14px text - on grid */}
                  <FormControl>
                    <Input 
                      placeholder="Your full name"
                      className="h-10" {/* 40px height - on grid */}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email"
                      placeholder="your@email.com"
                      className="h-10"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Subject Select */}
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Subject</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Message Textarea */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us how we can help you..."
                      className="min-h-24" {/* 96px min height - on grid */}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please provide as much detail as possible.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Newsletter Checkbox */}
            <FormField
              control={form.control}
              name="newsletter"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-lg"> {/* 16px padding - on grid */}
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-medium">
                      Subscribe to newsletter
                    </FormLabel>
                    <FormDescription>
                      Receive updates about new features and products.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full h-12" {/* 48px height - on grid */}
              disabled={isLoading}
              size="lg"
            >
              {isLoading ? "Sending..." : "Send Message"}
            </Button>
            
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

// Registration Form Example
const registrationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"), 
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  accountType: z.enum(["personal", "business"]),
  terms: z.boolean().refine((val) => val === true, "You must accept the terms")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

type RegistrationFormValues = z.infer<typeof registrationSchema>

export function RegistrationForm({ 
  onSubmit, 
  isLoading = false 
}: {
  onSubmit: (values: RegistrationFormValues) => void
  isLoading?: boolean
}) {
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      accountType: "personal",
      terms: false
    }
  })

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
        <CardDescription className="text-center">
          Join thousands of satisfied customers
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4"> {/* 16px spacing - on grid */}
            
            {/* Name Fields Row */}
            <div className="grid grid-cols-2 gap-4"> {/* 16px gap - on grid */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" className="h-10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lastName" 
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" className="h-10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Account Type */}
            <FormField
              control={form.control}
              name="accountType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Account Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-2" {/* 8px spacing - on grid */}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="personal" id="personal" />
                        <FormLabel htmlFor="personal">Personal</FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="business" id="business" />
                        <FormLabel htmlFor="business">Business</FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full h-12"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
            
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

// Usage Examples:
// <ContactForm
//   onSubmit={(data) => console.log(data)}
//   isLoading={false}
//   title="Get In Touch"
//   description="We'd love to hear from you"
// />
//
// <RegistrationForm
//   onSubmit={(data) => handleRegistration(data)}
//   isLoading={submitting}
// />