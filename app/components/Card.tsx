type Props = {
  title: string
}

const Card: React.FC<Props> = ({ children, title }) => {
  return (
    <div className="p-4 flex flex-col items-center min-h-full">
      <div className="text-sm text-black p-4">{title}</div>
      {children}
    </div>
  )
}

export default Card
