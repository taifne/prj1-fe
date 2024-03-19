import SimpleLineChart from '@/components/Shared/chart-widgets/simple-line-chart';
import CustomizedDotLineChart from '@/components/Shared/chart-widgets/customized-dot-line-chart';
import SimpleBarChart from '@/components/Shared/chart-widgets/simple-bar-chart';
import MixBarChart from '@/components/Shared/chart-widgets/mix-bar-chart';
import CustomShapeBarChart from '@/components/Shared/chart-widgets/custom-shape-bar-chart';
import BrushBarChart from '@/components/Shared/chart-widgets/brush-bar-chart';
import SimpleAreaChart from '@/components/Shared/chart-widgets/simple-area-chart';
import StackedAreaChart from '@/components/Shared/chart-widgets/stacked-area-chart';
import SimpleRadarChart from '@/components/Shared/chart-widgets/simple-radar-chart';
import RadialBarChart from '@/components/Shared/chart-widgets/radial-bar-chart';
import CustomizedMixChart from '@/components/Shared/chart-widgets/customized-mix-chart';

export default function ChartWidgets() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 3xl:gap-8">
      <SimpleLineChart />
      <CustomizedDotLineChart />
      <SimpleBarChart />
      <MixBarChart />
      <CustomShapeBarChart />
      <BrushBarChart />
      <SimpleAreaChart />
      <StackedAreaChart />
      <SimpleRadarChart />
      <RadialBarChart />
      <CustomizedMixChart className="lg:col-span-2" />
    </div>
  );
}
