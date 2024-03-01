import { Avatar, AvatarImage } from "@/components/ui/avatar";
import getSession from "@/lib/actions/getSession";
import { CiEdit } from "react-icons/ci";

const ProfilePage = async () => {
  const session = await getSession()
  const user = session?.user
  return (
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
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-75">
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
  );
}

export default ProfilePage;