import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="mx-auto flex h-screen flex-col justify-between">
      <Navbar />
      <main className="flex h-[calc(100%-64px)] flex-col">{children}</main>
    </div>
  );
};

export default Layout;
