import type {Chart} from "@/components/chart-dashboard/chart.ts"
import ChartComponent from "@/components/chart-dashboard/components/chart-layout/components/ChartComponent"
import GridLayout from "react-grid-layout"
import {LayoutMode} from "@/components/chart-dashboard/ChartDashboard.tsx"
import {useEffect, useRef, useState} from "react"
import ResizeHandle from "@/components/chart-dashboard/components/chart-layout/components/ResizeHandle.tsx";

type ChartLayoutProps = {
  charts: Chart[]
  layoutMode: LayoutMode
}

const CHART_HEIGHT = 2
const ROW_HEIGHT_PX = 30

function ChartDashboard({ charts, layoutMode }: ChartLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState<number>(1000)

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setWidth(container.offsetWidth);
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width)
      }
    })
    resizeObserver.observe(container)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  let layout 
  let numGridCols: number

  switch (layoutMode) {
    case LayoutMode.Vertical:
      numGridCols = 1
      layout = charts.map((chart, i) => ({
        i: chart.id,
        x: 0, y: i,
        w: numGridCols, h: CHART_HEIGHT,
        isDraggable: false,
        isResizable: false
      }))
      break
    case LayoutMode.Compact:
      numGridCols = 3
      layout = charts.map((chart, i) => ({
        i: chart.id,
        x: i % numGridCols, y: Math.floor(i/numGridCols),
        w: 1, h: CHART_HEIGHT,
        isDraggable: false,
        isResizable: false
      }))
      break
    default:
      numGridCols = 10
      layout = charts.map((chart, i) => ({
        i: chart.id,
        x: 0, y: i,
        w: numGridCols , h: CHART_HEIGHT,
        minW: 2, maxW: numGridCols,
        minH: 2, maxH: 7,
        isDraggable: true,
        isResizable: true
      }))
  }

  return (
    <div ref={containerRef} className="w-full">
      <GridLayout
        layout={layout}
        cols={numGridCols}
        rowHeight={ROW_HEIGHT_PX}
        width={width}
        margin={[10, 25]}
        isBounded={true}
        draggableHandle=".drag-chart-handle"
        resizeHandle={(axis, ref) => <ResizeHandle handleAxis={axis} ref={ref} />}
      >
        {
          charts.map((chart) => (
            <div key={chart.id} className="h-full relative">
              <ChartComponent chart={chart} showDragHandle={layoutMode === LayoutMode.Free} />
            </div>
          ))
        }
      </GridLayout>
    </div>
  )
}

export default ChartDashboard