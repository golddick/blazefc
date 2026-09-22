import { BlazeHome } from '@/components/blaze-home'

export default async function CatchAllPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  return <BlazeHome initialPath={`/${slug.join('/')}`} />
}
