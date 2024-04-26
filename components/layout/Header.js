'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { auth } from "../../app/firebaseConfig";

const Header = () => {
    const [user, setUser] = useState("");
    const router = useRouter(); 

    const handleLogout = async () => {
        try {
            await auth.signOut();
            sessionStorage.clear();
            router.push('/'); 
        } catch (error) { 
            console.error("Error signing out:", error);
        }
    };

    return (
        <header>
            <div className="absolute top-4 left-4">
                <Image
                    src="/images/sun.png"
                    alt="Logo" 
                    width={100} 
                    height={100} 
                />
            </div>
            {user && ( 
                <div>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="absolute top-4 right-4 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Sign Out
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;
