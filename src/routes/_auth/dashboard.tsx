import type { Overview } from '@/@types/responses/overviewResponse'
import { useQuery } from '@/hooks/useQuery'
import { createFileRoute } from '@tanstack/react-router'
import { ExternalLink, Link2, MousePointerClick, Trophy } from 'lucide-react';

const Dashboard = () => {

  const { data, loading } = useQuery<Overview>({
    url: 'http://localhost:5000/minurl/overview',
    authenticated: true,
  });

  return (
    <div className="bg-slate-50 min-h-full p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Section */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Performance Overview</h1>
          <p className="text-slate-500 text-sm">Monitor your link engagement across all campaigns.</p>
        </div>

        <div id="links-overview">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 w-full bg-white rounded-xl border animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <StatsCard
                title="Total Links"
                value={data?.total_links ?? 0}
                icon={<Link2 className="text-blue-600" size={20} />}
                color="bg-blue-50"
              />

              <StatsCard
                title="Total Clicks"
                value={data?.total_clicks ?? 0}
                icon={<MousePointerClick className="text-purple-600" size={20} />}
                color="bg-purple-50"
              />

              <StatsCard
                title="Top Performer"
                value={data?.top_performer?.clicks ?? 0}
                subtitle={data?.top_performer?.url}
                icon={<Trophy className="text-amber-500" size={20} />}
                color="bg-amber-50"
                isTopPerformer
              />

            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left 2/3: Recent Links Table */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Recent Links</h3>
              <button className="text-sm text-blue-600 font-medium hover:underline">View All</button>
            </div>
            <div className="divide-y divide-slate-100">
              {/* Map through data?.links here */}
              {/* <LinkRow slug="summer-promo" clicks={450} date="2 mins ago" />
              <LinkRow slug="bio-link" clicks={1200} date="1 hour ago" />
              <LinkRow slug="twitter-ads" clicks={89} date="3 hours ago" /> */}
            </div>
          </div>

          {/* Right 1/3: Device/Source Distribution */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h3 className="font-bold text-slate-800 mb-6">Device Distribution</h3>
            <div className="space-y-4">
              {
                data?.distributions?.devices?.list?.map((dist, index) => (
                  <div></div>
                ))
              }
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

const StatsCard = ({ title, value, subtitle, icon, color, isTopPerformer }: any) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${color}`}>
          {icon}
        </div>
        {isTopPerformer && (
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-2 py-1 rounded-full">
            Trending
          </span>
        )}
      </div>

      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <div className="flex items-baseline space-x-2">
          <h3 className="text-2xl font-bold text-slate-900">{value.toLocaleString()}</h3>
          {isTopPerformer && <span className="text-xs text-slate-400">clicks</span>}
        </div>

        {subtitle && (
          <div className="mt-4 flex items-center text-xs text-blue-600 font-medium truncate group cursor-pointer">
            <span className="truncate">{subtitle}</span>
            <ExternalLink size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}
      </div>
    </div>
  )
}

const LinkTable = ({ className }: { className: string }) => {
  return (
    <div className={className}>
      <table>
        <thead>
          <tr>
            <th>URL title</th>
            <th>Slug</th>
            <th>Long URL</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>
  )
}

export const Route = createFileRoute('/_auth/dashboard')({
  component: Dashboard,
})

