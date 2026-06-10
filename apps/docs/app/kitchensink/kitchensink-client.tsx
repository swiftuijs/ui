'use client';

import {
  ActivityIndicator,
  Alert,
  AllowsHitTesting,
  AngularGradient,
  AspectRatio,
  AsyncImage,
  Badge,
  Button,
  Canvas,
  Card,
  Chart,
  Color,
  ColorPicker,
  ConfirmationDialog,
  ContainerBackground,
  ContainerRelativeFrame,
  ContentMargins,
  ContentTransition,
  ContentUnavailableView,
  ContextMenu,
  ControlGroup,
  DatePicker,
  DefaultScrollAnchor,
  DisclosureGroup,
  Divider,
  FileImporter,
  ForEach,
  Form,
  Gauge,
  GeometryReader,
  Grid,
  GridRow,
  Group,
  GroupBox,
  HelpLink,
  HoverEffect,
  HSplitView,
  HStack,
  Image,
  Inspector,
  KeyframeAnimator,
  Label,
  LabeledContent,
  LazyHGrid,
  LazyHStack,
  LazyVGrid,
  LazyVStack,
  LinearGradient,
  Link,
  List,
  MapView,
  MatchedGeometryEffect,
  Menu,
  MeshGradient,
  MultiDatePicker,
  NavigationBar,
  NavigationLink,
  NavigationSplitView,
  NavigationStack,
  OutlineGroup,
  PasteButton,
  PhaseAnimator,
  PhotosPicker,
  Picker,
  Popover,
  PresentationBackground,
  PresentationCompactAdaptation,
  PresentationCornerRadius,
  PresentationDragIndicator,
  ProgressView,
  RadialGradient,
  Redacted,
  Refreshable,
  SafeArea,
  SafeAreaInset,
  ScenePadding,
  ScrollBounceBehavior,
  ScrollClipDisabled,
  ScrollIndicators,
  ScrollTarget,
  ScrollTransition,
  ScrollView,
  ScrollViewReader,
  SearchField,
  Section,
  SecureField,
  SettingsLink,
  ShareLink,
  Sheet,
  Slider,
  Spacer,
  Stepper,
  SwipeActions,
  SymbolEffect,
  Table,
  TableColumn,
  TabView,
  Text,
  TextEditor,
  TextField,
  TextSelection,
  TimelineView,
  Toggle,
  Toolbar,
  Unredacted,
  VideoPlayer,
  ViewThatFits,
  VisualEffect,
  VStack,
  VSplitView,
  ZStack,
} from '@swiftuijs/ui';
import { useMemo, useRef, useState } from 'react';

type Market = {
  change: number;
  edge: number;
  id: string;
  liquidity: string;
  market: string;
  odds: number;
  side: 'YES' | 'NO';
  status: 'Live' | 'Observe' | 'Blocked';
};

type TreeNode = {
  children?: TreeNode[];
  id: string;
  name: string;
};

const markets: Market[] = [
  {
    change: 4.2,
    edge: 6.8,
    id: 'btc-100k',
    liquidity: '$842k',
    market: 'BTC above 100k by Friday',
    odds: 62,
    side: 'YES',
    status: 'Live',
  },
  {
    change: -1.8,
    edge: 2.1,
    id: 'eth-4k',
    liquidity: '$317k',
    market: 'ETH above 4k this month',
    odds: 48,
    side: 'NO',
    status: 'Observe',
  },
  {
    change: 0.9,
    edge: 1.3,
    id: 'fed-cut',
    liquidity: '$1.2m',
    market: 'Fed cuts at next meeting',
    odds: 31,
    side: 'NO',
    status: 'Blocked',
  },
];

const pnlSeries = [
  { id: 'mon', label: 'Mon', value: 12 },
  { id: 'tue', label: 'Tue', value: 18 },
  { id: 'wed', label: 'Wed', value: 15 },
  { id: 'thu', label: 'Thu', value: 26 },
  { id: 'fri', label: 'Fri', value: 22 },
];

const exposureSeries = [
  { id: 'btc', label: 'BTC', value: 34 },
  { id: 'eth', label: 'ETH', value: 21 },
  { id: 'macro', label: 'Macro', value: 18 },
  { id: 'equity', label: 'Equity', value: 11 },
];

