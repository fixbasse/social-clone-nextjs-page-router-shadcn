import useCurrentUser from "@/hooks/use-current-user";
import useLoginModal from "@/hooks/use-login-modal";
import usePosts from "@/hooks/use-posts";
import useRegisterModal from "@/hooks/use-register-modal";
import { useCallback, useState } from "react";
import { useToast } from "./ui/use-toast";
import axios from "axios";
import { Button } from "./ui/button";
import { Avatar } from "./avatar";

interface FormProps {
    placeholder?: string;
    isComment?: boolean;
    postId?: string;
};

export const Form = ({
    placeholder,
    isComment,
    postId
}: FormProps) => {
    const { toast } = useToast();
    const registerHook = useRegisterModal();
    const loginHook = useLoginModal();

    const { data: currentUser } = useCurrentUser();
    const { mutate: mutatePosts } = usePosts();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [body, setBody] = useState<string>('');

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            await axios.post('/api/posts', {
                body
            });

            setBody(''); // reset
            mutatePosts(); // load new data
            toast({ title: 'You are sign in!' });
        } catch (error) {
            console.log(error);
            toast({ title: 'Something went wrong, please try again.' });
        } finally {
            setIsLoading(false);
        };
    }, [body, mutatePosts, toast]);

    return (
        <div className="bg-primary-foreground p-4">

            {currentUser ? (
                <div className="flex flex-col gap-4">

                    <div className="flex gap-4">
                        <Avatar userId={currentUser?.id} />

                        <textarea
                            className=" outline-none focus:ring-0 bg-transparent w-full border p-2"
                            placeholder={placeholder}
                        />
                    </div>

                    <Button className="ml-auto">
                        Tweet
                    </Button>
                </div>
            ) : (
                <div className="flex flex-col gap-2 items-center">
                    <h3 className="font-bold text-xl">
                        Welcome to ActivePeople
                    </h3>
                    <span className="space-x-2">
                        <Button onClick={loginHook.onOpen} variant='primary' className="rounded-full">
                            Login
                        </Button>
                        <Button onClick={registerHook.onOpen} className="rounded-full">
                            Register
                        </Button>
                    </span>
                </div>
            )}


        </div>
    )
}
