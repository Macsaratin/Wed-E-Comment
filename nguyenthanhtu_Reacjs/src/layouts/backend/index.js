import React from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { Link, useRoutes } from "react-router-dom";
import RouterBackend from "../../router/RouterBackend";
function Index() {
    return (
        <div className="flex flex-no-wrap ">
            <div className="w-64 absolute sm:relative bg-gray-800 shadow md:h-full flex-col justify-between hidden sm:flex">
                <div className="px-8">
                    <div className="h-16 w-full flex items-center">
                        <h1 className="text-gray-200 text-xl">Manager Dashboard</h1>
                    </div>
                    <ul className="mt-12 ">

                        <li className="flex w-full justify-between text-gray-200 hover:text-gray-500 cursor-pointer items-center mb-6 relative">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-puzzle" width={18} height={18} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
                                </svg>
                                <span><Link to="/admin/product" className="text-sm  ml-2">product</Link></span>
                            </div>
                            <div><IoIosArrowDropdown />
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-200 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-compass" width={18} height={18} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <polyline points="8 16 10 10 16 8 14 14 8 16" />
                                    <circle cx={12} cy={12} r={9} />
                                </svg>
                                <Link to="/admin/category" className="text-sm  ml-2">Category</Link>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-200 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-code" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <polyline points="7 8 3 12 7 16" />
                                    <polyline points="17 8 21 12 17 16" />
                                    <line x1={14} y1={4} x2={10} y2={20} />
                                </svg>
                                <Link to="/admin/banner" className="text-sm  ml-2">Banner</Link>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-200 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-code" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <polyline points="7 8 3 12 7 16" />
                                    <polyline points="17 8 21 12 17 16" />
                                    <line x1={14} y1={4} x2={10} y2={20} />
                                </svg>
                                <Link to="/admin/brand" className="text-sm  ml-2">Brand</Link>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-200 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-puzzle" width={18} height={18} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
                                </svg>
                                <span className="text-sm  ml-2">Menu</span>
                            </div>
                            <div className="py-1 px-3 bg-gray-700 rounded text-gray-200 flex items-center justify-center text-xs">25</div>
                        </li>
                        <li className="flex w-full justify-between text-gray-200 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-stack" width={18} height={18} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <polyline points="12 4 4 8 12 12 20 8 12 4" />
                                    <polyline points="4 12 12 16 20 12" />
                                    <polyline points="4 16 12 20 20 16" />
                                </svg>
                                <span className="text-sm  ml-2">Topic</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-200 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-stack" width={18} height={18} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <polyline points="12 4 4 8 12 12 20 8 12 4" />
                                    <polyline points="4 12 12 16 20 12" />
                                    <polyline points="4 16 12 20 20 16" />
                                </svg>
                                <span className="text-sm  ml-2">Post</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-200 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-stack" width={18} height={18} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <polyline points="12 4 4 8 12 12 20 8 12 4" />
                                    <polyline points="4 12 12 16 20 12" />
                                    <polyline points="4 16 12 20 20 16" />
                                </svg>
                                <span className="text-sm  ml-2">ProductImage</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-200 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-stack" width={18} height={18} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <polyline points="12 4 4 8 12 12 20 8 12 4" />
                                    <polyline points="4 12 12 16 20 12" />
                                    <polyline points="4 16 12 20 20 16" />
                                </svg>
                                <span className="text-sm  ml-2">ProductSale</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-200 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-stack" width={18} height={18} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <polyline points="12 4 4 8 12 12 20 8 12 4" />
                                    <polyline points="4 12 12 16 20 12" />
                                    <polyline points="4 16 12 20 20 16" />
                                </svg>
                                <span className="text-sm  ml-2">ProductStore</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-200 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-stack" width={18} height={18} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <polyline points="12 4 4 8 12 12 20 8 12 4" />
                                    <polyline points="4 12 12 16 20 12" />
                                    <polyline points="4 16 12 20 20 16" />
                                </svg>
                                <span className="text-sm  ml-2">Order</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-200 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-stack" width={18} height={18} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <polyline points="12 4 4 8 12 12 20 8 12 4" />
                                    <polyline points="4 12 12 16 20 12" />
                                    <polyline points="4 16 12 20 20 16" />
                                </svg>
                                <span className="text-sm  ml-2">OrderDetail</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-200 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-stack" width={18} height={18} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <polyline points="12 4 4 8 12 12 20 8 12 4" />
                                    <polyline points="4 12 12 16 20 12" />
                                    <polyline points="4 16 12 20 20 16" />
                                </svg>
                                <span className="text-sm  ml-2">Config</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-200 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-stack" width={18} height={18} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <polyline points="12 4 4 8 12 12 20 8 12 4" />
                                    <polyline points="4 12 12 16 20 12" />
                                    <polyline points="4 16 12 20 20 16" />
                                </svg>
                                <span className="text-sm  ml-2">User</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-200 hover:text-gray-500 h-10 cursor-pointer items-center">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-settings" width={18} height={18} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <circle cx={12} cy={12} r={3} />
                                </svg>
                                <span className="text-sm  ml-2">Settings
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
            <div className="w-64 z-40 absolute bg-gray-800 shadow md:h-full flex-col justify-between sm:hidden  transition duration-150 ease-in-out" id="mobile-nav">
            </div>
            <div className="container mx-auto py-10 h-10 md:w-4/5 w-11/12 px-6 ">
                <div className='relative flex'>
                    <input
                        type='text'
                        placeholder='Search'
                        className='w-[1000px] pl-3 pr-10 py-1  rounded-full bg-white border border-gray-300 focus:outline-none'
                    />
                    <div className="w-20 mx-1">
                        <h1 className=' hover:text-blue-700 text-black font-bold py-2 px-8 '>
                            Logout
                        </h1>
                    </div>
                    <div className=" ">
                        <h1 className=' text-black font-bold py-2 px-4 '>
                            ||
                        </h1>
                    </div>
                    <div className="w-20 mx-1">
                        <h1 className=' hover:text-blue-700 text-black font-bold py-2 '>
                            Login
                        </h1>
                    </div>

                </div>
                {useRoutes(RouterBackend)}
            </div>
        </div>
    );
}

export default Index;
