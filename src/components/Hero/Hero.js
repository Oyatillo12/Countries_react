import { SearchIcon } from "../../assets/images/Icon";
import CountryCard from "../CountryCard/CountryCard";
import Loading from '../../assets/images/loading.png'
import { useState } from "react";
import Modal from "../Modal";
import Button from "../Button";
import CaruselSwiper from "../CaruselSwiper/CaruselSwiper";
import toast, { Toaster } from "react-hot-toast";

function Hero({ allCountries, countries, setCountries, isLoading, setIsLoading, setAllCountries }) {

  const [updateOpen, setUpdateOpen] = useState(false)
  const [heroModal, setHeroModal] = useState(false)
  const [updateCountry, setUpdateCountry] = useState("")
  const [updatedImg, setUpdatedImg] = useState("")

  const [updatedName, setUpdatedName] = useState()
  const [updatedCapital, setUpdatedCapital] = useState()
  const [updatedPopulation, setUpdatedPopulation] = useState()

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

  const [countryId, setCountryId] = useState("")
  function handleDelete(e) {
    setCountryId(e.target.id)
    setHeroModal(true)

  }

  function handleDeleteCards() {
    setIsLoading(true)
    setTimeout(() => {
      setCountries(prevCountries => prevCountries.filter(c => c.id != countryId));
      setAllCountries(prevCountries => prevCountries.filter(c => c.id != countryId));
      setIsLoading(false)
      toast.success('You successfully deleted the country')
    }, 400)


    setHeroModal(false)
  }

  function handleUpdatePart(e) {
    const findedCountry = countries.find(c => c.id == e.target.id)
    setUpdatedImg(findedCountry.flag)
    setUpdatedName(findedCountry.name)
    setUpdatedCapital(findedCountry.capital)
    setUpdatedPopulation(findedCountry.population)
    setUpdateCountry(findedCountry)
    setUpdateOpen(true)
  }

  function updatedForm(e) {
    e.preventDefault();

    setIsLoading(true)
      const updatedCountry = {
        ...updateCountry,
        name: e.target.updatedName.value,
        capital: e.target.updatedCapital.value,
        population: e.target.updatedPopulation.value,
        flag: updatedImg
      };
      setUpdateOpen(false)
    setTimeout((() => {
      const updatedCountries = countries.map(c => c.id === updatedCountry.id ? updatedCountry : c);
      setCountries(updatedCountries);
      setAllCountries(updatedCountries);
      

      setIsLoading(false)
      toast.success('You successfully updated the country')
    }), 1000)
  }


  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <section className="pt-[48px]">
        <div className="w-[1280px] mx-auto">
          <CaruselSwiper allCountries={allCountries} />
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
                  <CountryCard key={item.id} country={item} updateCLicked={handleUpdatePart} onClick={handleDelete} />
                ))
            }
          </div>
        </div>
        <Modal setHeroModal={setHeroModal} heroModal={heroModal}>
          <strong className="text-lg block mb-4 dark:text-white">Delete Country</strong>
          <span className="block mb-3 w-full h-[1px] bg-slate-600"></span>
          <p className="text-lg mb-3 dark:text-white">Are you want to Delete ?</p>
          <div className="gap-2 flex items-center justify-end">
            <button onClick={() => setHeroModal(false)} className="w-[33%] dark:text-white bg-green-500 rounded-lg py-[5px] hover:opacity-70 duration-300">Cancel</button>
            <button onClick={handleDeleteCards} className="w-[33%] dark:text-white bg-red-500 rounded-lg py-[5px] hover:opacity-70 duration-300">Delete</button>
          </div>
        </Modal>
        <Modal setUpdateOpen={setUpdateOpen} updateOpen={updateOpen}>
          <form onSubmit={updatedForm} autoComplete="off">
            <div className="flex items-center justify-between">
              <label className="w-[49%]">
                <img className="w-full overflow-hidden rounded-lg h-[200px] object-contain" src={updatedImg} alt="choosen img" width={"100%"} height={"200"} />
                <input onChange={(e) => setUpdatedImg(URL.createObjectURL(e.target.files[0]))} className="hidden" type="file" name="choosenimg" />
              </label>
              <div className="w-[49%] space-y-4">
                <input onChange={(e) => setUpdatedName(e.target.value)} value={updatedName} className="p-2 text-lg w-full outline-none rounded-lg border border-slate-600 dark:bg-[#2B3844] dark:text-white" type="text" placeholder="Enter a country name" name="updatedName" />
                <input onChange={(e) => setUpdatedCapital(e.target.value)} value={updatedCapital} className="p-2 text-lg w-full outline-none rounded-lg border border-slate-600 dark:bg-[#2B3844] dark:text-white" type="text" placeholder="Enter a country capital" name="updatedCapital" />
                <input onChange={(e) => setUpdatedPopulation(e.target.value)} value={updatedPopulation} className="p-2 text-lg w-full outline-none rounded-lg border border-slate-600 dark:bg-[#2B3844] dark:text-white" type="number" placeholder="Enter a country population" name="updatedPopulation" />
              </div>
            </div>
            <div className="flex items-center justify-end space-x-2 mt-6">
              <Button onClick={() => setUpdateOpen(false)} type={"button"} title={"Cancel"} extrastyle={"w-[49%]  bg-red-500"} />
              <Button type={"submit"} title={"Submit"} extrastyle={"w-[49%]  bg-blue-500"} />
            </div>
          </form>
        </Modal>

      </section>
    </>
  )
}

export default Hero