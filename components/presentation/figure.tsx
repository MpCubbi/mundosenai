import Image from 'next/image'

type FigureProps = {
  src: string
  alt: string
  caption?: string
  wide?: boolean
  sizes?: string
}

export function Figure({ src, alt, caption, wide, sizes }: FigureProps) {
  return (
    <figure className={`media${wide ? ' media--wide' : ''}`}>
      <Image
        src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${src || '/placeholder.svg'}`}
        alt={alt}
        fill
        sizes={sizes ?? '(max-width: 900px) 100vw, 560px'}
      />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  )
}
