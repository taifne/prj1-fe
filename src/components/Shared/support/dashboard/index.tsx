import StatCards from '@/components/Shared/support/dashboard/stat-cards';
import ProblemTypes from '@/components/Shared/support/dashboard/problem-types';
import TicketActivity from '@/components/Shared/support/dashboard/ticket-activity';
import CustomerWithMostTickets from '@/components/Shared/support/dashboard/customer-with-most-tickets';
import ResponseRate from '@/components/Shared/support/dashboard/response-rate';
import EmployeesActivity from '@/components/Shared/support/dashboard/employees-activity';
import TicketsTable from '@/components/Shared/support/dashboard/tickets';
import CustomerType from '@/components/Shared/support/dashboard/customer-type';
import SatisfactionRate from '@/components/Shared/support/dashboard/satisfaction-rate';
import CustomerTimezone from '@/components/Shared/support/dashboard/customer-timezone';

export default function SupportDashboard() {
  return (
    <div className="@container">
      <div className="grid grid-cols-12 gap-6 3xl:gap-8">
        <StatCards className="col-span-full @2xl:grid-cols-2 @6xl:grid-cols-4" />

        <TicketActivity className="col-span-full" />

        <ProblemTypes className="col-span-full @4xl:col-span-6 @6xl:col-span-7 @7xl:col-span-8" />
        <SatisfactionRate className="col-span-full @4xl:col-span-6 @6xl:col-span-5 @7xl:col-span-4" />

        <CustomerWithMostTickets className="col-span-full" />

        <ResponseRate className="col-span-full @4xl:col-span-6 @6xl:col-span-7" />
        <CustomerType className="col-span-full @4xl:col-span-6 @6xl:col-span-5" />

        <TicketsTable className="col-span-full" />

        <EmployeesActivity className="col-span-full @4xl:col-span-6 @5xl:col-span-7" />
        <CustomerTimezone className="col-span-full @4xl:col-span-6 @5xl:col-span-5" />
      </div>
    </div>
  );
}
