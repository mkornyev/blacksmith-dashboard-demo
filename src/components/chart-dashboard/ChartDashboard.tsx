import DateRangePicker from "@/components/chart-dashboard/components/DateRangePicker.tsx";
import LayoutModeSwitch from "@/components/chart-dashboard/components/LayoutModeSwitch.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import ChartLayout from "@/components/chart-dashboard/components/chart-layout/ChartLayout.tsx";
import {chartData, orderedChartDataDates} from "@/components/chart-dashboard/chart-data.ts";
import {useState} from "react";
import type {DateRange} from "react-day-picker";

// Grid Library Imports
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import "./components/chart-layout/grid-layout-overrides.css"

// Types
export const LayoutMode = {
  Vertical: "Vertical",
  Compact: "Compact",
  Free: "Free",
} as const
export type LayoutMode = (typeof LayoutMode)[keyof typeof LayoutMode]

function ChartDashboard() {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>(LayoutMode.Vertical)
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: orderedChartDataDates[0],
    to: orderedChartDataDates[orderedChartDataDates.length - 1],
  })

  return (
    <>
      <Card className="w-full mt-4">
        <CardContent className='p-2.5 flex'>
          <LayoutModeSwitch
            mode={layoutMode}
            updateMode={setLayoutMode}
          />
          <DateRangePicker
            className='ml-auto'
            dateRange={dateRange}
            updateDateRange={setDateRange}
          />
        </CardContent>
      </Card>

      <ChartLayout
        charts={chartData}
        layoutMode={layoutMode}
      />
    </>
  )
}

export default ChartDashboard
