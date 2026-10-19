import { ArrowUpRight, Bot, FileText, Hand, LockKeyhole, Route, Sparkles } from 'lucide-react'
import type { ProjectVisual as ProjectVisualType } from '../data/portfolio'

interface ProjectVisualProps {
  type: ProjectVisualType
  compact?: boolean
}

function MiniLine({ width, className = '' }: { width: string; className?: string }) {
  return <span className={`mini-line ${className}`} style={{ width }} />
}

export function ProjectVisual({ type, compact = false }: ProjectVisualProps) {
  return (
    <div className={`project-visual project-visual--${type} ${compact ? 'project-visual--compact' : ''}`} data-visual={type} aria-hidden="true">
      {type === 'mentora' && (
        <>
          <div className="visual-window-bar"><span /><span /><span /><b>mentora / portal</b></div>
          <div className="mentora-layout">
            <div className="visual-sidebar"><MiniLine width="62%" /><MiniLine width="82%" /><MiniLine width="52%" /><MiniLine width="70%" /></div>
            <div className="mentora-main">
              <div className="visual-kicker">Good morning, student</div>
              <div className="visual-title">Your academic<br /><em>workspace.</em></div>
              <div className="visual-stat-row"><div><small>attendance</small><strong>↗ tracking</strong></div><div><small>assignments</small><strong>04 active</strong></div></div>
              <div className="message-stream"><span className="stream-dot" /><span>New discussion in Data Structures</span><ArrowUpRight size={13} /></div>
            </div>
          </div>
        </>
      )}
      {type === 'transport' && (
        <>
          <div className="transport-label"><Route size={14} /> DEMAND / MULTI-MODAL</div>
          <div className="transport-chart">
            <div className="chart-y"><span>high</span><span>low</span></div>
            <div className="chart-bars"><i style={{ height: '47%' }} /><i style={{ height: '72%' }} /><i style={{ height: '38%' }} /><i style={{ height: '86%' }} /><i style={{ height: '62%' }} /><i style={{ height: '94%' }} /><i style={{ height: '55%' }} /><i style={{ height: '76%' }} /></div>
            <svg viewBox="0 0 300 100" preserveAspectRatio="none"><path d="M0 65 C30 51, 38 73, 63 53 S90 37, 116 57 S145 73, 170 41 S203 33, 224 42 S262 67, 300 14" /></svg>
            <div className="chart-x"><span>bus</span><span>rail</span><span>air</span><span>route signal</span></div>
          </div>
        </>
      )}
      {type === 'goodfind' && (
        <>
          <div className="goodfind-top"><span>GOODFIND</span><span>store / 004</span><span>bag (02)</span></div>
          <div className="goodfind-copy"><small>THE NEW EVERYDAY</small><strong>Objects<br />with a point<br /><i>of view.</i></strong><span className="visual-button-cta">explore collection <ArrowUpRight size={13} /></span></div>
          <div className="goodfind-product-grid"><div className="product product--one"><span>01</span><b>arc lamp</b></div><div className="product product--two"><span>02</span><b>linen form</b></div><div className="product product--three"><span>03</span><b>stoneware</b></div></div>
        </>
      )}
      {type === 'docviewer' && (
        <>
          <div className="docviewer-header"><FileText size={16} /><span>local library</span><LockKeyhole size={14} /></div>
          <div className="docviewer-grid"><div className="doc-card doc-card--pdf"><span>PDF</span><strong>brief.pdf</strong><small>2.4 MB</small></div><div className="doc-card doc-card--doc"><span>MD</span><strong>notes.md</strong><small>edited today</small></div><div className="doc-card doc-card--csv"><span>CSV</span><strong>routes.csv</strong><small>48 rows</small></div><div className="doc-card doc-card--img"><span>IMG</span><strong>cover.svg</strong><small>vector</small></div></div>
          <div className="docviewer-foot"><span>everything stays here</span><LockKeyhole size={12} /></div>
        </>
      )}
      {type === 'rehabilitation' && (
        <>
          <div className="glove-label"><Hand size={16} /> SENSOR LOOP / 06</div>
          <div className="glove-graphic"><div className="glove-palm" /><i className="finger finger--1" /><i className="finger finger--2" /><i className="finger finger--3" /><i className="finger finger--4" /><i className="finger finger--5" /><div className="pulse pulse--a" /><div className="pulse pulse--b" /></div>
          <div className="glove-readings"><span><small>flex</small> 38°</span><span><small>pressure</small> 0.42</span><span><small>bluetooth</small> paired</span></div>
        </>
      )}
      {type === 'syllabus' && (
        <>
          <div className="syllabus-header"><span>syllabi.ai</span><span>your next 7 days</span></div>
          <div className="syllabus-layout"><div className="syllabus-ring"><div><strong>62</strong><small>% mapped</small></div></div><div className="syllabus-list"><div className="syllabus-item is-done"><span>01</span><b>Foundations</b><i>done</i></div><div className="syllabus-item is-active"><span>02</span><b>Data structures</b><i>next</i></div><div className="syllabus-item"><span>03</span><b>Systems thinking</b><i>queued</i></div></div></div>
          <div className="ai-note"><Bot size={14} /> plan generated from your syllabus</div>
        </>
      )}
      {type === 'skilltern' && (
        <>
          <div className="skilltern-header"><span>match engine</span><span>student / profile 01</span></div>
          <div className="match-orbit"><div className="match-center"><Sparkles size={15} /><strong>match</strong></div><div className="match-chip chip--one">React</div><div className="match-chip chip--two">Node.js</div><div className="match-chip chip--three">location</div><div className="match-chip chip--four">eligibility</div></div>
          <div className="skilltern-foot"><span><b>transparent</b> rules</span><span>skills → fit → apply <ArrowUpRight size={12} /></span></div>
        </>
      )}
      <span className="visual-spotlight" />
      <span className="visual-ambient visual-ambient--one" />
      <span className="visual-ambient visual-ambient--two" />
      <span className="visual-sheen" />
    </div>
  )
}
