'use client';

import Link from 'next/link';
import { useId, useMemo, useState } from 'react';
import { Alert, Button, Card, ConfirmationDialog, DisclosureGroup, Divider, Form,
  HStack, LabeledContent, NavigationSplitView, Picker, ProgressView, Section, Sheet,
  UIProvider, Glass, Slider, Spacer, ScrollView, LazyVStack, Text, TextEditor, TextField, Toggle, VStack } from '@swiftuijs/ui';
import './kitchensink.css';

const projects = Array.from({ length: 1000 }, (_, index) => `Project ${String(index + 1).padStart(4, '0')}`);

const initialPreferences = { name: 'Studio workspace', email: 'hello@example.com',
  notes: 'A little space for thoughtful work.', notifications: true, density: 60, language: 'en' };

export function KitchensinkClient() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [glassEnabled, setGlassEnabled] = useState(false);
  const [glassIntensity, setGlassIntensity] = useState(0.6);
  const glass = useMemo(() => ({ enabled: glassEnabled, intensity: glassIntensity }), [glassEnabled, glassIntensity]);
  const [preferences, setPreferences] = useState(initialPreferences);
  const [saved, setSaved] = useState(initialPreferences);
  const [reviewing, setReviewing] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const fieldId = useId();
  const changed = JSON.stringify(preferences) !== JSON.stringify(saved);
  const update = <K extends keyof typeof preferences>(key: K, value: typeof preferences[K]) =>
    setPreferences(current => ({ ...current, [key]: value }));

  const summary = (
    <VStack spacing={20} alignment="leading" className="kitchen-full-width">
      <div><p className="kitchen-eyebrow">Live preview</p><h2>{preferences.name || 'Your workspace'}</h2></div>
      <Text>{preferences.notes || 'Add a short description to make this space yours.'}</Text>
      <Divider />
      <LabeledContent label="Email" value={preferences.email || '—'} />
      <LabeledContent label="Notifications" value={preferences.notifications ? 'Enabled' : 'Paused'} />
      <LabeledContent label="Language" value={preferences.language === 'en' ? 'English' : '简体中文'} />
      <ProgressView label="Interface density" value={preferences.density} total={100} currentValueLabel={`${preferences.density}%`} />
      <DisclosureGroup label="About this demo">
        <p className="kitchen-muted">Changes stay in this page. Edit the form, review your settings, then save or reset them. Explore individual components in the reference.</p>
      </DisclosureGroup>
      <Link href="/docs/components/">Explore the component reference →</Link>
    </VStack>
  );

  return (
    <UIProvider theme={theme} glass={glass}><div className="kitchen-workspace">
      <header><Glass className="kitchen-header">
        <Link href="/">SwiftUI.js</Link>
        <HStack spacing={16}><Link href="/docs/getting-started/">Get started</Link><Link href="/docs/concepts/capability-matrix/">Capabilities</Link></HStack>
      </Glass></header>
      <section className="kitchen-intro">
        <p className="kitchen-eyebrow">Kitchensink · Core components</p>
        <h1>A small workspace, made yours.</h1>
        <p className="kitchen-muted">Native form controls, adaptive navigation and focused dialogs. Try them together.</p>
      </section>
      <section className="kitchen-appearance">
        <DisclosureGroup label="Appearance options">
          <div className="kitchen-appearance-controls">
            <label htmlFor={`${fieldId}-theme`}>Theme</label>
            <Picker id={`${fieldId}-theme`} selection={theme} onSelectionChange={value => setTheme(value as typeof theme)} options={[{ label: 'System', value: 'system' }, { label: 'Light', value: 'light' }, { label: 'Dark', value: 'dark' }]} />
            <label htmlFor={`${fieldId}-glass`}>Liquid Glass</label>
            <Toggle id={`${fieldId}-glass`} isOn={glassEnabled} onChange={setGlassEnabled} />
            <label htmlFor={`${fieldId}-glass-intensity`}>Glass intensity</label>
            <Slider id={`${fieldId}-glass-intensity`} min={0} max={1} step={0.1} value={glassIntensity} disabled={!glassEnabled} onValueChange={setGlassIntensity} />
          </div>
        </DisclosureGroup>
      </section>
      <NavigationSplitView defaultCompactColumn="content"
        sidebar={<VStack spacing={20} alignment="leading" className="kitchen-full-width">
          <div className="kitchen-monogram" aria-hidden="true">S</div>
          <div><h2>Studio</h2><Text>Personal workspace</Text></div>
          <Divider />
          <p className="kitchen-eyebrow">Settings</p>
          <p className="kitchen-selected">Workspace preferences</p>
          <Link href="/docs/components/">Component reference</Link>
          <Link href="/docs/concepts/responsive-design/">Responsive layouts</Link>
          <Spacer />
          <p className="kitchen-muted">One composition, from phone to desktop.</p>
        </VStack>}
        content={<Form onSubmit={event => { event.preventDefault(); setReviewing(true); }} className="kitchen-form">
          <Section header={<h2>Preferences</h2>}>
            <p className="kitchen-muted">A few details to make this workspace feel like home.</p>
            <label htmlFor={`${fieldId}-name`}>Workspace name</label>
            <TextField id={`${fieldId}-name`} name="workspace" value={preferences.name} required onChange={event => update('name', event.target.value)} />
            <label htmlFor={`${fieldId}-email`}>Email address</label>
            <TextField id={`${fieldId}-email`} name="email" type="email" required value={preferences.email} onChange={event => update('email', event.target.value)} />
            <label htmlFor={`${fieldId}-notes`}>Description</label>
            <TextEditor id={`${fieldId}-notes`} rows={3} value={preferences.notes} onValueChange={value => update('notes', value)} />
          </Section>
          <Divider />
          <Section header={<h3>Make it comfortable</h3>}>
            <label htmlFor={`${fieldId}-language`}>Language</label>
            <Picker id={`${fieldId}-language`} selection={preferences.language} onSelectionChange={value => update('language', String(value))}
              options={[{ label: 'English', value: 'en' }, { label: '简体中文', value: 'zh' }]} />
            <div className="kitchen-setting-row"><label htmlFor={`${fieldId}-notifications`}>Email notifications</label>
              <Toggle id={`${fieldId}-notifications`} isOn={preferences.notifications} onChange={value => update('notifications', value)} /></div>
            <label htmlFor={`${fieldId}-density`}>Interface density <span className="kitchen-muted">{preferences.density}%</span></label>
            <Slider id={`${fieldId}-density`} value={preferences.density} min={20} max={100} step={10} onValueChange={value => update('density', value)} />
          </Section>
          <HStack spacing={12} className="kitchen-actions">
            <Button type="submit" buttonStyle="borderedProminent" disabled={!changed}>Review changes</Button>
            <Button onClick={() => setResetting(true)}>Reset</Button>
          </HStack>
          <p role="status" className="kitchen-muted">{changed ? 'You have unsaved changes.' : 'Everything is up to date.'}</p>
        </Form>}
        detail={<Card className="kitchen-preview">{summary}</Card>}
      />
      <section className="kitchen-collection">
        <DisclosureGroup label="Browse 1,000 projects">
          <ScrollView style={{ height: 280 }} tabIndex={0} role="region" aria-label="Projects">
            <LazyVStack estimatedItemHeight={48} alignment="leading">
              {projects.map(project => <div key={project} className="kitchen-project"><span>{project}</span><span className="kitchen-muted">Active</span></div>)}
            </LazyVStack>
          </ScrollView>
        </DisclosureGroup>
      </section>
      <Sheet title="Review workspace settings" isPresented={reviewing} onDismiss={() => setReviewing(false)} presentationStyle="formSheet" presentationDetents={['medium', 'large']}>
        <VStack spacing={20} alignment="leading" className="kitchen-full-width">
          <h2>Review your changes</h2><Text>Save these preferences for this demo session.</Text>
          <LabeledContent label="Workspace" value={preferences.name} />
          <LabeledContent label="Email" value={preferences.email} />
          <HStack spacing={12} className="kitchen-actions">
            <Button buttonStyle="borderedProminent" onClick={() => { setSaved({ ...preferences }); setReviewing(false); setConfirmed(true); }}>Save preferences</Button>
            <Button onClick={() => setReviewing(false)}>Keep editing</Button>
          </HStack>
        </VStack>
      </Sheet>
      <ConfirmationDialog title="Reset preferences?" message="Your edits will be replaced with the demo defaults." isVisible={resetting} onDismiss={() => setResetting(false)}
        actions={[{ label: 'Reset preferences', style: 'destructive', action: () => { setPreferences(initialPreferences); setSaved(initialPreferences); } }, { label: 'Cancel', style: 'cancel' }]} />
      <Alert title="Preferences saved" message="Your workspace is ready. Changes are stored for this demo session." isVisible={confirmed} onDismiss={() => setConfirmed(false)} />
      <footer className="kitchen-footer"><Text>Small pieces. Thoughtful composition.</Text><Link href="/docs/">Read the docs →</Link></footer>
    </div></UIProvider>
  );
}
