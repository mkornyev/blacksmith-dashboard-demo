import type {Chart, DataPoint} from "@/components/chart-dashboard/chart.ts";
import {ChartContainer} from "@/components/ui/chart.tsx";
import { type ChartConfig } from "@/components/ui/chart"
import {Bar, BarChart} from "recharts";
import DragHandle from "@/components/chart-dashboard/components/chart-layout/components/DragHandle.tsx";

type ChartProps = {
  chart: Chart,
  showDragHandle: boolean,
};

function ChartComponent({ chart, showDragHandle }: ChartProps) {
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
      <div className="flex flex-col h-full pointer-events-auto relative z-0 no-drag" onMouseDown={(e) => e.stopPropagation()}>
        <ChartContainer id={chart.id} config={chartConfig} className='min-h-[40px] flex-1 w-full aspect-auto relative z-0'>
          <BarChart data={chart.data}>
            <Bar dataKey={getDataValue} fill={getFillValue(chart)} radius={5} />
            {/* <ChartTooltip content={<ChartTooltipContent labelKey='date' />} /> */}
          </BarChart>
        </ChartContainer>
      </div>
      <div>
        <div className='mt-2 flex-shrink-0'>
          <div className='text-sm ml-1'>{chart.label}</div>

          { showDragHandle && <DragHandle /> }

          {/*TODO: Come back & improve styling*/}
          {/*<ButtonGroup className='ml-auto'>*/}
          {/*  <Button size='sm' variant='destructive'>{chart.data[0].date.toLocaleDateString()}</Button>*/}
          {/*  <Button size='sm' disabled={true} variant='outline'>{chart.data.length}</Button>*/}
          {/*</ButtonGroup>*/}
        </div>
      </div>
    </>
)
}

export default ChartComponent