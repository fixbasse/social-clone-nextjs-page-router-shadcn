import { Header } from "@/components/header"
import useUser from "@/hooks/use-user";
import { useRouter } from "next/router"
import { UserHero } from "./_components/user-hero";

const UserViewPage = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data: fetchedUser, isLoading } = useUser(userId as string);
  console.log(fetchedUser);


  if (isLoading || !fetchedUser) {
    return (
      <div>
        Loading...
      </div>
    )
  };

  return (
    <div className="flex flex-col gap-4">
      <Header
        label={fetchedUser?.name}
        showBackArrow
      />

      <UserHero userId={userId as string} />
    </div>
  )
}

export default UserViewPage