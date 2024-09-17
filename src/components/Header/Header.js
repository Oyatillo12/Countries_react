import { ModeIcon } from "../../assets/images/Icon"
import { useState } from "react"
import Modal from "../Modal"
import emptyImg from '../../assets/images/empty.jpg'
import Button from "../Button"
import toast, { Toaster } from "react-hot-toast"

function Header({ countries, setCountries, setIsLoading, openModal, setOpenModal, setAllCountries }) {
    function DarkMode() {
        document.documentElement.classList.toggle("dark")
    }

    const [flag, setFlag] = useState(emptyImg)

    const [name, setName] = useState("")
    const [capital, setCapital] = useState("")
    const [population, setPopulation] = useState("")

    function handleCancel() {
        console.log("cancel");
        console.log("Current state:", { flag, name, capital, population });

        toast.error("You didn't add a country")
        
        setFlag(emptyImg)
        setName("")
        setCapital("")
        setPopulation("")
        setOpenModal(false)
    }

    function handleSubmit(e) {
        e.preventDefault()

        const data = {
            id: countries.length ? countries[countries.length - 1].id + 1 : 1,
            name,
            capital,
            population,
            flag,
            isLiked: false,
            isBasket: false
        }
        setIsLoading(true)
        setOpenModal(false)

        setTimeout(() => {
            setCountries(prevCountries => [data, ...prevCountries]);
            setAllCountries(prevCountries => [data, ...prevCountries]);
            toast.success('You have successfully added a new country')
            setIsLoading(false)

            setFlag(emptyImg)
            setName("")
            setCapital("")
            setPopulation("")
        }, 1000)

    }

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <header className="py-[23px] px-[80px] mx-auto bg-white dark:text-white dark:bg-[#2B3844]  shadow-lg dark:shadow-lg">
                <div className="mx-auto w-[1280px] flex items-center justify-between">
                    <h1 className="text-[24px] leading-[32px] font-bold">Where in the world?</h1>
                    <div className="flex  items-center gap-2">
                        <button onClick={DarkMode} className="flex items-center gap-2 dark:hover:bg-[#202C36] bg-white dark:bg-transparent dark:text-white py-2 px-2 rounded-md duration-300 hover:bg-slate-200">
                            <ModeIcon />
                            <span className="font-semibold text-[16px] leading-[21px]">Dark Mode</span>
                        </button>
                        <button onClick={() => setOpenModal(true)} className="flex items-center border border-slate-500 gap-2 dark:hover:bg-[#202C36] bg-white dark:bg-transparent dark:text-white py-2 px-2 rounded-md duration-300 hover:bg-slate-200">
                            Add Country
                        </button>
                    </div>

                </div>
            </header>
            <Modal openModal={openModal} setOpenModal={setOpenModal}>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="flex items-center justify-between">
                        <label className="w-[49%]">
                            <img className="w-full overflow-hidden rounded-lg h-[200px] object-contain" src={flag} alt="choosen img" width={"100%"} height={"200"} />
                            <input onChange={(e) => setFlag(URL.createObjectURL(e.target.files[0]))} className="hidden" type="file" name="choosenimg" />
                        </label>
                        <div className="w-[49%] space-y-4">
                            <input value={name} onChange={(e) => setName(e.target.value)} required className="p-2 text-lg w-full outline-none rounded-lg border border-slate-600 dark:bg-[#2B3844] dark:text-white" type="text" placeholder="Enter a country name" name="name" />
                            <input value={capital} onChange={(e) => setCapital(e.target.value)} required className="p-2 text-lg w-full outline-none rounded-lg border border-slate-600 dark:bg-[#2B3844] dark:text-white" type="text" placeholder="Enter a country capital" name="capital" />
                            <input value={population} onChange={(e) => setPopulation(e.target.value)} required className="p-2 text-lg w-full outline-none rounded-lg border border-slate-600 dark:bg-[#2B3844] dark:text-white" type="number" placeholder="Enter a country population" name="population" />
                        </div>
                    </div>
                    <div className="flex items-center justify-end space-x-2 mt-6">
                        <Button onClick={handleCancel} type={"button"} title={"Cancel"} extrastyle={"w-[49%]  bg-red-500"} />
                        <Button type={"submit"} title={"Submit"} extrastyle={"w-[49%]  bg-blue-500"} />
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default Header