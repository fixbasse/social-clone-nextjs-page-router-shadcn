import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";


interface SidebarItemProps {
    label: string;
    href?: string;
    icon: IconType;
    onClick?: () => void;
};

export const SidebarItem = ({
    label,
    href,
    icon: Icon,
    onClick
}: SidebarItemProps) => {
    const router = useRouter();

    const handleClick = useCallback(() => {
        if (onClick) {
            return onClick();
        };

        if (href) {
            router.push(href);
        };

    }, [onClick, href, router]);

    return (
        <div
            onClick={handleClick}
            className="flex items-center gap-2 text-sm cursor-pointer"
        >
            <Icon size={20} />

            <h4 className="hidden md:block">
                {label}
            </h4>
        </div>
    )
}
