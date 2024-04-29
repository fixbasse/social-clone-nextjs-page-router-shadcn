import { FollowBar } from "./layout/follow-bar";
import { Sidebar } from "./layout/sidebar";

interface LayoutProps {
    children: React.ReactNode;
};

const Layout = ({
    children
}: LayoutProps) => {
    return (
        <div>

            <main className="grid grid-cols-8">
                <nav className="col-span-2 h-screen p-8">
                    <Sidebar />
                </nav>

                <div className="col-span-4 py-4 border">
                    {children}
                </div>

                <aside className="col-span-2 h-fit m-8 border rounded-xl p-4 hidden md:block bg-primary-foreground">
                    <FollowBar />
                </aside>
            </main>

        </div>
    )
}

export default Layout