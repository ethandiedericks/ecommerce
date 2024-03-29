import { Link } from "react-router-dom";
const Logo = () => (
    <div className="flex md:flex-1">
        <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Cartify</span>
            <img
                className="h-8"
                src="/src/assets/logo.svg"
                alt=""
            />
        </Link>
    </div>
);

export default Logo;
