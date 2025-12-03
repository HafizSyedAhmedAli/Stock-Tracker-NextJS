"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

/**
 * Renders a styled avatar root element that wraps the Radix Avatar primitive.
 *
 * @returns A configured Avatar root element with a fixed circular size, overflow hidden, and merged `className`; all other props are forwarded to the underlying Radix primitive.
 */
function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders an avatar image element with a square aspect ratio and full-size layout.
 *
 * @param className - Additional CSS class names to merge with the component's default classes.
 * @param props - Props forwarded to the underlying Radix `Avatar.Image` primitive.
 * @returns A configured `AvatarPrimitive.Image` element used as the avatar image.
 */
function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  )
}

/**
 * Renders a fallback avatar element used when the image is unavailable.
 *
 * Renders AvatarPrimitive.Fallback with a muted circular background and centered content, merges `className` with default styles, and forwards remaining props to the underlying primitive.
 *
 * @param className - Additional CSS class names appended to the component's default styling
 * @returns The avatar fallback element used when an image cannot be shown
 */
function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }