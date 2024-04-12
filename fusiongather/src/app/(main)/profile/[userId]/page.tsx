'use client'
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import getSession from "@/lib/actions/getSession";
import { getUserProfile } from "@/lib/actions/profile";
import { get } from "http";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import UpdateProfileModal from "../updateProfile/UpdateProfileModal";

interface Props {
  params: {
    userId: number;
  };
}

export default function ProfilePage ({params: {userId}} : Props) {
  const [user, setUser] = useState({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dob: '',
  });
  const [isUpdate, setIsUpdate] = useState(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const session = await getSession();
  // if (!session) {
  //   return;
  // }
  // if (session?.user?.id !== Number(userId)){
  //   return <div>Unauthorized</div>;
  // }
  useEffect(() => {
    getUserIfo()
  }, [isUpdate]);
  async function getUserIfo() {
    let user = await getUserProfile(Number(userId));
      setUser({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        dob: user.dob,
      });
  }

  function isUpdateUser(userId: number) {
      setIsUpdate(isUpdate + 1)
  }
  return (
    <>
    <UpdateProfileModal 
      user={user}
      isOpen={isOpen}
      isUpdateUser={isUpdateUser}
      setIsOpen={setIsOpen}
      onClose={() => setIsOpen(false)}/>

    <section className="flex flex-col gap-8 items-center ">
      <div className="flex flex-col mt-20 items-center gap-5">
        <Avatar className="h-24 w-24">
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
        <h3 className="text-2xl font-bold">
          {`${user?.firstName} ${user?.lastName}`}
        </h3>
      </div>
      <div className="flex flex-col gap-8 rounded-xl border shadow-sm p-6 lg:w-[45%] md:w-[80%] w-full">
        <div className="flex justify-between items-center">
          <span>General Information</span>
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-75"
                onClick={() => setIsOpen(true)}
            >
              <CiEdit size={20} />
              <span className="text-secondary text-sm">Edit</span>
            </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center">
            <span className="w-1/3 text-sm text-secondary">
              Name
            </span>
            <span className="text-sm">
              {`${user?.firstName} ${user?.lastName}`}
            </span>
          </div>
          <div className="flex items-center">
            <span className="w-1/3 text-sm text-secondary">
              Email
            </span>
            <span className="text-sm">
              {user?.email}
            </span>
          </div>
          <div className="flex items-center">
            <span className="w-1/3 text-sm text-secondary">
              PhoneNumber
            </span>
            <span className="text-sm">
              {user?.phoneNumber}
            </span>
          </div>
          <div className="flex items-center">
            <span className="w-1/3 text-sm text-secondary">
              Date Of Birth
            </span>
            <span className="text-sm">
              {user?.dob}
            </span>
          </div>

        </div>
      </div>
    </section>
  </>
  );
}
