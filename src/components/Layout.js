import React from 'react';
import Footer from './Footer';

const Layout = ({ children, headerContent }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header>{headerContent}</header>

      {/* Main Content */}
      <main className="flex-1 p-4">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
