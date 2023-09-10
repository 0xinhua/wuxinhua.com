import { useRef, useState } from "react"
import useSWRMutation from 'swr/mutation'
import { BookOpenIcon, HeartIcon, LightBulbIcon } from '@heroicons/react/20/solid'

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
  const [loading, setLoading] = useState(false)

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
      setLoading(true)
      const result = await trigger({ email }, /* options */) as {
        message: string,
        code: number
      }

      setLoading(false)
      const { message, code } = result
      if (message) {
        setMessage(result?.message)
      }

      if (code === 0) {
        setEmail('')
      }

    } catch (error) {
      setLoading(false)
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

  const features = [
    {
      name: '3 篇精选长文：',
      description:
        '涵盖科技、AI、创业等领域',
      icon: BookOpenIcon,
    },
    {
      name: '2 个推荐：',
      description: '工具、产品，也可能是一个生活小贴士',
      icon: HeartIcon,
    },
    {
      name: '1 个思考：',
      description: 'Ideas、想法',
      icon: LightBulbIcon,
    },
  ]

  const formatMessage = (message: string): string => {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/;
    const emailMatch = message.match(emailRegex);

    console.log('emailMatch', emailMatch)

    if (emailMatch) {
      const email = emailMatch[0];
      return (
        message.replace(email,`
         <strong class="text-blue-600">${email}</strong>
      `)
      );
    }
    return `<span>{message}</span>`;
  };

  
  return (
    <div className="overflow-hidden py-24 sm:py-16 px-8 relative">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-1">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <p className="mt-2 text-3xl font-bold tracking-tight 0 sm:text-4xl">321 来信 </p>
              <dl className="mt-10 max-w-xl space-y-4 text-base leading-7 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold">
                      <feature.icon className="absolute left-1 top-1 h-5 w-5 text-blue-600 hover:text-blue-500" aria-hidden="true" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
      <div>
        <form className="mt-12" onSubmit={onSubscribe}>
          <div className="flex gap-x-4 max-w-md">
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
              className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0.5 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              placeholder="请输入你的邮箱"
              onChange={(e) => onChange(e.target.value)}
            />
            <button
              type="submit"
              className="flex-none rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              { loading ? '...' : '订阅'}
            </button>

          </div>
          <div className='mt-2.5 leading-6'>
            {
            message ? <div className='text-[13px] block text-[#8a8f98] font-medium' dangerouslySetInnerHTML={{__html: formatMessage(message)}} />
            : <p className="mt-2 text-base leading-8">
              输入电子邮箱与 <span className="font-base text-transparent text-xl bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600"> 500</span>+ 订阅读者成为朋友 ~
            </p>
            }
          </div>
        </form>
      </div>
    </div>
  )
}