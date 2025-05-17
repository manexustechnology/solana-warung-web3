
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/types/auth';

interface UserProfileProps {
  user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="flex flex-col px-4 py-2">
      <div className="flex items-center space-x-3 rounded-lg bg-muted p-3">
        <Avatar>
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
          <p className="text-xs font-medium capitalize bg-primary/10 text-primary px-2 py-0.5 rounded-full inline-block">
            {user.role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
