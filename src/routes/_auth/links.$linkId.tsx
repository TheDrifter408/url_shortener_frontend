import { useQuery } from '@/hooks/useQuery';
import { createFileRoute } from '@tanstack/react-router'

const LinkPage = () => {
  const params = Route.useParams();

  const { data } = useQuery({
    url: `https://localhost:5000/`
  })

  return (
    <div className="w-full px-2">
      {`Hello from ${params.linkId}`}
    </div>
  )
}

export const Route = createFileRoute('/_auth/links/$linkId')({
  component: LinkPage,
});

