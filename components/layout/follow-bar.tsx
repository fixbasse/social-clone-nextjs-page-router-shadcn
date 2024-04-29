import useUsers from '@/hooks/use-users'
import { User } from '@prisma/client';
import { Avatar } from '../avatar';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import Link from 'next/link';

export const FollowBar = () => {
  const router = useRouter();
  const { data: users = [] } = useUsers();

  if (users.lenght === 0) {
    return null;
  };

  return (
    <div>
      <h3 className='font-bold mb-4'>
        Who to follow?
      </h3>

      <div className='flex flex-col gap-2'>
        {users.map((user: User) => (
          <div
            key={user.id}
            className='flex gap-x-4 items-center'
          >
            <Avatar userId={user.id} />

            <span>
              <h5>{user.name}</h5>

              <h4 className='text-sm text-muted-foreground'>
                @{user.username}
              </h4>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
