type CardProps = {
  coffee: {
    id: string
    title: string
    description: string
    tags: string[]
    price: number
    image: string
  }
}

export function Card({ coffee }: CardProps) {
  return (
    <div>
      <h1>this is a card</h1>
    </div>
  )
}
