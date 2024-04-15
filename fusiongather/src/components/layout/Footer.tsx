import Image from "next/image";
import Logo from "../main/Logo";
import google_pay from "../../../public/google_play.svg";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="mt-8">
            <div className="flex max-md:flex-col items-start justify-between px-2 md:px-4 gap-4 lg:gap-16 py-6 border-t">
                <div className="flex flex-col gap-6 md:w-[35%] w-[100%]">
                    <Link href={'/'}>
                        <Logo size="small" />
                    </Link>
                    <div className="flex flex-col gap-2 text-secondary">
                        <span className="uppercase text-lg">Fusion Gather Team</span>
                        <span className="text-sm lg:w-3/4 md:w-full w-1/2">Building Alpha, FPT University, FPT City Urban Area, Ngu Hanh Son, Da Nang.
                        </span>
                    </div>
                </div>
                <div className="flex gap-2 md:w-[53%] lg:w-[35%] w-[100%] ">
                    <div className="flex flex-col gap-4 w-1/2">
                        <div className="uppercase text-lg font-medium">FusionGather</div>
                        <div className="flex flex-col gap-2 text-secondary text-sm">
                            <Link className="hover:text-[#FF8E3C] transition-all duration-200" href={'/about'}>About Us</Link>
                            <Link className="hover:text-[#FF8E3C] transition-all duration-200" href={'/contact'}>Contact</Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 w-1/2">
                        <div className="uppercase text-lg font-medium">support</div>
                        <div className="flex flex-col gap-2 text-secondary text-sm">
                            <Link className="hover:text-[#FF8E3C] transition-all duration-200" href={'/terms-of-uses'}>Terms Of Use</Link>
                            <Link className="hover:text-[#FF8E3C] transition-all duration-200" href={'/privacy'}>Privacy Policy</Link>
                        </div>
                    </div>
                </div>
                <div className="max-md:w-[17%] w-[30%]">
                    <div className="mb-2">Download App</div>
                    <Link href={'/'}>
                        <div className="w-[100px] h-8">
                            <Image
                                alt="icon-google-pay"
                                src={google_pay}
                            />
                        </div>
                    </Link>
                </div>
            </div>
            <div className="flex justify-center py-2 text-gray-700 text-sm">
                <p>&copy; {new Date().getFullYear()} Event Management Platform Fusion Gather. Copyright by Quickom.</p>
            </div>
        </footer>
    );
}

export default Footer;