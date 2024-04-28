import { FollowBar } from "./layout/follow-bar";
import { Sidebar } from "./layout/sidebar";

interface LayoutProps {
    children: React.ReactNode;
};

const Layout = ({
    children
}: LayoutProps) => {
    return (
        <div className="max-[425px]:p-4 p-8">

            <main className="grid grid-cols-8 gap-8">
                <nav className="col-span-2 border rounded-xl p-4">
                    <Sidebar />
                </nav>

                <div className="col-span-4">
                    {children}
                </div>

                <aside className="col-span-2 border rounded-xl p-4 hidden md:block">
                    <FollowBar />
                </aside>
            </main>

        </div>
    )
}

export default Layout