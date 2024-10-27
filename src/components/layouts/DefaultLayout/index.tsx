// src/components/layout/DefaultLayout/index.tsx
import { ReactNode } from "react";
import { Header, TopHeader } from "./components/Header";
import Footer from "./components/Footer";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopHeader />

      <Header />
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default DefaultLayout;
