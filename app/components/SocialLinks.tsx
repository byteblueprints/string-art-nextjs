import { useEffect, useState } from 'react';
import { FaLinkedin, FaTwitter, FaInstagram, FaFacebook, FaFacebookMessenger, FaWhatsapp, FaYoutube, FaTiktok, FaCoffee, FaPatreon } from "react-icons/fa";
import { FaX } from 'react-icons/fa6';

const SocialLinks = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md hidden md:block">
                <div className="container mx-auto flex items-center justify-center space-x-12 py-4">
                    <div className="flex flex-col items-center">
                        <span className="text-gray-700 font-medium mb-2">Connect with me:</span>
                        <div className="flex space-x-6">
                            <a href="https://www.linkedin.com/in/sandaruwan-wijerathne/" target="_blank" rel="noopener noreferrer" className="group hover:scale-110 transition-transform">
                                <div className="p-2 border-2 border-blue-500 rounded-full group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                    <FaLinkedin className="text-blue-500 text-xl group-hover:text-white transition-colors" />
                                </div>
                            </a>
                            <a href="https://x.com/byteblueprints" target="_blank" rel="noopener noreferrer" className="group hover:scale-110 transition-transform">
                                <div className="p-2 border-2 border-black rounded-full group-hover:bg-black group-hover:text-white transition-colors">
                                    <FaX className="text-black text-xl group-hover:text-white transition-colors" />
                                </div>
                            </a>
                            <a href="https://www.instagram.com/sandaruwanwijerathn/" target="_blank" rel="noopener noreferrer" className="group hover:scale-110 transition-transform">
                                <div className="p-2 border-2 border-pink-400 rounded-full group-hover:bg-pink-400 group-hover:text-white transition-colors">
                                    <FaInstagram className="text-pink-400 text-xl group-hover:text-white transition-colors" />
                                </div>
                            </a>
                            <a href="https://facebook.com/sandaruwan.wijerathne.31" target="_blank" rel="noopener noreferrer" className="group hover:scale-110 transition-transform">
                                <div className="p-2 border-2 border-blue-600 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <FaFacebook className="text-blue-600 text-xl group-hover:text-white transition-colors" />
                                </div>
                            </a>
                            {/* <a href="https://m.me/yourmessengerid" target="_blank" rel="noopener noreferrer" className="group hover:scale-110 transition-transform">
                                <div className="p-2 border-2 border-blue-500 rounded-full group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                    <FaFacebookMessenger className="text-blue-500 text-xl group-hover:text-white transition-colors" />
                                </div>
                            </a>
                            <a href="https://wa.me/yourwhatsappnumber" target="_blank" rel="noopener noreferrer" className="group hover:scale-110 transition-transform">
                                <div className="p-2 border-2 border-green-400 rounded-full group-hover:bg-green-400 group-hover:text-white transition-colors">
                                    <FaWhatsapp className="text-green-400 text-xl group-hover:text-white transition-colors" />
                                </div>
                            </a> */}
                            <a href="https://www.youtube.com/@ByteBlueprints" target="_blank" rel="noopener noreferrer" className="group hover:scale-110 transition-transform">
                                <div className="p-2 border-2 border-red-500 rounded-full group-hover:bg-red-500 group-hover:text-white transition-colors">
                                    <FaYoutube className="text-red-500 text-xl group-hover:text-white transition-colors" />
                                </div>
                            </a>
                            {/* <a href="https://www.tiktok.com/@yourprofile" target="_blank" rel="noopener noreferrer" className="group hover:scale-110 transition-transform">
                                <div className="p-2 border-2 border-black rounded-full group-hover:bg-black group-hover:text-white transition-colors">
                                    <FaTiktok className="text-black text-xl group-hover:text-white transition-colors" />
                                </div>
                            </a> */}
                        </div>
                    </div>

                    <div className="w-12"></div>

                    <div className="flex flex-col items-center">
                        <span className="text-gray-700 font-medium mb-2">Support my work:</span>
                        <div className="flex space-x-6">
                            <a href="https://buymeacoffee.com/byteblueprints" target="_blank" rel="noopener noreferrer" className="group hover:scale-110 transition-transform">
                                <div className="p-2 border-2 border-yellow-400 rounded-full group-hover:bg-yellow-400 group-hover:text-white transition-colors">
                                    <FaCoffee className="text-yellow-400 text-xl group-hover:text-white transition-colors" />
                                </div>
                            </a>
                            <a href="https://www.patreon.com/c/byteblueprints" target="_blank" rel="noopener noreferrer" className="group hover:scale-110 transition-transform">
                                <div className="p-2 border-2 border-red-600 rounded-full group-hover:bg-red-600 group-hover:text-white transition-colors">
                                    <FaPatreon className="text-red-600 text-xl group-hover:text-white transition-colors" />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            <header className="md:hidden fixed top-0 left-0 w-full z-50 bg-white">
                <div className="container mx-auto flex justify-between items-center py-4">
                    <button onClick={toggleMenu} className="text-gray-700 text-3xl absolute top-4 right-4">
                        ☰
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex flex-col items-center justify-center z-50">
                        <button
                            onClick={toggleMenu}
                            className="absolute top-4 left-4 text-white text-3xl"
                        >
                            &times;
                        </button>

                        <div className="text-white space-y-8">
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Connect with me:</h2>
                                <ul className="space-y-4">
                                    <li>
                                        <a href="https://www.linkedin.com/in/sandaruwan-wijerathne/" className="flex items-center space-x-2">
                                            <FaLinkedin className="text-blue-500 text-xl" />
                                            <span>LinkedIn</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://x.com/byteblueprints" className="flex items-center space-x-2">
                                            <FaX className="text-gray-900 text-xl" />
                                            <span>X</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.instagram.com/sandaruwanwijerathn/" className="flex items-center space-x-2">
                                            <FaInstagram className="text-pink-400 text-xl" />
                                            <span>Instagram</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://facebook.com/sandaruwan.wijerathne.31" className="flex items-center space-x-2">
                                            <FaFacebook className="text-blue-600 text-xl" />
                                            <span>Facebook</span>
                                        </a>
                                    </li>
                                    {/* <li>
                                        <a href="https://m.me/yourmessengerid" className="flex items-center space-x-2">
                                            <FaFacebookMessenger className="text-blue-500 text-xl" />
                                            <span>Messenger</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://wa.me/yourwhatsappnumber" className="flex items-center space-x-2">
                                            <FaWhatsapp className="text-green-400 text-xl" />
                                            <span>WhatsApp</span>
                                        </a>
                                    </li> */}
                                    <li>
                                        <a href="https://www.youtube.com/@ByteBlueprints" className="flex items-center space-x-2">
                                            <FaYoutube className="text-red-500 text-xl" />
                                            <span>YouTube</span>
                                        </a>
                                    </li>
                                    {/* <li>
                                        <a href="https://www.tiktok.com/@yourprofile" className="flex items-center space-x-2">
                                            <FaTiktok className="text-black text-xl" />
                                            <span>TikTok</span>
                                        </a>
                                    </li> */}
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-4">Support my work:</h2>
                                <ul className="space-y-4">
                                    <li>
                                        <a href="https://buymeacoffee.com/byteblueprints" className="flex items-center space-x-2">
                                            <FaCoffee className="text-yellow-400 text-xl" />
                                            <span>Buy Me a Coffee</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.patreon.com/c/byteblueprints" className="flex items-center space-x-2">
                                            <FaPatreon className="text-red-600 text-xl" />
                                            <span>Patreon</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
};

export default SocialLinks;
