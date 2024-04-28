import { Button } from "../ui/button"


export const TweetButton = () => {
    return (
        <>
            <Button className="max-md:hidden p-2 bg-primary rounded-full font-semibold text-center">
                Tweet
            </Button>
            <Button className="md:hidden h-[40px] w-[40px] bg-primary rounded-full">
                
            </Button>
        </>
    )
}
