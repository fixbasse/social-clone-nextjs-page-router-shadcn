import { useCallback } from "react";
import useUser from "@/hooks/use-user";
import Image from "next/image";
import { HiUserCircle } from "react-icons/hi2";
import { useRouter } from "next/navigation";

interface AvatarProps {
    userId: string;
    isLarge?: boolean;
    hasBorder?: boolean;
};

export const Avatar = ({
    userId,
    isLarge,
    hasBorder
}: AvatarProps) => {
    const router = useRouter();
    const { data: fetchedUser } = useUser(userId);

    const onClick = useCallback((e: any) => {
        e.stopPropagation();

        const url = `/users/${userId}`;
        router.push(url);
    }, [router, userId]);

    return (
        <div
            onClick={onClick}
            className="cursor-pointer"
        >
            {fetchedUser?.profileImage ? (
                <div className="relative">
                    <Image
                        src={fetchedUser.profileImage}
                        fill
                        className="object-cover rounded-full"
                        alt="avatar"
                    />
                </div>
            ) : (
                <HiUserCircle
                    size={isLarge ? '120' : '40'}
                    className={hasBorder ? 'border-4 rounded-full' : ''}
                />
            )}

        </div>
    )
}
