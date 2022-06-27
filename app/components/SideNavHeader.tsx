import logo from "~/../public/assets/logo.svg";
function Header () {
    return (
         <div className="flex items-center gap-4">
            <img src={logo} alt="logo" />  
            <span className="text-3xl leading-9 font-bold">Quiz</span>
         </div>
    );
}

export default Header;