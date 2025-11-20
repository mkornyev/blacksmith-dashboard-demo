import type {Chart, DataPoint} from "@/components/chart-dashboard/chart.ts";
import {ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart.tsx";
import { type ChartConfig } from "@/components/ui/chart"
import {Bar, BarChart} from "recharts";

type ChartLayoutProps = {
  charts: Chart[];
};

function ChartDashboard({ charts = [] }: ChartLayoutProps) {
  const chartConfig = {
    primaryValue: { color: "#0072DB", },
    secondaryValue: { color: "#34D399", },
    tertiaryValue: { color: "#F87171", }
  } satisfies ChartConfig

  const getDataValue = (data: DataPoint) => {
    return data.value
  }
  const getFillValue = (chart: Chart) => {
    switch (chart.category) {
      case "Primary":
        return `var(--color-primaryValue)`
      case "Secondary":
        return `var(--color-secondaryValue)`
      default:
        return `var(--color-tertiaryValue)`
    }
  }

  return (
    <>
      {charts.map(chart => (
        <div className='my-8'>
          <ChartContainer id={chart.id} config={chartConfig} className='min-h-[40px] max-h-[70px] w-full'>
            <BarChart data={chart.data}>
              <Bar dataKey={getDataValue} fill={getFillValue(chart)} radius={5} />
              <ChartTooltip content={<ChartTooltipContent labelKey='date' />} />
            </BarChart>
          </ChartContainer>
          <div className='mt-2'>
            <div className='text-sm ml-1'>{chart.label}</div>

            {/*TODO: Come back & improve styling*/}
            {/*<ButtonGroup className='ml-auto'>*/}
            {/*  <Button size='sm' variant='destructive'>{chart.data[0].date.toLocaleDateString()}</Button>*/}
            {/*  <Button size='sm' disabled={true} variant='outline'>{chart.data.length}</Button>*/}
            {/*</ButtonGroup>*/}
          </div>
        </div>
      ))}
    </>
  )
}

export default ChartDashboard