import { useRouter } from "next/navigation";
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
        <div className="flex items-center gap-4">

            {showBackArrow && (
                <BiArrowBack
                    onClick={handleBack}
                />
            )}

            <h3>
                {label}
            </h3>
        </div>
    )
};
