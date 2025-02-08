import React, { useEffect, useState }  from 'react';
import './Admin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleUnBlock = async (e,email) => {
    try {
       const responsee = await axios.post('https://soc-net.info/api/unBlockUser.php',  {
                email:email
              });
      window.location.reload(true);

        } catch (error) {
          console.error('Error sending form data:', error);
          // Handle error state or show user a message
        }
};
  const handleBlock = async (e,email) => {
    try {
       const responsee = await axios.post('https://soc-net.info/api/blockUser.php',  {
                email:email
              });
      window.location.reload(true);
      
        } catch (error) {
          console.error('Error sending form data:', error);
          // Handle error state or show user a message
        }
};

const handleVerify = async (e,email) => {
  e.target.innerHTML = '<span className="verify">Verified</span>';
  e.target.style.opacity = '0.5';
  try {
       const responsee = await axios.post('https://soc-net.info/api/activate.php',  {
                email:email
              });
        } catch (error) {
          console.error('Error sending form data:', error);
          // Handle error state or show user a message
        }

};

  
  
  

  const login = async (username, password, email) => {
  const formData = {
    username: username,
    password: password,
  };
  console.log(formData);

  try {
    // Send formData to PHP backend
    const response = await axios.post('https://soc-net.info/api/auth.php', formData);
    console.log('Form data sent successfully:', response.data);

    if (response.data.response2 && response.data.response2.success === 1) {
      navigate('/feed', { state: { email: email } });
    }

    if(response.data.response2 && response.data.response2.success===2){
              navigate('/blocked', { state: { email:response.data.response1.email } });
            }
  } catch (error) {
    console.error('Error sending form data:', error);
  }
};

  useEffect(() => {
    // Define your API URL
    const url = 'https://soc-net.info/api/stats.php';

    // Perform the GET request using Axios
    axios.get(url)
      .then(response => {
        setData(response.data); // Save the data to state
        console.log(response.data);
        setLoading(false); // Stop loading
      })
      .catch(err => {
        setError(err); // Set the error state
        setLoading(false); // Stop loading
      });
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <>
    <header className="app-header">
        <div className="navbar">
          <button className="sidebar-toggle">
            <i className="icon-list"></i>
          </button>
          <div className="navbar-right">
            <button className="fullscreen-toggle">
              <i className="icon-maximize"></i>
              <i className="icon-minimize"></i>
            </button>
            <div className="user-menu">
              <a href="/"><span className="logout-button">Logout</span></a>
            </div>
          </div>
        </div>
      </header>
    <div className="app-wrapper">
      <aside className="app-sidebar">
        <div className="sidebar-brand">
          eSantePlus
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className="nav-item active">
              <a href="#">Dashboard</a>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="app-main">
        <div className="app-content">
          <div className="info-boxes">
            <div className="info-box primary">
                <i className="fa-solid fa-user"></i>
                <div className="info-content">
                <span className="info-text">Total Users</span>
                <span className="info-number">{data && data[4]}</span>
              </div>
            </div>

            <div className="info-box danger">
                <i className="fa-solid fa-signs-post"></i>
                <div className="info-content">
                <span className="info-text">Total Posts</span>
                <span className="info-number">{data && data[2]}</span>
              </div>
            </div>

            <div className="info-box success">
                <i className="fa-solid fa-comment"></i>
                <div className="info-content">
                <span className="info-text">Total Comments</span>
                <span className="info-number">{data && data[3]}</span>
              </div>
            </div>

            <div className="info-box warning">
                <i className="fa-solid fa-heart"></i>
                <div className="info-content">
                <span className="info-text">Total Likes</span>
                <span className="info-number">{data && data[1]}</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Users List</h5>
            </div>
            <div className="card-body">
  <table>
  <tr><td>#No</td><td>User</td><td>Actions</td></tr>
  {data && data[0].map((item, index) => (
      <tr key={index}>
        <td>#{item.id}</td>  {/* Display row number */}
        <td><div style={{display:'flex'}}>
          {item.image==null ? <i id="profile10" className="dropbtn fa-solid fa-user"></i> : <img onLoad={handleImageLoad} loading="lazy" style={{
                      marginLeft: '1px',
                      marginBottom: '6px',
                      maxWidth: '100%',
                      marginRight: '15px',
                      height: '40px',
                      opacity: isLoaded ? 1 : 0,
                      width: '40px',
                      verticalAlign: 'middle',
                      transition: 'opacity 0.5s ease',
                      borderRadius: '50%',
                      cursor:'initial'
                  }} src={`https://soc-net.info/api/${item.image}`} alt='profile'/>}
            <div>
              <span style={{fontWeight:'bold'}}>{item.first_name} {item.last_name}</span> - <span style={{color:'gray'}}>@{item.username}</span><br/>
              <span style={{color:'gray'}}>{item.email}</span>
            </div>
            </div>
        </td>  {/* Assuming item has a 'user' property */}
        <td>
          <span onClick={()=>login(item.username,item.password,item.email)} style={{color:'white',backgroundColor:'green',borderRadius:'5px',padding:'5px 10px',display:'inline-block',marginBottom:'10px',marginRight:'5px'}}>Login User</span>   
           {(item.active=='1' && item.blocked=="0") && <span className="block" onClick={(e) => handleBlock(e, item.email)}>Block</span> }   
           {(item.active=='1' && item.blocked=="1") && <span className="unblock" onClick={(e) => handleUnBlock(e, item.email)}>Unblock</span> }   
           {item.active=='0' && <span onClick={(e) => handleVerify(e, item.email)} className="verify">Verify</span>}   
        </td>  {/* Assuming item has an 'actions' property */}
      </tr>
    ))}</table>
            </div>
          </div>
        </div>
      </main>
    </div></>
  );
}

export default Admin;
