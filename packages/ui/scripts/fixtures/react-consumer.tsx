import { useEffect, useRef, useState } from 'react'
import {
  Button, Glass, LazyVStack, Menu, NavigationLink, NavigationStack,
  Popover, Sheet, Slider, TextField, Toggle, UIProvider,
} from '@swiftuijs/ui'

function Detail() {
  return <><h2>Detail page</h2><NavigationLink dismiss>Go back</NavigationLink></>
}

export function App() {
  const [enabled, setEnabled] = useState(false)
  const [name, setName] = useState('Ada')
  const [progress, setProgress] = useState(20)
  const [sheet, setSheet] = useState(false)
  const [popover, setPopover] = useState(false)
  const [selection, setSelection] = useState('None')
  const [refsReady, setRefsReady] = useState(false)
  const glassRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLInputElement>(null)
  const anchorRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setRefsReady(glassRef.current instanceof HTMLDivElement && sliderRef.current instanceof HTMLInputElement)
  }, [])

  return <UIProvider theme="light" glass={{ enabled: true, intensity: 0.5 }} style={{ maxWidth: 640, margin: '0 auto' }}>
    <Glass ref={glassRef} style={{ flexDirection: 'column', alignItems: 'stretch', gap: 8, padding: 16 }}>
      <h1>React compatibility</h1>
      <output aria-label="Forwarded refs">{refsReady ? 'Ready' : 'Waiting'}</output>
      <Toggle aria-label="Notifications" isOn={enabled} onChange={setEnabled} />
      <output aria-label="Notification state">{enabled ? 'On' : 'Off'}</output>
      <TextField aria-label="Name" value={name} onChange={event => setName(event.target.value)} />
      <output aria-label="Name value">{name}</output>
      <Slider ref={sliderRef} aria-label="Progress" value={progress} onValueChange={setProgress} />
      <output aria-label="Progress value">{progress}</output>
      <Menu trigger={<Button>Actions</Button>} items={[
        { label: 'Edit', action: () => setSelection('Edit') },
        { label: 'Share', action: () => setSelection('Share') },
      ]} />
      <output aria-label="Menu selection">{selection}</output>
      <Button onClick={() => setSheet(true)}>Open sheet</Button>
      <Sheet title="Editor" isPresented={sheet} onDismiss={() => setSheet(false)}
        presentationDetents={['medium', 'large']}>
        <Button onClick={() => setSheet(false)}>Save</Button>
      </Sheet>
      <button ref={anchorRef} onClick={() => setPopover(true)}>Open popover</button>
      <Popover title="Help" anchorRef={anchorRef} isPresented={popover} onDismiss={() => setPopover(false)}>
        Help content
      </Popover>
    </Glass>
    <NavigationStack style={{ height: 120 }}><NavigationLink destination={Detail}>Go to detail</NavigationLink></NavigationStack>
    <div role="region" aria-label="Long list" style={{ height: 160, overflowY: 'auto' }}>
      <LazyVStack estimatedItemHeight={40}>
        {Array.from({ length: 1000 }, (_, index) => <div key={index} data-lazy-item={index} style={{ height: 40 }}>Row {index}</div>)}
      </LazyVStack>
    </div>
  </UIProvider>
}
