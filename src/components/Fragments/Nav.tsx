import {useEffect,useState} from "react"
function Nav(){
  const [fixed,setFixed] = useState<boolean>(false)
  useEffect(()=>{
    const handleScroll =()=>{
      const halfway = window.innerHeight / 2
      setFixed(window.scrollY > halfway)
    }
    window.addEventListener("scroll", handleScroll)
    return()=>
    window.removeEventListener("scroll", handleScroll)
  },[])
 return (
  <nav className={`grid grid-cols-[550px_160px_1fr] border-bottom-1 py-5 bg-gray-800 sticky top-0 z-50 ${(fixed)? "fixed top-0":""}`}>
   <div className="ml-10 flex items-center">
    <img src="" className=""/>
    <div className="text-3xl">SmartVoice</div>
   </div>
   <div className="flex justify-between items-center">
       <a className="cursor-pointer py-1 px-4 rounded-lg border mr-3">Text</a>
       <a className="cursor-pointer  px-4 py-1 rounded-lg mr-3 border">Files</a>
       <a className="cursor-pointer px-4 py-1 rounded-lg border">Photos</a>
   </div>  
   <div className="flex justify-center ml-90 ">
    <div className="mr-6 mt-3 flex">
      <i className="fa-solid fa-globe mt-1"></i>
      <select className="mb-4 cursor-pointer">
        <option>ENG</option>
      </select>
    </div>
    <button className="cursor-pointer px-8 bg-[rgba(29,203,209,0.1)] border-radius-50% rounded h-12">Get Started<i className="fa-solid fa-arrow-right ml-3"></i></button>
   </div>
  </nav>
 )
}
export default Nav;