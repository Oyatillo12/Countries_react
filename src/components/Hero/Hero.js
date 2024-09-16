import { SearchIcon } from "../../assets/images/Icon";
import CountryCard from "../CountryCard/CountryCard";
import Loading from '../../assets/images/loading.png'
import { useState } from "react";
import Modal from "../Modal";

function Hero({ allCountries, countries, setCountries, isLoading, setIsLoading, openModal, setOpenModal }) {


  function HandleSearchCountries(e) {
    setIsLoading(true)

    setTimeout(() => {
      const searchedCountry = allCountries.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()))
      setCountries(searchedCountry)
      setIsLoading(false)
    }, 700)
  }

  function handleChangeSelect(e) {
    const selectedCountry = allCountries.filter(item => item.id == e.target.value)
    setIsLoading(true)

    if (e.target.value == 0) {
      setTimeout(() => {
        setCountries(allCountries)
        setIsLoading(false)
      }, 500)

    }
    else {
      setTimeout(() => {
        setCountries(selectedCountry)
        setIsLoading(false)
      }, 500)
    }


  }

  function handleDelete(e) {
    const finIndexCountry = countries.findIndex(item => item.id == e.target.id)
    countries.splice(finIndexCountry,1)
    setCountries([...countries])

  }
  return (
    <section className="pt-[48px]">
      <div className="w-[1280px] mx-auto">
        <div className="flex items-center justify-between mb-[48px]">
          <label className="w-[480px] bg-white text-[#848484] dark:text-white dark:bg-[#2B3844] py-[18px] pl-[32px] flex items-center gap-[24px]  rounded-md shadow-md">
            <SearchIcon />
            <input onChange={HandleSearchCountries} className="bg-transparent dark:text-white text-black w-[87%] outline-none font-normal text-[14px] leading-5" type="text" placeholder="Search for a country…" />
          </label>
          <select onChange={handleChangeSelect} className="w-[200px]  outline-none px-[24px] text-black bg-white dark:text-white dark:bg-[#2B3844] rounded-md shadow-sm py-[18px]">
            <option value={0}>All</option>
            {
              allCountries.map(item => (
                <option key={item.id} value={item.id} >{item.capital}</option>
              ))
            }
          </select>
        </div>
        <div className='flex items-center justify-start gap-[70px] pb-[60px] flex-wrap w-[1280px]'>

          {
            isLoading ? <img className="mx-auto mt-[100px]" src={Loading} alt="Loading img" width={150} /> :
              countries.map(item => (
                <CountryCard key={item.id} country={item} onClick={handleDelete} />
              ))
          }
        </div>
      </div>
      {/* <Modal openModal={openModal} setOpenModal={setOpenModal}>
        <strong>Delete Country</strong>
         <hr/>
        <p>Are you want to Delete ?</p>
        <div>
          <button className="w-[33%] bg-green-500 rounded-lg py-[5px] hover:opacity-70 duration-300">Cancel</button>
          <button className="w-[33%] bg-red-500 rounded-lg py-[5px] hover:opacity-70 duration-300">Delete</button>
        </div>
      </Modal> */}

    </section>
  )
}

export default Hero