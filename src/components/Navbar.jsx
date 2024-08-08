import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className=" backdrop-blur-sm  p-6 top-0 sticky shadow-md">
      <div className="container mx-auto flex justify-between items-center ">
        <Link to="/" className="text-3xl text-primary underline-offset-4 underline text-center font-medium bg-gradient-to-t from-sky-500 via-gray-700 to-rose-500 bg-clip-text text-transparent">
          Poke<span className="text-4xl">Lib</span>
        </Link>
        <div className="flex space-x-4">
          <Link to="/" className="pr-5 hover:text-sky-500">Home</Link>
          <Link to="/saved" className="hover:text-sky-500">Saved Pokemon</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
