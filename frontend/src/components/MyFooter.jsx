import React from 'react';
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';

const MyFooter = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <h4 className="font-bold mb-2">Company</h4>
          <ul className="text-sm space-y-1">
            <li>About</li>
            <li>Careers</li>
            <li>Brand Center</li>
            <li>Blog</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Help</h4>
          <ul className="text-sm space-y-1">
            <li>Discord Server</li>
            <li>Twitter</li>
            <li>Facebook</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Legal</h4>
          <ul className="text-sm space-y-1">
            <li>Privacy Policy</li>
            <li>Licensing</li>
            <li>Terms &amp; Conditions</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Download</h4>
          <ul className="text-sm space-y-1">
            <li>iOS</li>
            <li>Android</li>
            <li>Windows</li>
            <li>MacOS</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-4 py-4">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="text-sm">© {new Date().getFullYear()} Your Company</div>
          <div className="flex space-x-4 text-xl">
            <a href="#" aria-label="facebook"><BsFacebook /></a>
            <a href="#" aria-label="instagram"><BsInstagram /></a>
            <a href="#" aria-label="twitter"><BsTwitter /></a>
            <a href="#" aria-label="github"><BsGithub /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MyFooter;