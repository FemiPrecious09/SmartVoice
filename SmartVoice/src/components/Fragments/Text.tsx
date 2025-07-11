import {useState,useRef,useEffect} from "react"
const Text = () =>{
 const [value,setValue] = useState<string>("")
 const [displayedText,setDisplayedText] = useState<string>("")
 const [isPlaying,setIsPlaying] = useState<boolean>(false)
 const historyRef = useRef<string[]>([]);
 const [currentIndex,setCurrentIndex] = useState<number>(0)
 const speakText = (value:string) => {
    if (!value) return;
    const utterance = new SpeechSynthesisUtterance(value);
    let currentChar = 0
    const totalLength = value.length
    utterance.onstart = ()=>{
     setDisplayedText("")
     setIsPlaying(true)
    }
    utterance.onboundary = (event)=>{
     if(event.name === "word"){
      const word = value.slice(currentChar,event.charIndex).trim()
      setDisplayedText((prev)=>
       prev + " " + word
      )
      currentChar = event.charIndex
      const remaining = value.slice(currentChar).trim();
      const threshold = 5;
      if(event.charIndex + threshold >= totalLength && remaining.length > 0){
      setDisplayedText((prev)=> prev + " " + remaining)
      }
     }
    }
    utterance.onend = () =>{
     setIsPlaying(false);
    }
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };
  useEffect(()=>{

    /* return =>() */
  },[])
 return(
  <section className=" bg-gradient-to-r from gray-800 to-gray-700 min-h-full pb-5">
   {/* <div className="absolute bottom-0 left-0 w-full z-0">
    <div className="wave wave1"></div>
    <div className="wave wave2"></div>
    <div className="wave wave3"></div>
   </div> */}
   <div className="text-4xl pl-10 pt-10 text-center mr-6 mb-6">Text To Speech</div>
  <div className="mx-auto justify-center flex flex-col">
   <div className="border h-auto min-h-72 mx-auto pl-2 pt-2 rounded-lg w-120 outline-0 border-slate-500 bg-gray-700 focus:ring-teal-400 focus:ring-2 shadow shadow-black">{displayedText || "Your spoken Text will be shown here...."}</div>
   <div className="mx-auto flex">
    <textarea placeholder="what is on your mind..." value = {value} className="shadow resize-none whitespace-pre-wrap shadow-black border rounded-lg w-120 outline-0 border-slate-300 my-2 pl-2 h-auto min-h-10 focus:ring-2 focus:ring-teal-400 focs:outline-none focus:border-0 bg-slate-700 overflow-hidden pt-2" onChange={(e)=>{
    setValue(e.target.value);
    }}></textarea>
    <div className="flex btn">
      <button className="btn cursor-pointer mt-1" onClick={()=>{
      speakText(historyRef.current[currentIndex-1]);
      console.log(currentIndex-1)
      }}>
      <i className="fa-solid fa-repeat"></i>
      </button>
      <button className="btn2 cursor-pointer mt-1 ml-4" onClick={()=>{
        speakText(value)
        historyRef.current.push(value);
        setCurrentIndex(currentIndex + 1)
        console.log(currentIndex)
        if(!isPlaying){
          setValue("")
        }
      }}>
        <i className={`i fa-solid fa-${isPlaying ? "circle-stop" : "circle-play"}`}></i>
      </button>
    </div>
   </div>
  </div>
  </section>
 )
}
export default Text;