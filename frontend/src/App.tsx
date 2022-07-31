import reactLogo from "./assets/react.svg";
import { Link } from "@tanstack/react-location";

export function App() {
  return (
    <div className="flex lg:container mx-auto text-center">
      <div>
        <a className="font-medium" href="https://vitejs.dev" target="_blank">
          <img
            className="p-6 h-20 font-medium"
            src="/vite.svg"
            alt="Vite logo"
          />
        </a>
        <a className="font-medium" href="https://reactjs.org" target="_blank">
          <img
            src={reactLogo}
            className="p-6 h-20 font-medium"
            alt="React logo"
          />
        </a>
      </div>
      <Link to="/todo">to TodoPage</Link>
    </div>
  );
}
