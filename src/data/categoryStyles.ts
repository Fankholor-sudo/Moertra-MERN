import {
  BriefcaseBusiness,
  Construction,
  Droplets,
  type LucideIcon,
  PaintRoller,
  Sparkles,
  Wrench,
} from 'lucide-react-native'
import { Category } from '../types'

type CategoryStyle = {
  icon: LucideIcon
  tint: string
}

export const CATEGORY_STYLES: Record<Category, CategoryStyle> = {
  Construction: { icon: Construction, tint: '#b07a2a' },
  Electrical: { icon: Sparkles, tint: '#3d6be0' },
  Automotive: { icon: Wrench, tint: '#5c6a7e' },
  Fabrication: { icon: BriefcaseBusiness, tint: '#c0584d' },
  Plumbing: { icon: Droplets, tint: '#1f8a9a' },
  Painting: { icon: PaintRoller, tint: '#3d8a5a' },
}
