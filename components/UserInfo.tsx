import { signOut, useSession } from "next-auth/react";

export default function UserInfo() {
    const {data}  = useSession()
  return (
    <div className="flex items-center">
      <p className="mr-2">{data?.user?.name}</p>
      <button
      onClick={() => signOut({callbackUrl: "/login"})}
      className="text-sm text-red-500 cursor-pointer">Logout</button>
    </div>
  );
}