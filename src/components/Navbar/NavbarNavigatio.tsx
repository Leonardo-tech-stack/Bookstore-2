import { Disclosure, Menu } from '@headlessui/react';
import { Bars3Icon, ShoppingCartIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { noHeader } from '../../services/mainAPI/config';
import { StyledIconWrapper, CartItemCount, Login } from './styles';
import axios from 'axios';

const navigation = [
  { name: 'Comprar', href: '/lista-de-produtos', current: true },
  { name: 'Stories', href: '#', current: false },
  { name: 'Sobre', href: '#', current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const NavbarNavigation: React.FC = ({}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search-results?query=${encodeURIComponent(searchTerm)}`);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleLogout = async () => {
    try {
      await noHeader.get('/user/logout');
      console.log('Logout ok');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Disclosure as="nav" className="bg-[#0D0D0D]">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-1 sm:px-6 lg:px-8">
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
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <a href="/" className="text-white font-bold">
                    ChapterOne
                  </a>
                </div>
                <div className="hidden sm:ml-6 sm:block flex-grow">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="relative">
                    <button
                      type="button"
                      className="ml-2 rounded-md bg-gray-800 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      onClick={handleSearch}
                    >
                      <MagnifyingGlassIcon className="absolute top-2 left-2 h-5 w-5 text-gray-400" aria-hidden="false" />
                    </button>
                    <input
                      className="pl-8 pr-2 py-2 rounded-md text-sm bg-[#0D0D0D] text-white placeholder-gray-400"
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
                  <StyledIconWrapper className="relative">
                    <Link to="/carrinho">
                      <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                      {/* {itemCount > 0 && <CartItemCount itemCount={itemCount}>{itemCount}</CartItemCount>} */}
                    </Link>
                  </StyledIconWrapper>
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3 d-flex justify-content-center">
                  <Menu.Button className="flex rounded-full text-white font-bold  text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open user menu</span>
                    Minha Conta
                  </Menu.Button>
                  <Menu.Items className="absolute text-black font-bold right-0 mt-2 w-40 bg-black rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none"><Menu.Item>
                      {({ active }) => (
                        <Link
                        to="/login"
                        className={classNames(
                          active ? 'text-white bg-gray-800' : 'text-white',
                          'block px-4 py-2 text-sm'
                        )}
                        >
                          Login
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/meus-dados"
                          className={classNames(
                            active ? 'bg-gray-800 text-white' : 'text-white',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Alterar Dados
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/pedidos"
                          className={classNames(
                            active ? 'bg-gray-800 text-white' : 'text-white',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Pedidos
                        </Link>
                      )}
                    </Menu.Item>
                    {/* <Menu.Item>
                      {({ active }) => (
                          <a 
                            href="/"
                            type="button" 
                            onClick={handleLogout}
                            className={classNames(
                              active ? 'bg-gray-800 text-white' : 'text-white',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Sair
                          </a>
                      )}
                    </Menu.Item> */}
                  </Menu.Items>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavbarNavigation;
