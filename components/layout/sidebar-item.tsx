import { IconType } from "react-icons";


interface SidebarItemProps {
    label: string;
    href?: string;
    icon: IconType;
};

export const SidebarItem = ({
    label,
    href,
    icon: Icon
}: SidebarItemProps) => {
    return (
        <div className="flex items-center gap-2 text-sm">
            <Icon
                size={20}
            />

            <h4 className="hidden md:block">
                {label}
            </h4>
        </div>
    )
}
