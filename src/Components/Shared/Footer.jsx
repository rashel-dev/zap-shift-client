import { FaLinkedin, FaXTwitter, FaFacebook, FaYoutube } from "react-icons/fa6";
import Logo from "../ui/logo";

const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-700 dark:bg-[#0d0d0d] dark:text-gray-300 py-12 px-4 skeleton">
            <div className="max-w-6xl mx-auto text-center">
                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-4">
                    <Logo></Logo>
                </div>

                {/* Description */}
                <p className="max-w-2xl mx-auto text-sm leading-relaxed mb-8 text-gray-600 dark:text-gray-400">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                </p>

                {/* Links */}
                <ul className="flex flex-wrap justify-center gap-6 text-sm mb-10">
                    {["Services", "Coverage", "About Us", "Pricing", "Blog", "Contact"].map((item) => (
                        <li key={item}>
                            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Social Icons */}
                <div className="flex justify-center gap-4">
                    {/* LinkedIn */}
                    <a
                        href="#"
                        className="bg-[#0A66C2] text-white 
                       rounded-full p-2 hover:scale-110 transition"
                    >
                        <FaLinkedin size={20} />
                    </a>

                    {/* Twitter / X */}
                    <a
                        href="#"
                        className=" bg-white text-black 
                       rounded-full p-2 hover:scale-110 transition"
                    >
                        <FaXTwitter size={20} />
                    </a>

                    {/* Facebook */}
                    <a
                        href="#"
                        className="text-white bg-[#1877F2] 
                       rounded-full p-2 hover:scale-110 transition"
                    >
                        <FaFacebook size={20} />
                    </a>

                    {/* YouTube */}
                    <a
                        href="#"
                        className="bg-[#FF0000] text-white
                       rounded-full p-2 hover:scale-110 transition"
                    >
                        <FaYoutube size={20} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
