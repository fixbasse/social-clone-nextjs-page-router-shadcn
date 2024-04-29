import { useRouter } from "next/router";
import { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";

interface HeaderProps {
    label?: string;
    showBackArrow?: boolean;
};

export const Header = ({
    label,
    showBackArrow
}: HeaderProps) => {
    const router = useRouter();

    const handleBack = useCallback(() => {
        router.back();
    }, [router]);

    return (
        <div className="flex items-center gap-4 px-4">

            <div className="cursor-pointer">
                {showBackArrow && (
                    <BiArrowBack
                        onClick={handleBack}
                    />
                )}
            </div>

            <h3 className="font-bold text-2xl">
                {label}
            </h3>
        </div>
    )
};
