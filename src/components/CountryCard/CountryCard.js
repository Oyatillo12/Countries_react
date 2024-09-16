import { LikeIcon, SaveIcon } from "../../assets/images/Icon"


function CountryCard({ country, onClick}) {
    return (
        <div className="pb-[10px] bg-white rounded-md w-[267px]  duration-500 shadow-2xl text-black dark:bg-[#2B3844] dark:text-white overflow-hidden">
            <img className="w-[100%] h-[170px] object-cover mb-6" src={country.flag} alt="country img" width={"267"} height={"170"} />

            <div className="px-[24px]">
                <h3 className="mb-[16px] font-extrabold text-[18px] leading-[26px] ">{country.name}</h3>
                <p className="text-[14x] leading-4 mb-2"><strong className="font-bold">Population:</strong> {country.population}</p>
                <p className="text-[14x] leading-4 mb-2"><strong className="font-bold">Capital:</strong> {country.capital}</p>
                <div className="flex items-center gap-3 mt-4">
                    <button className=" bg-slate-300 px-2 dark:border-slate-300 border dark:bg-transparent rounded-lg py-[2px] hover:opacity-70 duration-300">
                        <LikeIcon/>
                    </button>
                    <button className=" bg-slate-300 px-[6px] dark:border-slate-300 border dark:bg-transparent rounded-lg hover:opacity-70 duration-300">
                        <SaveIcon/>
                    </button>

                    <button id={country.id} onClick={onClick} className="w-[33%] bg-red-500 rounded-lg py-[5px] hover:opacity-70 duration-300">Delete</button>

                </div>
            </div>

        </div>
    )
}

export default CountryCard