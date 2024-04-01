import BoothOfEvent from "@/components/main/BoothOfEvent";
import VendorBoothPage from "@/components/main/VendorBoothPage";
import { getBoothByVendorId } from "@/lib/actions/booth"
import getSession from "@/lib/actions/getSession";

export default async function VendorBooth() {
  const session = await getSession(); 
  const userId = Number(session?.user?.id);
  return (
    <section>
      <VendorBoothPage user={userId} />
    </section>
    )

}