import { FaHome } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/use-current-user";
import { SidebarItem } from "@/components/layout/sidebar-item";
import { TweetButton } from "@/components/layout/tweet-button";

const items = [
    {
        label: 'Home',
        href: '/',
        icon: FaHome
    },
    {
        label: 'Notifications',
        href: '/notifications',
        icon: FaRegBell
    },
    {
        label: 'Profile',
        href: '/user/123',
        icon: FaRegUser
    },
];

export const Sidebar = () => {
    const { data: currentUser } = useCurrentUser(); // useSession()

    return (
        <div className="flex flex-col max-md:items-center gap-6">
            {items.map((item) => (
                <SidebarItem
                    key={item.href}
                    label={item.label}
                    href={item.href}
                    icon={item.icon}
                />
            ))}

            {currentUser && (
                <SidebarItem
                    icon={CiLogout}
                    label="Signout"
                    onClick={() => signOut()}
                />
            )}


            <TweetButton />
        </div>
    )
}
