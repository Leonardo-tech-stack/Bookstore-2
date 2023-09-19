import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { noHeader } from '../../services/mainAPI/config';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, ShoppingCartIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ProductAPI from '../../types/productAPI';
import { Input, StyledIconWrapper } from './styles';
import CartItemCount from '../CartCounter';

interface CartResponse {
  products: ProductAPI[];
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const NavbarNavigation: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [isMediumScreen, setIsMediumScreen] = useState<boolean>(false);
  const navigate = useNavigate();

  const navigation = [
    { name: 'Comprar', href: '/lista-de-produtos', current: true },
    { name: 'Login', href: '/login', current: false },
    { name: 'Alterar Dados', href: '/meus-dados', current: false },
    { name: 'Pedidos', href: '/pedidos', current: false },
    // { name: 'Stories', href: '#', current: false },
    // { name: 'Sobre', href: '#', current: false },
    // { name: 'Sair', href: '/', action: handleLogout },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth >= 320 && window.innerWidth <= 480);
      setIsMediumScreen(window.innerWidth >= 481 && window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSearch = () => {
    navigate(`/search-results?query=${encodeURIComponent(searchTerm)}`);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    const fetchCartItemCount = async () => {
      try {
        const response = await noHeader.get<CartResponse>('/client/cart');
        const itemCount = response.data.products.reduce((total, item) => total + item.quantity, 0);
        setCartItemCount(itemCount);
      } catch (error) {
      }
    };    

    fetchCartItemCount();
    const pollingInterval = setInterval(fetchCartItemCount, 1000);

    return () => clearInterval(pollingInterval);
  }, []);

  const handleNavigation = (href: string) => {
    navigate(href, { replace: true }); 
  };

  return (
    <Disclosure as="nav" className="bg-[#0D0D0D]">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-1 sm:px-1 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Abrir Menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 mr-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <a href="/" className={`text-white font-bold ${
                    isSmallScreen ? '' : isMediumScreen ? 'ml-1' : ''  
                  }`}
                  >
                    ChapterOne
                  </a>
                </div>
                <div className="hidden sm:ml-6 sm:block flex-grow">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => handleNavigation(item.href)} 
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-1 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className={`relative ml-2 sm:ml-1 ${
                    isSmallScreen ? '' : isMediumScreen ? 'ml-8' : ''  
                  }`}
                  >
                    <button
                      type="button"
                      className="ml-1 rounded-md bg-gray-800 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      onClick={handleSearch}
                    >
                      <MagnifyingGlassIcon className="absolute top-2 left-2 h-5 w-5 text-gray-400" aria-hidden="false" />
                    </button>
                    <Input
                      className={`pl-8 pr-2 py-2 rounded-md text-sm bg-[#0D0D0D] text-white placeholder-gray-400 ${
                        isSmallScreen ? 'w-20' : 'w-50'                      
                      }`}
                      type="text"
                      placeholder="Procurar produtos"
                      value={searchTerm}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                    />
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="rounded-full bg-gray-800 p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">Ver notificação</span>
                  <StyledIconWrapper itemCount={cartItemCount} className="relative">
                    <Link to="/carrinho">
                      <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                      {cartItemCount > 0 && <CartItemCount itemCount={cartItemCount} />}
                    </Link>
                  </StyledIconWrapper>
                </button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => handleNavigation(item.href)} 
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavbarNavigation;
