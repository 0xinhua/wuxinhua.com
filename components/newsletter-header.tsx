import { useRef, useState } from "react"
import useSWRMutation from 'swr/mutation'

async function sendRequest(url: string, { arg }: { arg: { email: string }}) {
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(arg)
  }).then(res => res.json())
}

export default function NewsletterHeader() {

  const emailRef = useRef<HTMLInputElement>()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  // repalce with your own endpoint url
  const { trigger } = useSWRMutation('https://7uf3wvg69x.us.aircode.run/subscribe', sendRequest, /* options */)

  const onSubscribe = async (_e: React.FormEvent<HTMLFormElement>) => {
    _e.preventDefault();
    if(!email && emailRef.current) {
      emailRef.current.focus()
      setMessage('Please fill out email field.')
      return
    }
    try {
      const result = await trigger({ email }, /* options */) as {
        message: string,
        code: number
      }

      const { message, code } = result
      if (message) {
        setMessage(result?.message)
      }

      if (code === 0) {
        setEmail('')
      }

    } catch (error) {
      const e = error as { message: string }
      let message = 'An error has occurred. '
      if (e && 'message' in e) {
        message += `error message: ${e.message}. `
      }
      message += 'please try again later.'
      setMessage(message)
    }
  }

  const onChange = (email: string): void => {
    setEmail(email)
    if (message) {
      setMessage('')
    }
  }

  
  return (
    <div className="pt-10 sm:pt-1 lg:pt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          <h2 className="inline sm:block text-lg">3 &nbsp;个推荐，2 &nbsp;个碎片 ，1 &nbsp;个想法，关注 &nbsp;AI、创业、人，周二投递 &nbsp; 💌 。</h2>{' '}
        </div>
        <form className="mt-10 max-w-md" onSubmit={onSubscribe}>
          <div className="flex gap-x-4">
            <label htmlFor="email-address" className="sr-only">
              email
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="输入邮箱与 500+ 读者一起订阅"
              onChange={(e) => onChange(e.target.value)}
            />
            <button
              type="submit"
              className="flex-none rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              订阅
            </button>

          </div>
          <div className='mt-2.5 leading-6'>
            { <span className='text-[13px] block text-[#8a8f98] font-medium'>{ message }</span> }
            </div>
        </form>
      </div>
    </div>
  )
}