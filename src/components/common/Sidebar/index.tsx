'use client';

import * as React from 'react';
import {
  Home,
  Car,
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  ChartBar,
  Wrench,
  FileText,
  ListChecks,
  IndianRupee,
  Database,
  Warehouse,
  Handshake,
  ReceiptText,
} from 'lucide-react';

import { NavMain } from '@/components/common/Sidebar/nav-main';
import { NavUser } from '@/components/common/Sidebar/nav-user';
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
    avatar: '/mini-logo.svg',
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
      icon: Handshake,
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
    {
      title: 'Asset Analytics',
      url: '/asset-analytics',
      icon: ChartBar,
    },
    {
      title: 'Service',
      url: '/service',
      icon: Wrench,
      items: [
        {
          title: 'Service Due',
          url: '/service/service-due',
        },
        {
          title: 'Service Logs',
          url: '/service/service-logs',
        },
      ],
    },
    {
      title: 'Reports',
      url: '/reports',
      icon: FileText,
      items: [
        {
          title: 'Extra Usage',
          url: '/reports/extra-usage',
        },
        {
          title: 'Challan Report',
          url: '/reports/challan-report',
        },
        {
          title: 'Usage Report',
          url: '/reports/usage-report',
        },
      ],
    },
    {
      title: 'Delivery Challan',
      url: '/delivery-challan',
      icon: ReceiptText,
      items: [
        {
          title: 'IoT Connectivity',
          url: '/delivery-challan/iot-connectivity',
        },
        {
          title: 'Mock Vehicle Connectivity',
          url: '/delivery-challan/mock-vehicle-connectivity',
        },
        {
          title: 'Vehicle Connectivity',
          url: '/delivery-challan/vehicle-connectivity',
        },
        {
          title: 'Vehicle Stock',
          url: '/delivery-challan/vehicle-stock',
        },
        {
          title: 'RRRR',
          url: '/delivery-challan/rrrr',
        },
      ],
    },
    {
      title: 'Audit',
      url: '/audit',
      icon: ListChecks,
    },
    {
      title: 'Expenses',
      url: '/expenses',
      icon: IndianRupee,
    },
    {
      title: 'Hubs',
      url: '/hubs',
      icon: Warehouse,
    },
    {
      title: 'Big Query Import',
      url: '/big-query-import',
      icon: Database,
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
          <Image src="/mini-logo.svg" alt="mini logo" width={36} height={36} priority />
        ) : (
          <div className="pl-3">
            <Image src="/logo.svg" alt="logo" width={120} height={36} priority />
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
