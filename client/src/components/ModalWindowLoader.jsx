import { MoonLoader } from 'react-spinners';

function ModalWindowLoader() {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:"70px",
    marginLeft:"4%"
    // height: '100vh', // Adjust as needed
  };

  return (
    <div style={containerStyle}>
      <MoonLoader color="blue" size={40} />
    </div>
  );
}

export default ModalWindowLoader;
