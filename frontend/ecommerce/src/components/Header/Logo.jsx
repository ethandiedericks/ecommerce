import { Link } from "react-router-dom";
const Logo = () => (
    <div className="flex md:flex-1">
        <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
                className="h-8"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
            />
        </Link>
    </div>
);

export default Logo;
