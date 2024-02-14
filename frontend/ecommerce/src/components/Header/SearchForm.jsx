const SearchForm = () => (
    <div className="hidden md:flex lg:w-[500px] md:w-[400px]">
        <div className="w-full">
            <form className='m-0'>
                <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input 
                        type="search" 
                        id="search" 
                        className="block w-full h-10 p-4 ps-10 text-sm text-gray-900 rounded-lg bg-gray-100 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white" 
                        placeholder="Search" 
                        required 
                    />
                </div>
            </form>
        </div>
    </div>
);

export default SearchForm;
