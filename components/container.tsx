import style from './container.module.css'

type Props = {
  children?: React.ReactNode
}

const Container = ({ children }: Props) => {
  return <div className="sm:max-w-[672px] w-full mx-auto">
    {children}
  </div>
}

export default Container
