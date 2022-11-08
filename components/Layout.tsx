import React from 'react';
import Header from './Header';

export default function Layout(props: any) {
  const { children } = props;
  return (
    <div className="flex flex-col min-h-screen relative text-white">
      <Header />
      <main className="flex-1 flex-column ">{children}</main>
    </div>
  );
}
