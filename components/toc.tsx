"use client"

import { cn } from '@/lib/utils'
import { useEffect, useRef } from 'react'

export default function TOC({ toc, className }) {

  const tocRef = useRef<HTMLUListElement>(null)

  return (
    <div className={cn("lg:flex flex-col w-52 max-h-80 overflow-y-auto text-[14px]", className)}>
      { toc.length ? <span className="px-1 pb-2 font-medium text-base border-b mb-2">目录</span> : null }
      <ul ref={tocRef} className={cn("p-0 m-0 overflow-y-auto")} suppressHydrationWarning>
        {toc.map(({level, id, title}) => (
          <li key={id} className={cn(`my-0`,
            {
              2: 'font-semibold',
              3: 'pl-4',
              4: 'pl-8',
              5: 'pl-12',
              6: 'pl-16'
            }[level])}
          >
            <div className='my-1'>
              <a href={`#${id}`} className='text-slate-600 font-normal no-underline hover:text-blue-600 hover:underline underline-offset-4'>{title}</a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}