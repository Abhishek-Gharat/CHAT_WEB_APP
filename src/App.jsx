import { useState } from "react";
import "./App.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import DarkModeToggle from './components/DarkModeToggle';

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [buttonAnimation, setButtonAnimation] = useState(false);

  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    setButtonAnimation(true); // Trigger button animation
    e.preventDefault();
    setAnswer("Loading your answer... \n It might take up to 10 seconds");
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
          import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
        }`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      setAnswer(
        response.data.candidates[0].content.parts[0].text
      );
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
    setButtonAnimation(false); // Reset button animation
  }

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
        <header className="p-4 bg-white dark:bg-black">
          <DarkModeToggle />
        </header>
        <form
          onSubmit={generateAnswer}
          className="w-full md:w-2/3 m-auto text-center rounded bg-white dark:bg-black py-2"
        >
          <a href="https://github.com/Abhishek-Gharat" target="_blank" rel="noopener noreferrer">
            {/* <h1 className="text-3xl text-center">CHAT AI WEB APP</h1> */}
            <div className="font-extrabold text-3xl md:text-5xl [text-wrap:balance] bg-clip-text bg-gradient-to-r from-slate-200/60 to-50% to-slate-200 dark:text-white text-black text-center">
  AI CHAT APP 
  <span className="text-indigo-500 inline-flex flex-col h-[calc(theme(fontSize.4xl)*theme(lineHeight.tight))] md:h-[calc(theme(fontSize.5xl)*theme(lineHeight.tight))] overflow-hidden items-center">
    <ul className="block animate-text-slide-4 text-center leading-tight [&_li]:block">
    <li>🤖 ASK ANYTHING</li>
     <li>💻 Code Related</li>
    <li>💰Finance Sector</li>
      <li>🩺 Health Related</li>
      <li aria-hidden="true">🤖 ASK ANYTHING</li>
    </ul>
  </span>
</div>

          </a>
          <div className="mt-4"></div> {/* Add a gap between textarea and AI chat app */}

          <div className="w-full max-w-[54rem] border border-black dark:border-white rounded-[80px] py-[5px] px-[2px] flex items-center shadow-[6px_6px_10px_-1px_rgba(0,0,0,0.15)] justify-between mx-auto sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] relative">
            <textarea
              required
              className="w-full h-10 resize-none my-1 p-1 bg-white dark:bg-black text-black dark:text-white border-white rounded-[80px] focus:outline-none text-center ml-2"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask anything"
            ></textarea>
            {generatingAnswer && (
              <svg className="ip animate absolute right-0 top-0 mt-2" style={{ transform: 'translateX(-40px)' }} width="20" height="25" viewBox="0 0 256 128" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#5ebd3e" />
                    <stop offset="33%" stopColor="#ffb900" />
                    <stop offset="67%" stopColor="#f78200" />
                    <stop offset="100%" stopColor="#e23838" />
                  </linearGradient>
                  <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
                    <stop offset="0%" stopColor="#e23838" />
                    <stop offset="33%" stopColor="#973999" />
                    <stop offset="67%" stopColor="#009cdf" />
                    <stop offset="100%" stopColor="#5ebd3e" />
                  </linearGradient>
                </defs>
                <g fill="none" strokeLinecap="round" strokeWidth="16">
                  <g className="ip__track" stroke="#ddd">
                    <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"/>
                    <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"/>
                  </g>
                  <g strokeDasharray="180 656">
                    <path className="ip__worm1" stroke="url(#grad1)" strokeDashoffset="0" d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"/>
                    <path className="ip__worm2" stroke="url(#grad2)" strokeDashoffset="358" d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"/>
                  </g>
                </g>
              </svg>
            )}
          </div>
          <button
            type="submit"
            className={`bg-black text-white dark:bg-white dark:text-black p-4 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300 mt-4 ${buttonAnimation ? 'animate-pulse' : ''}`}
            disabled={generatingAnswer}
          >
            {generatingAnswer ? 'Generating...' : 'Generate answer'}
          </button>
        </form>
     
        <div className="w-full md:w-2/3 m-auto text-center rounded bg-white dark:bg-black my-1 answer-container max-h-96 overflow-y-auto">
          <ReactMarkdown className="p-3">{answer}</ReactMarkdown>
        </div>
      </div>
    </>
  );
}

export default App;
