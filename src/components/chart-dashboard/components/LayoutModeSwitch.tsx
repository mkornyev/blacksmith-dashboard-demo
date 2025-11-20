import {ButtonGroup} from "@/components/ui/button-group.tsx";
import {Button} from "@/components/ui/button.tsx";
import {LayoutMode} from "@/components/chart-dashboard/ChartDashboard.tsx";

type LayoutModeSwitchProps = {
  mode: LayoutMode
  updateMode: (mode: LayoutMode) => void
}

function LayoutModeSwitch({ mode, updateMode }: LayoutModeSwitchProps) {

  return (
    <>
      {/*TODO: Just use a loop*/}
      <ButtonGroup>
        <Button
          size='sm'
          onClick={() => updateMode(LayoutMode.Vertical)}
          variant={ mode === LayoutMode.Vertical ? 'default' : 'outline' }
        >
          Vertical
        </Button>
        <Button
          size='sm'
          onClick={() => updateMode(LayoutMode.Compact)}
          variant={ mode === LayoutMode.Compact ? 'default' : 'outline' }
        >
          Grid
        </Button>
        <Button
          size='sm'
          onClick={() => updateMode(LayoutMode.Free)}
          variant={ mode === LayoutMode.Free ? 'default' : 'outline' }
        >
          Custom
        </Button>
      </ButtonGroup>
    </>
  )
}

export default LayoutModeSwitch
