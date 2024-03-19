import WebsiteMetrics from '@/components/Shared/analytics-dashboard/website-metrics/table-widget';
import AccountRetention from '@/components/Shared/analytics-dashboard/account-retention';
import Acquisition from '@/components/Shared/analytics-dashboard/acquisition';
import ConversionRates from '@/components/Shared/analytics-dashboard/conversion-rates';
import DeviceSessions from '@/components/Shared/analytics-dashboard/device-sessions';
import GoalAccomplished from '@/components/Shared/analytics-dashboard/goal-accomplished';
import StatCards from '@/components/Shared/analytics-dashboard/stat-cards';
import TopTrafficSource from '@/components/Shared/analytics-dashboard/top-traffic-source';
import UserMetrics from '@/components/Shared/analytics-dashboard/user-metrics';
import PageMetrics from '@/components/Shared/analytics-dashboard/page-metric/table-widget';

export default function AnalyticsDashboard() {
  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
        <StatCards className="grid-cols-1 @xl:grid-cols-2 @4xl:col-span-2 @6xl:grid-cols-4 @7xl:col-span-12" />

        <Acquisition className="@7xl:col-span-4" />

        <DeviceSessions className="@7xl:col-span-4" />

        <TopTrafficSource className="@7xl:col-span-4" />

        <UserMetrics className="@4xl:col-span-2 @7xl:col-span-12" />

        <ConversionRates className="@7xl:col-span-6 @[90rem]:col-span-7 @[112rem]:col-span-8" />

        <GoalAccomplished className="@4xl:col-start-2 @4xl:row-start-3 @7xl:col-span-6 @7xl:col-start-auto @7xl:row-start-auto @[90rem]:col-span-5 @[112rem]:col-span-4" />

        <PageMetrics className="@4xl:col-span-2 @4xl:row-start-5 @7xl:col-span-12 @7xl:row-start-auto @[90rem]:col-span-7 @[112rem]:col-span-8" />

        <AccountRetention className="@7xl:col-span-12 @[90rem]:col-span-5 @[112rem]:col-span-4" />

        <WebsiteMetrics className="@4xl:col-span-2 @7xl:col-span-12" />
      </div>
    </div>
  );
}
