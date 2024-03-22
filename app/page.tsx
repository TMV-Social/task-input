import Link from 'next/link'

export default async function Index() {
  return (
    <div className="items-center">
      Here you can add{' '}
      <Link className="underline" href={'tasks'}>
        tasks
      </Link>
    </div>
  )
}
