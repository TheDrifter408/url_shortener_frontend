import type { Analytics } from '@/@types/responses/analyticsResponse';
import { useQuery } from '@/hooks/useQuery';
import { createFileRoute } from '@tanstack/react-router'
import { LoaderCircle } from 'lucide-react';

const LinkPage = () => {
  const params = Route.useParams();

  const { data, loading } = useQuery<Analytics>({
    url: `http://localhost:5000/minurl/${params.linkId}/analytics`,
    authenticated: true,
  });

  return (
    <section className="w-full p-2">
      <article className="flex items-center">
        <div className="rounded px-2 bg-slate-300 border w-full flex items-center justify-between">
          <h1 className="text-3xl font-bold">Total Clicks:</h1>
          {loading
            ? (
              <h1 className="text-3xl font-bold">
                <LoaderCircle className="animate-spin" />
              </h1>
            )
            : (
              <h1 className="text-3xl font-bold">{data?.total_clicks}</h1>
            )
          }
        </div>
      </article>
      <article className="flex items-center justify-evenly">

      </article>
    </section>
  )
}

export const Route = createFileRoute('/_auth/links/$linkId')({
  component: LinkPage,
});

