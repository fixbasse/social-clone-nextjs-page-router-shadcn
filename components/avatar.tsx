import { useCallback } from "react";
import useUser from "@/hooks/use-user";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaRegUserCircle } from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi2";

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
    //  const router = useRouter();
    const { data: fetchedUser } = useUser(userId);

    // const onClick = useCallback((e: any) => {
    //     e.stopPropagation();

    //     const url = `/users/${userId}`;
    //     router.push(url);
    // }, [router, userId]);


    return (
        <div className="cursor-pointer">
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
                <HiUserCircle size={40} />
            )}

        </div>
    )
}
