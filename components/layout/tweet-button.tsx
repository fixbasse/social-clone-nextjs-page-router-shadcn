import { useCallback } from "react";
import { useRouter } from "next/navigation";
import useLoginModal from "@/hooks/use-login-modal";

import { Button } from "../ui/button"
import { MdMarkUnreadChatAlt } from "react-icons/md";

export const TweetButton = () => {
    const router = useRouter();
    const loginHook = useLoginModal();

    const onClick = useCallback(() => {
        loginHook.onOpen();
    }, [loginHook]);

    return (
        <>
            <Button
                variant='primary'
                onClick={onClick}
                className="max-md:hidden p-2 text-primary rounded-full font-bold text-center">
                Tweet
            </Button>

            <button
                onClick={onClick}
                className="md:hidden h-[40px] w-[40px] bg-pink-600 text-primary rounded-full flex items-center justify-center">
                <MdMarkUnreadChatAlt
                    size={20}
                    className="absolute bg-background"
                />
            </button>
        </>
    )
}
