
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/types/auth';

interface UserTableProps {
  users: User[];
  currentUser: User;
}

const UserTable: React.FC<UserTableProps> = ({ users, currentUser }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length > 0 ? (
          users.map((storeUser) => (
            <TableRow key={storeUser.id}>
              <TableCell className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={storeUser.avatar} />
                  <AvatarFallback>{storeUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{storeUser.name}</span>
              </TableCell>
              <TableCell>{storeUser.email}</TableCell>
              <TableCell className="capitalize">{storeUser.role}</TableCell>
              <TableCell>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
              No users added yet. Add your first store user.
            </TableCell>
          </TableRow>
        )}
        
        {/* Always show the admin (current user) */}
        <TableRow>
          <TableCell className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={currentUser?.avatar} />
              <AvatarFallback>{currentUser?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{currentUser?.name} (You)</span>
          </TableCell>
          <TableCell>{currentUser?.email}</TableCell>
          <TableCell>Admin</TableCell>
          <TableCell>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Active
            </span>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default UserTable;
