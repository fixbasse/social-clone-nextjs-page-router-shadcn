import { useCallback, useMemo } from "react";
import dayjs from 'dayjs'
import 'dayjs/locale/th'

import useCurrentUser from "@/hooks/use-current-user";
import useUser from "@/hooks/use-user";
import { Button } from "@/components/ui/button";
import { BiCalendar } from "react-icons/bi";
import useEditModal from "@/hooks/use-edit-modal";

interface UserBioProps {
  userId: string;
};

export const UserBio = ({
  userId
}: UserBioProps) => {
  const editHook = useEditModal();
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);

  const onClick = useCallback(() => {
    editHook.onOpen();
  }, [editHook]);

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    };

    return dayjs(new Date(fetchedUser.createdAt)).format('MMMM-YYYY');
  }, [fetchedUser?.createdAt]);

  return (
    <div className="p-4 border-b">

      <span className="flex justify-end mb-4">
        {currentUser?.id === userId ? (
          <Button onClick={onClick}>
            Edit
          </Button>
        ) : (
          <Button>
            Follow
          </Button>
        )}
      </span>

      {/* USER DATA CONTENT ==========> */}
      <div>
        {/* NAME & USERNAME */}
        <span>
          <h4 className="font-bold text-2xl">
            {fetchedUser?.name}
          </h4>
          <h6 className="text-muted-foreground text-sm">
            @{fetchedUser?.username}
          </h6>
        </span>

        {/* BIO */}
        <p className="text-sm">
          {fetchedUser?.bio}
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Eius nulla blanditiis non velit laborum, eaque dolore
          necessitatibus beatae ipsa, pariatur animi. Iusto iste
          optio animi corporis? Totam sed dolorum officiis?
        </p>

        <section className="text-muted-foreground mt-4">
          {/* JoinedAt */}
          <div className="flex items-center gap-1">
            <BiCalendar />

            <h6 className="text-sm">
              Joined {createdAt}
            </h6>
          </div>

          {/* Follows */}
          <div className="flex items-center gap-2 text-sm mt-2">
            <span className="flex items-center gap-1">
              <h6 className="text-primary">
                {fetchedUser?.followingIds.length}
              </h6>

              Followings
            </span>

            <span className="flex items-center gap-1">
              <h6 className="text-primary">
                {fetchedUser?.followerCount?.length || 0}
              </h6>

              Followers
            </span>
          </div>
        </section>
      </div>

    </div>
  )
}
