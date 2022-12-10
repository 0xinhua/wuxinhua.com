import style from './container.module.css'

type Props = {
  children?: React.ReactNode
}

const Container = ({ children }: Props) => {
  return <div className={style.postsContainer}>{children}</div>
}

export default Container
