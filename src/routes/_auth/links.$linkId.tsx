import { createFileRoute } from '@tanstack/react-router'

const LinkPage = () => {
  const params = Route.useParams();

  return (
    <div className="w-full">
      {`Hello from ${params.linkId}`}
    </div>
  )
}

export const Route = createFileRoute('/_auth/links/$linkId')({
  component: LinkPage,
});

