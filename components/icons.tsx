'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

function IconVercel({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      aria-label="Vercel logomark"
      role="img"
      viewBox="0 0 74 64"
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <path
        d="M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z"
        fill="currentColor"
      ></path>
    </svg>
  )
}

function IconGitHub({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={cn('h-5 w-5', className)}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
      <path d="M9 18c-4.51 2-5-2-7-2"/>
    </svg>
  )
}

function IconMoon({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1" strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('h-5 w-5', className)}>
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/><path d="M19 3v4"/>
      <path d="M21 5h-4"/>
    </svg>
  )
}

function IconSun({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
      className={cn('h-5 w-5', className)}>
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2"/><path d="M12 20v2"/>
      <path d="m4.93 4.93 1.41 1.41"/>
      <path d="m17.66 17.66 1.41 1.41"/>
      <path d="M2 12h2"/><path d="M20 12h2"/>
      <path d="m6.34 17.66-1.41 1.41"/>
      <path d="m19.07 4.93-1.41 1.41"/>
    </svg>
  )
}

function IconCopy({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <path d="M216 32H88a8 8 0 0 0-8 8v40H40a8 8 0 0 0-8 8v128a8 8 0 0 0 8 8h128a8 8 0 0 0 8-8v-40h40a8 8 0 0 0 8-8V40a8 8 0 0 0-8-8Zm-56 176H48V96h112Zm48-48h-32V88a8 8 0 0 0-8-8H96V48h112Z" />
    </svg>
  )
}

function IconCheck({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <path d="m229.66 77.66-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69 218.34 66.34a8 8 0 0 1 11.32 11.32Z" />
    </svg>
  )
}

function IconExternalLink({
  className,
  ...props
}: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={cn('h-4 w-4', className)}
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M224 104a8 8 0 0 1-16 0V59.32l-66.33 66.34a8 8 0 0 1-11.32-11.32L196.68 48H152a8 8 0 0 1 0-16h64a8 8 0 0 1 8 8Zm-40 24a8 8 0 0 0-8 8v72H48V80h72a8 8 0 0 0 0-16H48a16 16 0 0 0-16 16v128a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-72a8 8 0 0 0-8-8Z" />
    </svg>
  )
}

function IconChevronUpDown({
  className,
  ...props
}: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={cn('h-4 w-4', className)}
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M181.66 170.34a8 8 0 0 1 0 11.32l-48 48a8 8 0 0 1-11.32 0l-48-48a8 8 0 0 1 11.32-11.32L128 212.69l42.34-42.35a8 8 0 0 1 11.32 0Zm-96-84.68L128 43.31l42.34 42.35a8 8 0 0 0 11.32-11.32l-48-48a8 8 0 0 0-11.32 0l-48 48a8 8 0 0 0 11.32 11.32Z" />
    </svg>
  )
}

function IconRss({
  className,
  ...props
}: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor"
      strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
      className={cn('h-5 w-5', className)}
      >
        <path d="M4 11a9 9 0 0 1 9 9"/>
        <path d="M4 4a16 16 0 0 1 16 16"/>
        <circle cx="5" cy="19" r="1"/>
    </svg>
  )
}

function IconTwitter({
  className,
  ...props
}: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
      className={cn('h-5 w-5', className)}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
    </svg>
  )
}

function IconEmail({
  className,
  ...props
}: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      width="24" height="24"
      fill="none" viewBox="0 0 24 24"
      strokeWidth={1}
      stroke="currentColor"
      className={cn('size-5', className)}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
  )
}

function IconJike({
  className,
  ...props
}: React.ComponentProps<'svg'>) {
  return (
    <svg width="20" height="20" viewBox="0 0 38 37" fill="none" xmlns="http://www.w3.org/2000/svg" class="css-uvdhyp">
    <path d="M29.0824 0H8.78504C4.20934 0 0.5 3.70934 0.5 8.28504V28.5824C0.5 33.1581 4.20934 36.8675 8.78504 36.8675H29.0824C33.6581 36.8675 37.3675 33.1581 37.3675 28.5824V8.28504C37.3675 3.70934 33.6581 0 29.0824 0Z" fill="#FFE411"></path>
    <path d="M14.8856 30.1234L12.1737 26.2888C12.1219 26.2145 12.1015 26.1227 12.1168 26.0334C12.1321 25.9441 12.182 25.8644 12.2557 25.8116L14.0489 24.5503C15.9031 23.2384 17.011 21.42 17.011 18.83V7.14769C17.011 7.05717 17.0468 6.97032 17.1106 6.90612C17.1744 6.84192 17.261 6.80557 17.3516 6.80502H22.1363V18.8258C22.1363 23.5412 20.8224 25.8936 16.9563 28.6602L14.8856 30.1234Z" fill="white"></path>
    <path d="M21.9953 6.80708V18.6239C21.9953 23.3414 20.6813 25.6939 16.8153 28.4583L14.7424 29.9299L15.7305 31.3237C15.7561 31.3606 15.7888 31.392 15.8266 31.4161C15.8644 31.4402 15.9067 31.4565 15.9509 31.4641C15.9951 31.4718 16.0404 31.4705 16.0841 31.4605C16.1278 31.4505 16.1691 31.4318 16.2056 31.4057L18.0073 30.1317C20.3008 28.492 21.7367 26.9783 22.6638 25.244C23.6245 23.4444 24.045 21.4052 24.045 18.6239V7.14765C24.045 7.05677 24.0089 6.96961 23.9446 6.90534C23.8803 6.84108 23.7932 6.80498 23.7023 6.80498L21.9953 6.80708Z" fill="url(#paint0_linear_1615_6281)"></path>
    <defs>
      <linearGradient id="paint0_linear_1615_6281" x1="19.3948" y1="6.80708" x2="19.3948" y2="26.6567" gradientUnits="userSpaceOnUse"><stop stop-color="#F0FFFF"></stop>
        <stop offset="0.11" stop-color="#DDFAFE"></stop>
        <stop offset="0.33" stop-color="#ADEBFA"></stop>
        <stop offset="0.64" stop-color="#60D4F5"></stop>
        <stop offset="1" stop-color="#00B8EE"></stop>
      </linearGradient>
    </defs>
    </svg>
  )
}

export {
  IconVercel,
  IconGitHub,
  IconMoon,
  IconSun,
  IconCopy,
  IconCheck,
  IconExternalLink,
  IconRss,
  IconTwitter,
  IconEmail,
  IconJike
}
