import React from 'react'
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { saveAssistant } from '../../../Server/controllers/user.controller';
import { serverUrl } from '../App';
import { linkWithCredential } from 'firebase/auth';

const THEMES = [
  "light",
  "dark",
  "glass",
  "neon",
];

const TONES = [
  "friendly",
  "professional",
  "sales",
];

const Builder = ({user,setUser}) => {
  
  const [assistantName, setAssistantName] = useState(user?. assistantName || "")
  
  const [businessName, setBusinessName] = useState(user?. businessName || "");
  
  const [businessType, setBusinessType] = useState(user?. businessType || "");

  const [businessDescription, setBusinessDescription] = useState(user?. businessDescription || "");

  const [theme, setTheme] = useState(user?. theme || "dark");

  const [tone, setTone] = useState(user?. tone || "friendly");

  const [geminiApiKey, setGeminiApiKey] = useState(user?. geminiApiKey || "");

  const [pages, setPages] = useState(user?.pages || []);

  const [pageName, setPageName] = useState("");

  const [pagePath, setPagePath] = useState("");

  const [pageKeywords, setPageKeywords] = useState("");

  const [loading, setLoading] = useState(false);

  const [editAssistant, setEditAssistant] = useState(user?.isSetupComplete)

  const addPage = () =>{
    if(!pageName || !pagePath){
      return;
    }

    const newPage = {
      name: pageName,
      path: pagePath,
      keyword: pageKeywords.split(",").map((k)=>k.trim());
    }

    setPages([...pages,newPage])

    setPageName("")
    setPagePath("")
    setPageKeywords("")

  }

  const removePage = () =>{

    const updatePage = pages.filter((_,i)=>i !==index)

    setPages(updatePage)


  }

  const saveAssistant = async () => {
  setLoading(true);

  try {
    const data = {
      assistantName,
      businessName,
      businessType,
      businessDescription,
      tone,
      theme,
      geminiApiKey,
      pages,
    }

    const res = await axios.post(serverUrl + '/api/user/save-assistant' , data , {withCredentials: true})

    setUser(res.data.user)

    setEditAssistant(false)

    toast.success("Assistant Saved Sucessfully")
    setLoading(false);

  } catch (error) {
    toast.error("Failed to Save Assistant")
    console.log(error)
    setLoading(false)
  }
};



  return (
    <div className='min-h-screen bg-[#f7f8fc] px-4 py-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='mb-8'>
          <h2 className='text-3xl font-bold text-[#081028]'>
            Assistant Builder
          </h2>

          <p className='text-gray-500 mt-1'>
            Customize your virtual assistant
          </p>
        </div>

        {editAssistant && <div className='space-y-6'>
          <div className='bg-white rounded-3xl border border-gray-100 shadow-sm p-6'>
            <h2 className='text-lg font-semibold mb-5'>
              Basic Information
            </h2>

            <div className='space-y-4'>
              <input onChange={(e)=>{setAssistantName(e.target.value)}} value={assistantName} type="text" placeholder="Assistant Name" className="w-full border border-gray-200 rounded-2xl px-4 py-3" />

              <input onChange={(e)=>{setBusinessName(e.target.value)}} value={businessName} type="text" placeholder="Business Name" className="w-full border border-gray-200 rounded-2xl px-4 py-3" />

              <input onChange={(e)=>{setBusinessType(e.target.value)}} value={businessType} type="text" placeholder="Business Type" className="w-full border border-gray-200 rounded-2xl px-4 py-3" />

              <textarea type="text" rows={4} onChange={(e) => setBusinessDescription(e.target.value)} value={businessDescription} placeholder="Business Description" className="w-full border border-gray-200 rounded-2xl px-4 py-3 resize-none" />
            </div>
          </div>

          <div className='bg-white rounded-3xl border border-gray-100 shadow-sm p-6'>
            <h2 className='text-lg font-semibold mb-5'>
              Appearance
            </h2>

            <div>
              <label className='text-sm text-gray-600 mb-3 block'>
                Theme
              </label>
              
              <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
                {THEMES.map((item) => (
                  <button
                    onClick={()=>setTheme(item)}
                    key={item}
                    className={`py-3 rounded-2xl border-2 capitalize ${
                      theme === item
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-gray-200"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>


            </div>

            <div className='mt-6'>
              <label className='text-sm text-gray-600 mb-3 block'>
                Assistant Tone
              </label>
              
              <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
                {TONES.map((item) => (
                  <button
                    onClick={()=>setTone(item)}
                    key={item}
                    className={`py-3 rounded-2xl border-2 capitalize ${
                      tone === item
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-gray-200"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>


            </div>
          </div>

           <div className='bg-white rounded-3xl border border-gray-100 shadow-sm p-6'>
              <div className='flex items-center justify-between mb-5 gap-4 flex-wrap'>
                <div>
                  <h2 className='text-lg font-semibold'>
                    Gemini API Key
                  </h2>

                  <p className='text-sm text-gray-400 mt-1'>
                    Add your Gemini API key to power your assistant.
                  </p>
                </div>

                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-emerald-500 text-white text-sm font-medium" >
                    Get API KEY
                </a>
              </div>

              <input onChange={(e)=>{setGeminiApiKey(e.target.value)}} value={geminiApiKey} type="password" placeholder="AIza..." className="w-full border border-gray-200 rounded-2xl px-4 py-3" />

              <p className="text-xs text-gray-400 mt-3 leading-6">
                Your API key is securely stored and only used
                for generating AI responses.
              </p>

            </div>


            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5 flex-wrap">
                <div>
                  <h2 className="text-lg font-semibold">
                    Navigation Pages
                  </h2>

                  <p className="text-sm text-gray-400">
                    Assistant can redirect users
                  </p>
                </div>

                <button onClick={addPage} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-emerald-500 text-white text-sm" >
                <FiPlus/>Add
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Page Name"
                  className="border border-gray-200 rounded-2xl px-4 py-3"
                  onChange={(e) => setPageName(e.target.value)}
                  value={pageName}
                />

                <input
                  type="text"
                  placeholder="/pricing"
                  className="border border-gray-200 rounded-2xl px-4 py-3"
                  onChange={(e) => setPagePath(e.target.value)}
                  value={pagePath}
                />

                <input
                  type="text"
                  placeholder="plan, pricing"
                  className="border border-gray-200 rounded-2xl px-4 py-3"
                  onChange={(e) => setPageKeywords(e.target.value)}
                  value={pageKeywords}
                />
              </div>

              <div className="mt-5 space-y-3">
                {pages.map((page, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border border-gray-100 rounded-2xl p-4"
                  >
                    <div>
                      <p className="font-medium">{page.pageName}</p>
                      <p className='text-sm text-gray-400'>{page.path}</p>
                      <p className='text-sm text-gray-400'>{page.keywords}</p>
                    </div>

                    <button onClick={()=>removePage(index)} className='text-red-500'>
                      <FiTrash2/>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={saveAssistant}
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-emerald-500 text-white font-semibold"
            >
              {loading ? "Saving..." : user.isSetupComplete ? "Update Assistant" : "Save Assistant"}
            </button>

        </div>}

      </div>
    </div>
  )
}


export default Builder