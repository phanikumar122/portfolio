import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const hero = document.getElementById('top')
    if (!hero || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting))
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])
  if (!visible) return null
  return <a className="studio-back-to-top" href="#top" aria-label="Back to top"><ArrowUp size={19} /><span>Back to top</span></a>
}
