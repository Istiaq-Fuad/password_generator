import { useCallback, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, charAllowed, numberAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const passwordRef = useRef(null);

  const showToastMessage = () => {
    toast.success("copied to clipboard !", {
      position: toast.POSITION.TOP_CENTER,
      pauseOnHover: false,
      progress: undefined,
      autoClose: 800,
      hideProgressBar: true,
      // theme: "dark",
      className: "text-orange-500",
    });
  };

  return (
    <>
      <div className="grid h-screen place-items-center">
        <div className="w-11/12 mx-auto max-w-md rounded-lg text-orange-500 flex flex-col items-center text-xl">
          <h1 className="text-3xl mb-5">Password Generator</h1>
          <div className="flex flex-row w-full mb-5">
            <input
              type="text"
              value={password}
              className="outline-none py-1 px-3 w-full rounded-l-md"
              placeholder="password"
              readOnly
            />
            <button
              onClick={() => {
                copyPasswordToClipboard();
                showToastMessage();
              }}
              className="outline-none bg-blue-700 text-white px-3 py-0.5 rounded-r-md"
            >
              copy
            </button>
            <ToastContainer />
          </div>

          <div className="flex flex-row flex-wrap gap-4 w-full justify-around">
            <span>
              <input
                type="range"
                id="lengthInput"
                min={6}
                max={20}
                className="cursor-pointer mr-3"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                ref={passwordRef}
              />
              <label htmlFor="lengthInput">Length : {length}</label>
            </span>
            <span>
              <input
                type="checkbox"
                id="numberInput"
                defaultChecked={numberAllowed}
                className="mr-3"
                onChange={() => setNumberAllowed((prev) => !prev)}
              />
              <label htmlFor="numberInput">Numbers</label>
            </span>
            <span>
              <input
                type="checkbox"
                id="charInput"
                defaultChecked={charAllowed}
                className="mr-3"
                onChange={() => setCharAllowed((prev) => !prev)}
              />
              <label htmlFor="charInput">Characters</label>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
