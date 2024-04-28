import { FaHome } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa6";
import { SidebarItem } from "./sidebar-item"
import { TweetButton } from "./tweet-button";
import { CiLogout } from "react-icons/ci";

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
    return (
        <nav>

            <div className="flex flex-col max-md:items-center gap-6">
                {items.map((item) => (
                    <SidebarItem
                        key={item.href}
                        label={item.label}
                        href={item.href}
                        icon={item.icon}
                    />
                ))}

                <SidebarItem
                    icon={CiLogout}
                    label="Signout"
                />
                <TweetButton />
            </div>

        </nav>
    )
}
