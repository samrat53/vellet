"use client"

import { Calendar, Home, Inbox, Search } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import SidebarHeader from "./ui/sidebar-header"
import { signOut } from "next-auth/react"
import { Button } from "./ui/button"
import { redirect } from "next/navigation"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Send to friend",
    url: "/sendMoney",
    icon: Inbox,
  },
  {
    title: "Recharge Wallet",
    url: "/recharge-wallet",
    icon: Calendar,
  },
  {
    title: "Recharge bank",
    url: "/recharge-bank",
    icon: Search,
  },
]

export function AppSidebar() {

  const handleSignout = async () => {
    await signOut();
    redirect('/api/auth/signin')
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <SidebarHeader/>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button onClick={handleSignout}>Sign Out</Button>
      </SidebarFooter>
    </Sidebar>
  )
}