const outlineData: TreeNode[] = [
  {
    id: 'research',
    name: 'Research',
    children: [
      { id: 'replay', name: 'Replay evidence' },
      { id: 'forward', name: 'Forward sample' },
    ],
  },
  {
    id: 'execution',
    name: 'Execution',
    children: [
      { id: 'limits', name: 'Risk limits' },
      { id: 'fills', name: 'Fill quality' },
    ],
  },
];

const assetImage =
  'https://images.unsplash.com/photo-1642790551116-18e150f248e3?auto=format&fit=crop&w=1200&q=80';

function Panel(props: { children: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <GroupBox
      style={{
        border: '1px solid rgba(148, 163, 184, 0.28)',
        borderRadius: 18,
        padding: 18,
      }}
    >
      <VStack spacing={14}>
        <HStack alignment="center" style={{ justifyContent: 'space-between' }}>
          <VStack spacing={3}>
            <Text style={{ fontSize: 18, fontWeight: 700 }}>{props.title}</Text>
            {props.subtitle ? (
              <Text style={{ color: 'rgba(100, 116, 139, 0.92)', fontSize: 13 }}>
                {props.subtitle}
              </Text>
            ) : null}
          </VStack>
        </HStack>
        {props.children}
      </VStack>
    </GroupBox>
  );
}

function ComponentTile(props: { children: React.ReactNode; name: string }) {
  return (
    <Card style={{ border: '1px solid rgba(148, 163, 184, 0.25)', padding: 14 }}>
      <VStack spacing={10}>
        <Badge>{props.name}</Badge>
        {props.children}
      </VStack>
    </Card>
  );
}

