import { Footer1 } from "./styles";

const Footer = () => {
  return (
    <Footer1 className="bg-[#EFF2F6] py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">

          <div className="text-left">
            <h2 className="text-black text-2xl font-semibold mb-6">Sign up for our newsletter</h2>
            <p className="text-gray-400 mb-6">Be the first to know about our special offers, new product launches, and events</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="border border-gray-500 rounded-l px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-black text-white rounded-r px-6 py-2 ml-2">Subscribe</button> 
            </div>
          </div>

          <div>
            <h2 className="text-black text-2xl font-semibold mb-6">Quick Links</h2>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-black">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-black">Shop</a></li>
              <li><a href="#" className="text-gray-400 hover:text-black">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-black">Contact</a></li>
            </ul>
          </div>

          <div>
            <h2 className="text-black text-2xl font-semibold mb-6">Support</h2>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-black">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-black">Shipping</a></li>
              <li><a href="#" className="text-gray-400 hover:text-black">Returns</a></li>
              <li><a href="#" className="text-gray-400 hover:text-black">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h2 className="text-black text-2xl font-semibold mb-6">About</h2>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-black">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-black">Shipping</a></li>
              <li><a href="#" className="text-gray-400 hover:text-black">Returns</a></li>
              <li><a href="#" className="text-gray-400 hover:text-black">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>
    </Footer1>
  )
}

export default Footer