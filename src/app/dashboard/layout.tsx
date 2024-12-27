'use client'
import React from "react"
import DashboardLayout from "../component/layout/DashboardLayout"

export default function BlogLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <DashboardLayout>
            <section>{children}</section>
        </DashboardLayout>
    )
  }