export function KitchensinkClient() {
  const [riskMode, setRiskMode] = useState<string | number>('balanced');
  const [selectedMarket, setSelectedMarket] = useState(markets[0]);
  const [showAlert, setShowAlert] = useState(false);
  const [showSheet, setShowSheet] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [accentColor, setAccentColor] = useState('#2563eb');
  const [date, setDate] = useState('2026-06-10');
  const [dates, setDates] = useState(['2026-06-10', '2026-06-12']);
  const [allocation, setAllocation] = useState(42);
  const [stepSize, setStepSize] = useState(3);
  const [enabled, setEnabled] = useState(true);
  const [query, setQuery] = useState('');
  const [notes, setNotes] = useState('Replay says edge is regime-dependent; keep size capped.');
  const [password, setPassword] = useState('');
  const [importedFiles, setImportedFiles] = useState('No files selected');
  const [imageFiles, setImageFiles] = useState('No photos selected');
  const [refreshCount, setRefreshCount] = useState(0);
  const popoverAnchorRef = useRef<HTMLButtonElement | null>(null);

  const filteredMarkets = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return markets;
    }

    return markets.filter((market) => market.market.toLowerCase().includes(normalizedQuery));
  }, [query]);

  return (
    <main
      style={{
        background: 'linear-gradient(180deg, #f8fafc 0%, #eef2f7 45%, #f8fafc 100%)',
        color: '#0f172a',
        minHeight: '100vh',
        padding: '28px',
      }}
    >
      <SafeArea>
        <VStack spacing={22}>
          <NavigationBar
            title="Kitchensink Demo"
            toolbarItems={(
              <HStack spacing={10}>
                <Link destination="/">Docs</Link>
                <SettingsLink href="/docs/getting-started/" label="Setup" />
                <ShareLink item="/kitchensink/" subject="SwiftUI.js kitchensink">
                  Share
                </ShareLink>
              </HStack>
            )}
          />

          <ZStack
            alignment="bottom-leading"
            style={{
              borderRadius: 28,
              minHeight: 310,
              overflow: 'hidden',
            }}
          >
            <MeshGradient
              colors={['#0f172a', '#1d4ed8', '#14b8a6', '#f59e0b']}
              height={310}
              points={[
                [0, 0],
                [1, 0],
                [0, 1],
                [1, 1],
              ]}
              width={1200}
            />
            <ContainerBackground
              style={{
                background: 'rgba(15, 23, 42, 0.62)',
                inset: 0,
                position: 'absolute',
              }}
            />
            <ContentMargins style={{ padding: 28, position: 'relative', width: '100%' }}>
              <VStack spacing={18}>
                <Badge>Production-style demo</Badge>
                <Text style={{ color: 'white', display: 'block', fontSize: 44, fontWeight: 800, maxWidth: 820 }}>
                  Trading operator workspace built only from SwiftUI.js components.
                </Text>
                <Text style={{ color: 'rgba(255,255,255,0.78)', display: 'block', maxWidth: 720 }}>
                  The screen combines navigation, forms, tables, charts, media, dialogs, layout,
                  presentation controls, and interaction states into one static-export app.
                </Text>
                <HStack spacing={12}>
                  <Button onClick={() => setShowSheet(true)}>Open trade sheet</Button>
                  <Button onClick={() => setShowAlert(true)}>Raise alert</Button>
                  <Menu
                    items={[
                      { label: 'Copy runbook', action: () => setNotes('Copied runbook checklist.') },
                      { label: 'Pause buying', action: () => setShowConfirm(true), destructive: true },
                      {
                        label: 'Research',
                        submenu: [
                          { label: 'Replay evidence' },
                          { label: 'Forward sample' },
                        ],
                      },
                    ]}
                    trigger={<Button>Actions</Button>}
                  />
                </HStack>
              </VStack>
            </ContentMargins>
          </ZStack>

          <NavigationSplitView
            sidebar={(
              <Panel title="Workbench" subtitle="Navigation, outline, disclosure, and list">
                <List>
                  <Section header={<Text>Strategies</Text>}>
                    <ForEach
                      data={markets}
                      keyExtractor={(market) => market.id}
                      renderItem={(market) => (
                        <SwipeActions
                          actions={[
                            { label: 'Pin', action: () => setSelectedMarket(market) },
                            { label: 'Block', tint: 'destructive', action: () => setShowConfirm(true) },
                          ]}
                          key={market.id}
                        >
                          <Button
                            onClick={() => setSelectedMarket(market)}
                            style={{
                              justifyContent: 'space-between',
                              width: '100%',
                            }}
                          >
                            <Label icon={market.side === 'YES' ? 'Y' : 'N'} title={market.market} />
                            <Badge>{market.status}</Badge>
                          </Button>
                        </SwipeActions>
                      )}
                    />
                  </Section>
                </List>
                <DisclosureGroup defaultExpanded label="Pipeline outline">
                  <OutlineGroup
                    data={outlineData}
                    getChildren={(item) => item.children}
                    getKey={(item) => item.id}
                    renderItem={(item) => <Text>{item.name}</Text>}
                  />
                </DisclosureGroup>
              </Panel>
            )}
            content={(
              <Panel title="Controls" subtitle="Form, pickers, sliders, and text input">
                <Form
                  onSubmit={(event) => {
                    event.preventDefault();
                    setShowAlert(true);
                  }}
                >
                  <VStack spacing={12}>
                    <SearchField
                      label="Search markets"
                      onValueChange={setQuery}
                      placeholder="BTC, ETH, Fed..."
                      value={query}
                    />
                    <Picker
                      onSelectionChange={setRiskMode}
                      options={[
                        { label: 'Conservative', value: 'conservative' },
                        { label: 'Balanced', value: 'balanced' },
                        { label: 'Aggressive', value: 'aggressive' },
                      ]}
                      selection={riskMode}
                    />
                    <DatePicker onValueChange={setDate} value={date} />
                    <MultiDatePicker label="Review dates" onValueChange={setDates} value={dates} />
                    <ColorPicker label="Accent" onChange={setAccentColor} value={accentColor} />
                    <Slider
                      max={100}
                      min={0}
                      onValueChange={setAllocation}
                      value={allocation}
                    />
                    <Stepper
                      max={10}
                      min={1}
                      onValueChange={setStepSize}
                      value={stepSize}
                    />
                    <HStack spacing={8}>
                      <Toggle aria-label="Enable observe mode" isOn={enabled} onChange={setEnabled} />
                      <Text>Enable observe mode</Text>
                    </HStack>
                    <TextField
                      onChange={(event) => setNotes(event.currentTarget.value)}
                      placeholder="Signal note"
                      value={notes}
                    />
                    <SecureField
                      onChange={(event) => setPassword(event.currentTarget.value)}
                      placeholder="Operator passphrase"
                      value={password}
                    />
                    <TextEditor onValueChange={setNotes} value={notes} />
                    <HStack spacing={10}>
                      <FileImporter
                        allowedContentTypes={['.csv', '.json']}
                        onSelect={(files) => setImportedFiles(files.map((file) => file.name).join(', '))}
                      >
                        Import fills
                      </FileImporter>
                      <PhotosPicker
                        onSelect={(files) => setImageFiles(files.map((file) => file.name).join(', '))}
                      >
                        Add screenshots
                      </PhotosPicker>
                      <PasteButton onPaste={(value) => setNotes(String(value))}>Paste note</PasteButton>
                    </HStack>
                    <Text>{importedFiles}</Text>
                    <Text>{imageFiles}</Text>
                    <Button type="submit">Save controls</Button>
                  </VStack>
                </Form>
              </Panel>
            )}
            detail={(
              <VStack spacing={18}>
                <Panel title={selectedMarket.market} subtitle="Charts, table, gauge, progress, and refresh">
                  <Grid columns={2} spacing={14}>
                    <Chart
                      caption="PnL, last five sessions"
                      data={pnlSeries}
                      defaultSelectedDatumId="thu"
                      label="PnL"
                      mark="line"
                      showValues
                      valueFormatter={(value) => `$${value}k`}
                    />
                    <Chart
                      caption="Exposure by theme"
                      data={exposureSeries}
                      label="Exposure"
                      mark="bar"
                      showValues
                      valueFormatter={(value) => `${value}%`}
                    />
                  </Grid>
                  <HStack spacing={14}>
                    <Gauge
                      currentValueLabel={`${selectedMarket.edge.toFixed(1)} edge`}
                      label="Signal edge"
                      max={10}
                      value={selectedMarket.edge}
                    />
                    <ProgressView
                      completed={allocation}
                      currentValueLabel={`${allocation}%`}
                      label="Allocation"
                      total={100}
                    />
                    <HStack spacing={8}>
                      <ActivityIndicator size="small" />
                      <Text>Live feed</Text>
                    </HStack>
                  </HStack>
                  <Refreshable
                    onRefresh={() => setRefreshCount((count) => count + 1)}
                    toolbar={<Badge>{refreshCount} refreshes</Badge>}
                  >
                    {filteredMarkets.length ? (
                      <Table data={filteredMarkets} rowKey={(row) => row.id}>
                        <TableColumn<Market> title="Market" value={(row) => row.market} />
                        <TableColumn<Market> title="Side" value={(row) => row.side} />
                        <TableColumn<Market> title="Odds" value={(row) => `${row.odds}%`} />
                        <TableColumn<Market> title="Liquidity" value={(row) => row.liquidity} />
                      </Table>
                    ) : (
                      <ContentUnavailableView
                        actions={<Button onClick={() => setQuery('')}>Clear search</Button>}
                        description="No current markets match the search filter."
                        icon="0"
                        title="No markets"
                      />
                    )}
                  </Refreshable>
                </Panel>

                <Panel title="Media and geometry" subtitle="Images, maps, canvas, and adaptive layout">
                  <LazyVGrid columns={3} spacing={14}>
                    <AspectRatio ratio={16 / 10}>
                      <AsyncImage
                        alt="Trading screens"
                        fallback={<Text>Image failed</Text>}
                        placeholder={<Redacted>Loading chart image</Redacted>}
                        src={assetImage}
                      />
                    </AspectRatio>
                    <MapView
                      annotations={[
                        { id: 'ny', latitude: 40.7128, longitude: -74.006, title: 'New York' },
                        { id: 'ldn', latitude: 51.5072, longitude: -0.1276, title: 'London' },
                      ]}
                      defaultSelection="ny"
                      latitude={40.7128}
                      longitude={-74.006}
                      title="Market centers"
                    />
                    <Canvas
                      draw={(context) => {
                        const size = context.canvas;
                        context.clearRect(0, 0, size.width, size.height);
                        context.fillStyle = accentColor;
                        context.fillRect(12, 18, size.width - 24, 44);
                        context.strokeStyle = '#0f172a';
                        context.lineWidth = 3;
                        context.beginPath();
                        context.moveTo(16, size.height - 30);
                        context.lineTo(size.width * 0.35, size.height - 64);
                        context.lineTo(size.width * 0.62, size.height - 44);
                        context.lineTo(size.width - 18, size.height - 92);
                        context.stroke();
                      }}
                      height={180}
                      width={260}
                    />
                  </LazyVGrid>
                  <ViewThatFits>
                    <HStack spacing={12}>
                      <Badge>Wide layout selected</Badge>
                      <Text>ViewThatFits keeps the dashboard compact on narrow screens.</Text>
                    </HStack>
                    <VStack spacing={8}>
                      <Badge>Narrow layout selected</Badge>
                      <Text>Controls stack when space runs out.</Text>
                    </VStack>
                  </ViewThatFits>
                </Panel>
              </VStack>
            )}
          />

          <TabView
            tabBarPosition="top"
            items={[
              {
                label: 'Component lab',
                value: 'lab',
                content: (
                  <LazyVGrid columns={4} spacing={14}>
                    <ComponentTile name="Stacks">
                      <HStack spacing={8}><Badge>H</Badge><Badge>Stack</Badge></HStack>
                      <VStack spacing={6}><Badge>V</Badge><Badge>Stack</Badge></VStack>
                      <ZStack style={{ minHeight: 48 }}>
                        <RadialGradient
                          endRadius={88}
                          stops={[
                            { color: '#38bdf8', location: 0 },
                            { color: '#1d4ed8', location: 1 },
                          ]}
                        />
                        <Text style={{ color: 'white', fontWeight: 700 }}>Z</Text>
                      </ZStack>
                    </ComponentTile>
                    <ComponentTile name="Gradients">
                      <LinearGradient
                        stops={[
                          { color: '#22c55e', location: 0 },
                          { color: '#0f766e', location: 1 },
                        ]}
                        style={{ height: 70 }}
                      />
                      <AngularGradient
                        stops={[
                          { color: '#f97316', location: 0 },
                          { color: '#8b5cf6', location: 0.5 },
                          { color: '#06b6d4', location: 1 },
                        ]}
                        style={{ height: 70 }}
                      />
                    </ComponentTile>
                    <ComponentTile name="Layout modifiers">
                      <ContainerRelativeFrame axis="horizontal" count={3} span={2}>
                        <Badge>Relative frame</Badge>
                      </ContainerRelativeFrame>
                      <ScenePadding><Badge>Scene padding</Badge></ScenePadding>
                      <SafeAreaInset edge="bottom" inset={<Badge>SafeAreaInset</Badge>}>
                        <Badge>Inset content</Badge>
                      </SafeAreaInset>
                    </ComponentTile>
                    <ComponentTile name="Interaction modifiers">
                      <AllowsHitTesting enabled={false}>
                        <Button>Disabled hit test</Button>
                      </AllowsHitTesting>
                      <HoverEffect><Badge>HoverEffect</Badge></HoverEffect>
                      <TextSelection selection="enabled"><Text>Selectable text</Text></TextSelection>
                    </ComponentTile>
                    <ComponentTile name="Presentation modifiers">
                      <PresentationBackground backgroundStyle="thinMaterial">
                        <Badge>Background</Badge>
                      </PresentationBackground>
                      <PresentationCornerRadius radius={18}>
                        <Badge>Corner radius</Badge>
                      </PresentationCornerRadius>
                      <PresentationDragIndicator visibility="visible">
                        <Badge>Drag indicator</Badge>
                      </PresentationDragIndicator>
                      <PresentationCompactAdaptation adaptation="sheet">
                        <Badge>Compact sheet</Badge>
                      </PresentationCompactAdaptation>
                    </ComponentTile>
                    <ComponentTile name="Animation">
                      <ContentTransition transition="scale">
                        <Badge>{allocation}</Badge>
                      </ContentTransition>
                      <PhaseAnimator phases={['Scan', 'Price', 'Size']}>
                        {(phase) => <Badge>{phase}</Badge>}
                      </PhaseAnimator>
                      <KeyframeAnimator keyframes={['Low', 'Mid', 'High']}>
                        {(frame) => <Badge>{frame}</Badge>}
                      </KeyframeAnimator>
                      <SymbolEffect effect="pulse"><Badge>Pulse</Badge></SymbolEffect>
                    </ComponentTile>
                    <ComponentTile name="Scroll">
                      <ScrollView style={{ maxHeight: 150 }}>
                        <ScrollBounceBehavior behavior="basedOnSize">
                          <ScrollClipDisabled disabled>
                            <DefaultScrollAnchor anchor="bottom">
                              <ScrollIndicators visibility="visible">
                                <ScrollTarget scrollId="target-end">
                                  <ScrollTransition>
                                    <VStack spacing={6}>
                                      {['Audit', 'Quote', 'Submit', 'Reconcile'].map((item) => (
                                        <Badge key={item}>{item}</Badge>
                                      ))}
                                    </VStack>
                                  </ScrollTransition>
                                </ScrollTarget>
                              </ScrollIndicators>
                            </DefaultScrollAnchor>
                          </ScrollClipDisabled>
                        </ScrollBounceBehavior>
                      </ScrollView>
                    </ComponentTile>
                    <ComponentTile name="Splits">
                      <HSplitView>
                        <Badge>Left</Badge>
                        <Badge>Right</Badge>
                      </HSplitView>
                      <VSplitView>
                        <Badge>Top</Badge>
                        <Badge>Bottom</Badge>
                      </VSplitView>
                    </ComponentTile>
                    <ComponentTile name="Grouping">
                      <Group><Badge>Group</Badge></Group>
                      <VisualEffect effect="prominent"><Badge>Visual effect</Badge></VisualEffect>
                      <MatchedGeometryEffect id="demo-match" namespace="kitchensink">
                        <Badge>Matched</Badge>
                      </MatchedGeometryEffect>
                    </ComponentTile>
                    <ComponentTile name="Color and shape">
                      <Color color={accentColor} />
                      <GeometryReader>
                        {({ width }) => <Badge>{Math.round(width)}px</Badge>}
                      </GeometryReader>
                    </ComponentTile>
                    <ComponentTile name="Lazy stacks">
                      <LazyHStack spacing={6}><Badge>One</Badge><Badge>Two</Badge></LazyHStack>
                      <LazyVStack spacing={6}><Badge>Three</Badge><Badge>Four</Badge></LazyVStack>
                      <LazyHGrid rows={2} spacing={6}><Badge>A</Badge><Badge>B</Badge></LazyHGrid>
                    </ComponentTile>
                    <ComponentTile name="Operator links">
                      <NavigationStack>
                        <NavigationLink destination="risk">Risk detail</NavigationLink>
                      </NavigationStack>
                      <HelpLink href="/docs/" label="Docs help" />
                    </ComponentTile>
                  </LazyVGrid>
                ),
              },
              {
                label: 'Timeline',
                value: 'timeline',
                content: (
                  <Panel title="Timeline and unavailable states">
                    <TimelineView interval={1000}>
                      {(currentDate) => (
                        <Text>Heartbeat {currentDate.toLocaleTimeString()}</Text>
                      )}
                    </TimelineView>
                    <Unredacted>
                      <ContentUnavailableView
                        description="Shown when no replay evidence clears liquidity and slippage gates."
                        icon="!"
                        title="No promotable strategy"
                      />
                    </Unredacted>
                  </Panel>
                ),
              },
            ]}
          />

          <Button ref={popoverAnchorRef} onClick={() => setShowPopover((visible) => !visible)}>
            Toggle anchored popover
          </Button>
          <Popover
            anchorRef={popoverAnchorRef}
            isPresented={showPopover}
            matchAnchorWidth
            onDismiss={() => setShowPopover(false)}
          >
            <VStack spacing={8}>
              <Text style={{ fontWeight: 700 }}>Popover</Text>
              <Text>Anchored presentations use real page geometry.</Text>
            </VStack>
          </Popover>

          <Sheet
            isPresented={showSheet}
            onDismiss={() => setShowSheet(false)}
            presentationDetents={['medium', 'large']}
          >
            <Inspector
              content={(
                <VStack spacing={12}>
                  <Text style={{ fontWeight: 700 }}>{selectedMarket.market}</Text>
                  <LabeledContent label="Side">{selectedMarket.side}</LabeledContent>
                  <LabeledContent label="Odds">{selectedMarket.odds}%</LabeledContent>
                  <LabeledContent label="Liquidity">{selectedMarket.liquidity}</LabeledContent>
                  <Button onClick={() => setShowSheet(false)}>Close</Button>
                </VStack>
              )}
              isPresented
              title="Trade inspector"
            >
              <Text>Sheet content can host an inspector for secondary details.</Text>
            </Inspector>
          </Sheet>

          <Alert
            buttons={[
              { label: 'Acknowledge', action: () => setShowAlert(false) },
              { label: 'Open sheet', action: () => { setShowAlert(false); setShowSheet(true); } },
            ]}
            isVisible={showAlert}
            message={`Risk mode ${riskMode}; review date ${date}.`}
            onDismiss={() => setShowAlert(false)}
            title="Operator alert"
          />
          <ConfirmationDialog
            actions={[
              { label: 'Keep observe', style: 'cancel' },
              { label: 'Pause buying', style: 'destructive', action: () => setEnabled(false) },
            ]}
            isVisible={showConfirm}
            message="This demonstrates a destructive confirmation flow."
            onDismiss={() => setShowConfirm(false)}
            title="Pause strategy?"
          />

          <VideoPlayer
            aria-label="Empty video player error-state demo"
            src=""
            style={{ display: 'none' }}
          />
        </VStack>
      </SafeArea>
    </main>
  );
}
