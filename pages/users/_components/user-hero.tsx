import { Avatar } from "@/components/avatar";
import useUser from "@/hooks/use-user";
import Image from "next/image";

interface UserHeroProps {
    userId: string;
};

export const UserHero = ({
    userId
}: UserHeroProps) => {
    const { data: fetchedUser } = useUser(userId);

    return (
        <div>
            <div className="h-[200px] relative bg-primary-foreground">
                {fetchedUser?.coverImage && (
                    <Image
                        src={fetchedUser.coverImage}
                        fill
                        alt="coverImg"
                        className="object-cover"
                    />
                )}

                <div className="absolute -bottom-14 left-6">
                    <Avatar
                        userId={userId}
                        isLarge
                        hasBorder
                    />
                </div>
            </div>
        </div>
    )
}
