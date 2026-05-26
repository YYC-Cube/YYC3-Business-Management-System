import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "YYC³ Business Management System",
  description: "万象归元于云枢，深栈智启新纪元 - 企业级智能商务管理系统",
  keywords: "YYC³,Business Management,商务管理,智能平台,企业管理",
  authors: [{ name: "YYC³ Team" }],
  icons: {
    icon: "/yyc3-icons/Web App/favicon-32.png",
    shortcut: "/yyc3-icons/Web App/favicon-16.png",
    apple: "/yyc3-icons/Web App/apple-touch-icon.png",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
