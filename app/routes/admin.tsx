import { Outlet } from "@remix-run/react";
import { Icon } from '@iconify/react';

export default function Admin() {
  return (
    <main className="flex h-screen">
      <div className="w-2/12 bg-white min-w-260 p-6 drop-shadow-md">
        Sidenav
        <Icon icon="mdi-light:home" />
      </div>
      <div className="bg-slate-50 flex-1 p-12">
        <Outlet />
      </div>
    </main>
  );
}
