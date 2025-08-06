"use client";
import React from 'react';
import { Button } from '../../ui/button'; /// Assuming Shadcn is correctly set up and Button component is available
import { Phone, MessageCircle } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa";
const CallToAction:any = () => {
    const phoneNumber = "9653775333";
  

    const OpenPhone = () => {
        window.open(`tel:${phoneNumber}`);  
        }
    const openWhatsAppChat = () => {
        const whatsappURL = `https://wa.me/${phoneNumber}`;
        window.open(whatsappURL, "_blank");
      };
  return (
    // Container for the button with Tailwind's responsive utilities
    <div className="fixed bottom-0 left-0 w-full h-[60px] bg-[#ff0000] z-50 flex md:hidden lg:hidden items-center justify-center ">
  <div className="flex gap-4 w-full p-4">
      <Button
        variant="outline"
        className="flex-1  flex items-center justify-center gap-4"
        onClick={OpenPhone}
      >
        <Phone className="h-4 w-6" />
        <span>Call Us</span>
      </Button>
      <Button
        className="flex-1 bg-green-500 flex items-center justify-center gap-4 hover:bg-red-600"
        onClick={openWhatsAppChat}
      >
        <FaWhatsapp className="h-4 w-6" />
        <span>Live Chat</span>
      </Button>
    </div>
    </div>
  );
};

export default CallToAction;
