import { Sidebar } from "./layout/side-bar";

interface LayoutProps {
    children: React.ReactNode;
};

const Layout = ({
    children
}: LayoutProps) => {
    return (
        <div className="max-sm:p-4 p-8">

            <main className="grid grid-cols-8 gap-8">
                <aside className="col-span-2 border rounded-xl  p-4">
                    <Sidebar />
                </aside>
                <div className="col-span-6">
                    {children}
                </div>
            </main>
            
        </div>
    )
}

export default Layout