import logo from './LogoImage/Logo.png';

function Logo({width = "100px"}) {
  return (
    <img src={logo} alt="LogoImg" style={{ width } }/>
  )
}

export default Logo
