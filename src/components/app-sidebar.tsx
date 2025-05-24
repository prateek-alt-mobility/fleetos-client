'use client';

import * as React from 'react';
import {
  Home,
  Car,
  AudioWaveform,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
// import { NavProjects } from '@/components/nav-projects';
import { NavUser } from '@/components/nav-user';
// import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import Image from 'next/image';

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Home',
      url: '/',
      icon: Home,
      isActive: true,
    },
    {
      title: 'Fleet Partners',
      url: '/fleet-partners',
      icon: Bot,
      items: [
        {
          title: 'Customers',
          url: '/fleet-partners/customers',
        },
        {
          title: 'Fleet Requests',
          url: '/fleet-partners/fleet-requests',
        },
      ],
    },
    {
      title: 'Fleet',
      url: '#',
      icon: Car,
      items: [
        {
          title: 'Map',
          url: '/fleet/map',
        },
        {
          title: 'Vehicles',
          url: '/fleet/vehicles',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        {state === 'collapsed' ? (
          <Image src="/mini-logo.svg" alt="mini logo" width={36} height={36} />
        ) : (
          <Image src="/logo.svg" alt="logo" width={168} height={36} />
        )}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
