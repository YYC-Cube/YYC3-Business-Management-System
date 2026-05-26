"use client"

import { SeasonalThemeProvider } from "@/components/design-system/seasonal-themes"
import EnhancedAdminDashboard from "@/enhanced-admin-dashboard"

export default function HomePage() {
  return (
    <SeasonalThemeProvider defaultSeason="spring" defaultAutoDetect={true}>
      <EnhancedAdminDashboard />
    </SeasonalThemeProvider>
  )
}
