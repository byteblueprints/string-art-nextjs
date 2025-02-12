import {
    FaLinkedin,
    FaTwitter,
    FaInstagram,
    FaFacebook,
    FaFacebookMessenger,
    FaWhatsapp,
    FaYoutube,
    FaTiktok,
    FaCoffee,
    FaPatreon,
} from "react-icons/fa";

const SocialLinks = () => {
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between md:justify-center space-y-4 md:space-y-0 md:space-x-12 py-4">
                {/* Connect Section */}
                <div className="flex flex-col items-center">
                    <span className="text-gray-700 font-medium mb-2 text-center md:text-left">
                        Connect with me:
                    </span>
                    <div className="flex flex-wrap justify-center md:justify-start space-x-4 md:space-x-6">
                        <a
                            href="https://linkedin.com/in/yourprofile"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group hover:scale-110 transition-transform"
                        >
                            <div className="p-2 border-2 border-blue-500 rounded-full group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                <FaLinkedin className="text-blue-500 text-xl group-hover:text-white transition-colors" />
                            </div>
                        </a>
                        <a
                            href="https://twitter.com/yourprofile"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group hover:scale-110 transition-transform"
                        >
                            <div className="p-2 border-2 border-blue-400 rounded-full group-hover:bg-blue-400 group-hover:text-white transition-colors">
                                <FaTwitter className="text-blue-400 text-xl group-hover:text-white transition-colors" />
                            </div>
                        </a>
                        <a
                            href="https://instagram.com/yourprofile"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group hover:scale-110 transition-transform"
                        >
                            <div className="p-2 border-2 border-pink-400 rounded-full group-hover:bg-pink-400 group-hover:text-white transition-colors">
                                <FaInstagram className="text-pink-400 text-xl group-hover:text-white transition-colors" />
                            </div>
                        </a>
                        <a
                            href="https://facebook.com/yourprofile"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group hover:scale-110 transition-transform"
                        >
                            <div className="p-2 border-2 border-blue-600 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <FaFacebook className="text-blue-600 text-xl group-hover:text-white transition-colors" />
                            </div>
                        </a>
                        <a
                            href="https://m.me/yourmessengerid"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group hover:scale-110 transition-transform"
                        >
                            <div className="p-2 border-2 border-blue-500 rounded-full group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                <FaFacebookMessenger className="text-blue-500 text-xl group-hover:text-white transition-colors" />
                            </div>
                        </a>
                        <a
                            href="https://wa.me/yourwhatsappnumber"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group hover:scale-110 transition-transform"
                        >
                            <div className="p-2 border-2 border-green-400 rounded-full group-hover:bg-green-400 group-hover:text-white transition-colors">
                                <FaWhatsapp className="text-green-400 text-xl group-hover:text-white transition-colors" />
                            </div>
                        </a>
                        <a
                            href="https://youtube.com/yourchannel"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group hover:scale-110 transition-transform"
                        >
                            <div className="p-2 border-2 border-red-500 rounded-full group-hover:bg-red-500 group-hover:text-white transition-colors">
                                <FaYoutube className="text-red-500 text-xl group-hover:text-white transition-colors" />
                            </div>
                        </a>
                        <a
                            href="https://www.tiktok.com/@yourprofile"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group hover:scale-110 transition-transform"
                        >
                            <div className="p-2 border-2 border-black rounded-full group-hover:bg-black group-hover:text-white transition-colors">
                                <FaTiktok className="text-black text-xl group-hover:text-white transition-colors" />
                            </div>
                        </a>
                    </div>
                </div>

                {/* Spacing on Desktop */}
                <div className="hidden md:block w-12"></div>

                {/* Support Section */}
                <div className="flex flex-col items-center">
                    <span className="text-gray-700 font-medium mb-2 text-center md:text-left">
                        Support my work:
                    </span>
                    <div className="flex flex-wrap justify-center md:justify-start space-x-4 md:space-x-6">
                        <a
                            href="https://www.buymeacoffee.com/yourprofile"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group hover:scale-110 transition-transform"
                        >
                            <div className="p-2 border-2 border-yellow-400 rounded-full group-hover:bg-yellow-400 group-hover:text-white transition-colors">
                                <FaCoffee className="text-yellow-400 text-xl group-hover:text-white transition-colors" />
                            </div>
                        </a>
                        <a
                            href="https://patreon.com/yourprofile"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group hover:scale-110 transition-transform"
                        >
                            <div className="p-2 border-2 border-red-600 rounded-full group-hover:bg-red-600 group-hover:text-white transition-colors">
                                <FaPatreon className="text-red-600 text-xl group-hover:text-white transition-colors" />
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default SocialLinks;
