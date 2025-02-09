import React,{useState, useEffect, useRef  } from 'react'
import './Profile.css'
import Logo from './logo.png'
import { Link , useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Comments from './Comments';
let likesElemeents = null
let resl = null

let res
let rs = null
let newMessagess = null
// let newMessagess2 = null
let checkNewMessages2 = null
let loader2 = true 
// let noImage = 1
const regex = /^del_[0-9]+/;
let checkNewMessages = null
let checkNewCommennt
let checkNewComment = []
let rresponses = null

function Profile() {
    const [flag,setFlag] = useState(false)
  let [username, setUsername] = useState("");
  let [username2, setUsername2] = useState("");
  let [resc,setResc] = useState(null)
  const [notig, setNotig] = useState(null);
    let [newMessagess, setNewMessagess] = useState([]);
            const [newMessagefs, setNewMessageffs] = useState(null);
     const handleImageLoad2 = (e) => {
    // setIsLoaded(true);
    e.target.style.opacity = 1;
    console.log(e.target)
  };
const getUserDataak = async (username) => {
  let resp
  const data = { email: localStorage.getItem("email") , input: username }; 
  // console.log(data)
  try {
    resp = await axios.post('https://soc-net.info/api/getUserData.php', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // console.log(resp)
    // setFormDataa(prevState => ({
    //   ...prevState,
    //   older: res.data.response.image
    // }));
    // console.log(res.data)
    resp.data.followers.map(async (follower)=>{
      let sa = 0
      const da = { email: localStorage.getItem("email") ,id:follower.id }; 
      try {
        sa = await axios.post('https://soc-net.info/api/checkFollow.php', da, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        // console.log(s.data)
      } catch (error) {
        console.error('Error:', error);
      }
  // console.log(sa)
  follower.ok = sa.data
  // console.log(follower)
    })

    resp.data.following.map(async (follower)=>{
      let sad = 0
      const dad = { email: localStorage.getItem("email") ,id:follower.id }; 
      try {
        sad = await axios.post('https://soc-net.info/api/checkFollow.php', dad, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        // console.log(s.data)
      } catch (error) {
        console.error('Error:', error);
      }
  // console.log(sa)
  follower.ok = sad.data
    })
    
    // for (let follower in ) {

    
    // console.log(res.data)
    
    if(resp.data.response.image){
      setGood4(true)
      setImage2(false)
    }
    
    setFormData(prevState => ({
      ...prevState,
      e_mail: resp.data.response.email,
      firstName: resp.data.response.first_name,
      gender: resp.data.response.gender,
      lastName: resp.data.response.last_name,
      username: resp.data.response.username,
      id:resp.data.response.id,
      image:resp.data.response.image
    }));
  } catch (error) {
    console.error('Error:', error);
  }
 return resp;
};
  const location = useLocation();
    const [trigger, setTrigger] = useState(false)
    const [notgpv, setNotgp] = useState(null);
  
  // let username = ''
   const [loader, setLoader] = useState(true);
     const [checkNewComments, setCheckNewComments] = useState([]);
     const [contentt, setContentt] = useState("");
     const postComment = async (id,value,id_commented)=>{
      let data = {id_post:id}; 
      // console.log(id)
      setContentt("");
      let daa = null
      if(value!=="")
      {
        daa = {id_commented:id_commented,id_liker:rs.data.response.id,id_post:id,content:value}; 
        if(daa!==null){
      try {
        const like = await axios.post('https://soc-net.info/api/addComment.php', daa, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        // if(like.data===1){
        //   window.location.href = `#comment_${id}`
        //   window.location.reload();
        // }
    } catch (error) {
      console.error('Error:', error);
    }
  
    checkNewCommennt = setInterval(async () => {
      // if(checkNewComments && checkNewComments.data.length!==0)
      //   {
      //     window.location.href = `#${checkNewComments.data[checkNewComments.data.length-1].id}`
      //   }
    // if (msg.current) {
    //   observer.observe(msg.current, config)
    // }
    try {
      checkNewComment = await axios.post('https://soc-net.info/api/checkNewComments.php', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    // console.log(checkNewComment)
    setCheckNewComments(checkNewComment.data)
    clearInterval(checkNewCommennt)
    // clearInterval(checkNewCommennt);
  
    } catch (error) {
      console.error('Error:', error);
    }
  }, 1000);
    }}
  }
  // const [noImage,setNoImage] = useState(false)
  const [ress, setRess] = useState(null);
  // const [redss, setRedss] = useState(null);

  const searchParams = new URLSearchParams(location.search);
  useEffect(() => {
    const fetchDataa = async () => {
      try {
        // Fetch user data only once on component mount
        const email = localStorage.getItem("email");
        resl = await getUserDataak(email);
        // console.log(resl)
  
        const data = { 
          id: resl.data.response.id 
        };
  
        // Fetch messages
        const notgp = await axios.post('https://soc-net.info/api/getMessages.php', data, {
          headers: { 'Content-Type': 'application/json' }
        });
        console.log(notgp.data)
        setNotgp(notgp.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    // Run the fetchDataa function once when the component mounts
    fetchDataa();
  
    // If you want to poll for new messages after that, you can still set up the interval
    const checkNew = setInterval(async () => {
      try {
        const resln = await getUserDataak(localStorage.getItem("email"));
  
        const data = { 
          id: resln.data.response.id 
        };
  
        // Fetch new messages
        const notgp = await axios.post('https://soc-net.info/api/getMessages.php', data, {
          headers: { 'Content-Type': 'application/json' }
        });
        setNotgp(notgp.data);
      } catch (error) {
        console.error('Error:', error);
      }
    }, 1000);
  
    // Cleanup function to clear the interval
    return () => clearInterval(checkNew);
  
  }, []); // Empty dependency array ensures this useEffect runs only once
  username =  searchParams.get('username'); // Get the 'myParam' query parameter
  const getUserDataa = async (username) => {
  
    const data = { email: localStorage.getItem("email") , input: username }; 
    try {
      res = await axios.post('https://soc-net.info/api/getUserData.php', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(res)
      setFormDataa(prevState => ({
        ...prevState,
        older: res.data.response.image
      }));
      res.data.followers.map(async (follower)=>{
        let sa = 0
        const da = { email: localStorage.getItem("email") ,id:follower.id }; 
        try {
          sa = await axios.post('https://soc-net.info/api/checkFollow.php', da, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          // console.log(s.data)
        } catch (error) {
          console.error('Error:', error);
        }
    // console.log(sa)
    follower.ok = sa.data
      })

      res.data.following.map(async (follower)=>{
        let sad = 0
        const dad = { email: localStorage.getItem("email") ,id:follower.id }; 
        try {
          sad = await axios.post('https://soc-net.info/api/checkFollow.php', dad, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          // console.log(s.data)
        } catch (error) {
          console.error('Error:', error);
        }
    // console.log(sa)
    follower.ok = sad.data
      })
      
      // for (let follower in ) {
          
      
      if(res.data.image){
        setGood4(true)
        setImage2(false)
      }
      
      setFormDataa(prevState => ({
        ...prevState,
        e_maila: res.data.response.email,
        firstNamea: res.data.response.first_name,
        gendera: res.data.response.gender,
        lastNamea: res.data.response.last_name,
        usernamea: res.data.response.username,
        ida:res.data.response.id,
        imagea:res.data.response.image
      }));
    } catch (error) {
      console.error('Error:', error);
    }
    return res;
   
  };
    const getUserDataav = async (username) => {
  
    const data = { email: localStorage.getItem("email") , input: username }; 
    try {
      let fafa = await axios.post('https://soc-net.info/api/getUserData.php', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setFormDataav(prevState => ({
        ...prevState,
        older: fafa.data.response.image
      }));
      fafa.data.followers.map(async (follower)=>{
        let sa = 0
        const da = { email: localStorage.getItem("email") ,id:follower.id }; 
        try {
          sa = await axios.post('https://soc-net.info/api/checkFollow.php', da, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          // console.log(s.data)
        } catch (error) {
          console.error('Error:', error);
        }
    // console.log(sa)
    follower.ok = sa.data
      })

      fafa.data.following.map(async (follower)=>{
        let sad = 0
        const dad = { email: localStorage.getItem("email") ,id:follower.id }; 
        try {
          sad = await axios.post('https://soc-net.info/api/checkFollow.php', dad, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          // console.log(s.data)
        } catch (error) {
          console.error('Error:', error);
        }
    // console.log(sa)
    follower.ok = sad.data
      })
      
      // for (let follower in ) {
          
      
      if(fafa.data.image){
        setGood4(true)
        setImage2(false)
      }
          setResc(fafa)

      setFormDataav(prevState => ({
        ...prevState,
        e_mailav: fafa.data.response.email,
        firstNameav: fafa.data.response.first_name,
        genderav: fafa.data.response.gender,
        lastNameav:fafa.data.response.last_name,
        usernameav: fafa.data.response.username,
        idav:fafa.data.response.id,
        imageav:fafa.data.response.image
      }));
    } catch (error) {
      console.error('Error:', error);
    }
    return resc;
  };
     const [file, setFile] = useState(null);
   const [likes, setLikes] = useState([]);

    
    const closeBtnSidenave1 = useRef(null);
    const gh = useRef(null);
    
    const form = useRef(null);
    const po = useRef(null);
    const openComments = (id_post) => {
      // console.log(document.querySelector(`.allp.comments.boxC_${id_post}`))
      // console.log(id_post)
      // setCheckNewComments([])
      if(document.querySelector(`.allp.comments.boxC_${id_post}`).style.display=='none'){
        document.querySelector(`.allp.comments.boxC_${id_post}`).style.display='flex';
        // alert(11)
      }
      let data = {id_post:id_post}; 
      checkNewCommennt = setInterval(async () => {
          // if(checkNewComments && checkNewComments.data.length!==0)
          //   {
          //     window.location.href = `#${checkNewComments.data[checkNewComments.data.length-1].id}`
          //   }
        // if (msg.current) {
        //   observer.observe(msg.current, config)
        // }
        try {
          checkNewComment = await axios.post('https://soc-net.info/api/checkNewComments.php', data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        // console.log(checkNewComment)
        setCheckNewComments(checkNewComment.data)
        clearInterval(checkNewCommennt)
        // clearInterval(checkNewCommennt);

        } catch (error) {
          console.error('Error:', error);
        }
      }, 1000);
      // setVisibleOverlay(true)

    }
    const addNewPost = async (e)=>{
      e.preventDefault()
      let dataa
      if(file===null){
        window.location.href='/feed?p=0';
        closePost()
      }else{
        if(content!==''){
          dataa = { image:file,content:content,id:rs.data.response.id}; 
      }
        else{
          dataa = { image:file,id:rs.data.response.id}; 
        }
  
        try {
          const responses = await axios.post('https://soc-net.info/api/addNewPost.php', dataa, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          if(responses.data.success)
          {
              window.location.href='/feed';
          }  
      } catch (error) {
        console.error('Error:', error);
      }
      }
    }
   useEffect(() => {
        if (notig !== null) {
          console.log('Updated notifications:', notig);
        }
      }, [notig]); // This will run every time notig state is updated
    const closeBtnSidenave2 = useRef(null);
  // let { username } = useParams();
  //console.log(username)
  const follow = async (e,id) => {
    //console.log(id)

    let data
    if(id){
    data = { id_suiveur:rs.data.response.id,id_suivi:id }; 
    }else{
    data = { id_suiveur:rs.data.response.id,id_suivi:res.data.response.id }; 
    }
    try {
      await axios.post('https://soc-net.info/api/follow.php', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // console.log(rds)
      e.target.innerHTML = "<i className='fa-solid fa-check'></i> Followed";
      e.target.style.opacity = '0.6'
      e.target.style.pointerEvents = 'none'
      // console.log(rds)
    } catch (error) {
      console.error('Error:', error);
    }
   
  };
  const addMsg = async (e) => {
    e.preventDefault()
    let data

    data = { id_exp:resc.data.response.id,id_dest:rs.data.response.id,content:content }; 
    // data = {a:1,b:2}

    try {
      const resultat = await axios.post('https://soc-net.info/api/add_msg.php', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setContent("")
      // console.log(resultat)
      // msg.current.scrollTop = msg.current.scrollHeight;
      // console.log(msg.current)
    } catch (error) {
      console.error('Error:', error);
    }
   
  };
  // const pop = ()=>{
  //   console.log(1)
  // }
  const block = async () => {
    const data = { id_blocked:res.data.response.id,id_blocker:rs.data.response.id }; 
    // console.log(data)
    try {
      await axios.post('https://soc-net.info/api/block.php', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // console.log(rds)
      window.location.reload();

    } catch (error) {
      console.error('Error:', error);
    }
   
  };
  const unblock = async () => {
    const data = { id_unblocked:res.data.response.id,id_unblocker:rs.data.response.id }; 
    // console.log(data)
    try {
      await axios.post('https://soc-net.info/api/unblock.php', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // console.log(rds.data)
      window.location.reload();

    } catch (error) {
      console.error('Error:', error);
    }
   
  };
  const unfollow = async (e,id) => {
    //console.log(id)
    let data
    if(id){
     data = { id_suiveur:rs.data.response.id,id_suivi:id }; 
    }else{
    data = { id_suiveur:rs.data.response.id,id_suivi:res.data.response.response.id }; 
    }
    try {
      await axios.post('https://soc-net.info/api/unfollow.php', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // console.log(rds.data)
      e.target.innerHTML = "<i className='fa-solid fa-check'></i> Unfollowed";
      e.target.style.opacity = '0.6'
      e.target.style.pointerEvents = 'none'
      // console.log(rds)
    } catch (error) {
      console.error('Error:', error);
    }
   
  };
    

        const search = useRef(null);
        const msg = useRef(null);

        const dro = useRef(null);
        const dr = useRef(null);
        const [content, setContent] = useState("");
        const [newMessages, setNewMessages] = useState(null);

        const handleContentChange = (e)=>{
          setContent(e.target.value)
        }
        const [user, setUser] = useState("");
        const [followers, setFollowers] = useState(false);
        const [followers2, setFollowers2] = useState(false);

        // const [followerss, setFollowerss] = useState(false);

        const [following, setFollowing] = useState(false);
        const [following2, setFollowing2] = useState(false);



        const [usrs,setUsrs] = useState([])
        const [drop,setDrop] = useState(false)
        const handle = async (e)=>{
          setUser(e.target.value)
          const data = { input: e.target.value }; 
      
            try {
              const ras = await axios.post('https://soc-net.info/api/searchUser.php', data, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
             setUsrs(ras.data)
            } catch (error) {
              console.error('Error:', error);
            }
          }
    // const [file, setFile] = useState(null);
    // const [file2, setFile2] = useState(null);
    const [good3, setGood3] = useState(false);
    const [good4, setGood4] = useState(false);
    const [users,setUsers] = useState(null)
    const [good1, setGood1] = useState(false);
    const [good2, setGood2] = useState(false);
    const [good33, setGood33] = useState(false);
    const [profile,setProfile] = useState(true)
    const [profile2,setProfile2] = useState(false)
    const [redss, setRedss] = useState(null);

    // const [visible,setVisible] = useState(true)
    const [edit,setEditTrue] = useState(false)
    const [edt,setEdtTrue] = useState(false)

    // const [response, setResponse] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName:'',
        gender:'',
        e_mail:'',
        username:'',
        password:'',
        image:null
      });
      const [formDataa, setFormDataa] = useState({
        firstNamea: '',
        lastNamea:'',
        gendera:'',
        e_maila:'',
        usernamea:'',
        passworda:'',
        imagea:null
      });


    const [formDataav, setFormDataav] = useState({
        firstNameav: '',
        lastNameav:'',
        genderav:'',
        e_mailav:'',
        usernameav:'',
        passwordav:'',
        imageav:null
      });

      const handleChange1 = (e)=>{
        const { name, value } = e.target;
          setFormData(prevState => ({
            ...prevState,
            [name]: value
          }));
         
      }
      const handleChange2 = (e)=>{
        const { name, value } = e.target;
          setFormData(prevState => ({
            ...prevState,
            [name]: value
          }));
         
      }
      const handleChange3 = (e)=>{
        const { name, value } = e.target;
          setFormData(prevState => ({
            ...prevState,
            [name]: value
          }));
         
      }
      const handleChange4 = (e)=>{
        const { name, value } = e.target;
          setFormData(prevState => ({
            ...prevState,
            [name]: value
          }));
         
      }
      const handleChange5 = (e)=>{
        const { name, value } = e.target;
          setFormData(prevState => ({
            ...prevState,
            [name]: value
          }));
      }
      const handleChange6 = (e)=>{
        const { name, value } = e.target;
          setFormData(prevState => ({
            ...prevState,
            [name]: value
          }));
        
      }



      useEffect(() => {

        (async () => {
            // let rees = await getUserDataak(localStorage.getItem("email")); 
            let rees = await getUserDataa(username);  

            // console.log(rees)
            let data = {id:rees.data.response.id}; 
            // console.log(data)
            try {
              rresponses = await axios.post('https://soc-net.info/api/posts.php', data, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });

              // console.log(rresponses.data)
              if(rresponses.data.length>0)
                {
                  rresponses.data.map((item,index)=>{
                    let table = [item.num_of_likes,index]
                    // console.log(table)
                    setLikes((prevState) => [...prevState, table]);
                  })
                  setRedss(rresponses.data)
                  // console.log(rresponses.data)
                  setCheckNewComments(rresponses.data)
                  // console.log(rresponses.data)
                  // document.body.click();
                }
                // console.log(ress)
              } catch (error) {
              console.error('Error:', error);
            }
          })();
      }, []);

      useEffect(() => {

        (async () => {
            let rees = await getUserDataak(localStorage.getItem("email"));  
            // console.log(rees)
            let data = {id:rees.data.response.id}; 
            // console.log(data)
            try {
              rresponses = await axios.post('https://soc-net.info/api/retrievePosts.php', data, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              // console.log(rresponses.data)
              if(rresponses.data.length>0)
                {
                  rresponses.data.map((item,index)=>{
                    let table = [item.num_of_likes,index]
                    // console.log(table)
                    setLikes((prevState) => [...prevState, table]);
                  })
                  // console.log(rresponses.data)
                  setRess(rresponses.data)
                  // console.log(rresponses.data)
                  setCheckNewComments(rresponses.data)
                  // console.log(rresponses.data)
                  // document.body.click();
                }
                // console.log(ress)
              } catch (error) {
              console.error('Error:', error);
            }
          })();
      }, []);
    const getUserData = async (username) => {
  
      const data = { input: username }; 
      try {
        rs = await axios.post('https://soc-net.info/api/getUserData.php', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(rs)
        setFormData(prevState => ({
          ...prevState,
          older: rs.data.image
        }));
        rs.data.followers.map(async (follower)=>{
          let sa = 0
          const da = { email: localStorage.getItem("email") ,id:follower.id }; 
          try {
            sa = await axios.post('https://soc-net.info/api/checkFollow.php', da, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
            // console.log(s.data)
          } catch (error) {
            console.error('Error:', error);
          }
      // console.log(sa)
      follower.ok = sa.data
        })

        rs.data.following.map(async (follower)=>{
          let sad = 0
          const dad = { email: localStorage.getItem("email") ,id:follower.id }; 
          try {
            sad = await axios.post('https://soc-net.info/api/checkFollow.php', dad, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
            // console.log(s.data)
          } catch (error) {
            console.error('Error:', error);
          }
      // console.log(sa)
      follower.ok = sad.data
        })
        
        if(rs.data.response.image){
          setGood4(true)
          setImage2(false)
        }
        // console.log(rs)
        setFormData(prevState => ({
          ...prevState,
          e_mail: rs.data.response.email,
          firstName: rs.data.response.first_name,
          gender: rs.data.response.gender,
          lastName: rs.data.response.last_name,
          username: rs.data.response.username,
          id:rs.data.response.id,
          image:rs.data.response.image
        }));
      } catch (error) {
        console.error('Error:', error);
      }
     
    };
    
    
    const [style1,setStyle1] = useState(null)
    const [style2,setStyle2] = useState(null)
    const [visibleOverlay,setVisibleOverlay] = useState(false)
    const sidenave1 = useRef(null);
    const upsd = useRef(null);

    const sidenave2 = useRef(null);
    const popup=useRef(null)
    const ups=useRef(null)
    const upps=useRef(null)
    const op=useRef(null)

    const popup2=useRef(null)
    const popup23=useRef(null)
    const popup234=useRef(null)
    const popup2342=useRef(null)

    const popup2345=useRef(null)

    const popup2344=useRef(null)
    const popup23442=useRef(null)




    const popup4=useRef(null)
    const popup90=useRef(null)


    const log=useRef(null)
    
    if(location.state)
      localStorage.setItem("email", location.state.email);
    const [image, setImage] = useState(null);
    const [image2, setImage2] = useState(null);
    
    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImage(e.target.result); 
        };
        reader.readAsDataURL(file);
      } else {
        console.log("Please upload an image file.");
      }
    };
    const handleFileChange2 = (event) => {
      setProfile(!profile)
      // setFile2(event.target.files[0]);
      const file2 = event.target.files[0];
      setFormData(prevState => ({
        ...prevState,
        image: file2
      }));
      if (file2 && file2.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImage2(e.target.result); 
        };
        reader.readAsDataURL(file2);
      } else {
        console.log("Please upload an image file.");
      }
    };
    const [vis,setVis] = useState(false)
    const [viss,setViss] = useState(false)

    const opened = {
        width: '350px',
        opacity: '1',
        position:'absolute',
        zIndex:'100',

      };
      const closed = {
        width: '0px',
        opacity: '1',
        
        position:'absolute',
        zIndex:'100',

      };
      // const over = {
      //   height: '100%',
      //   width: '100%',
      //   position: 'fixed',
      //   zIndex:'15',
      //   top: '0',
      //   left: '0',
      //   backgroundColor: 'rgb(0,0,0)',
      //   backgroundColor: 'rgba(0,0,0, 0.5)',
      // }
    // const show = ()=>{

    //     setVisible(!visible)
       
    // }
   
    const closeNav1 = ()=>{
        setStyle1(closed)
        setStyle2(closed)
        setVisibleOverlay(false)
        document.body.style.overflow = "unset"


    }
    const closeNav2 = ()=>{
        setStyle2(closed)
        setStyle1(closed)
        setVisibleOverlay(false)
        document.body.style.overflow = "unset"
        // console.log(22)
    }
    const openNav1 = async ()=>{
        setStyle1(opened)
        setStyle2(closed)
        setVisibleOverlay(true)
        document.body.style.overflow = "hidden"
        try {
            await axios.get('https://soc-net.info/api/removeFlagOne.php', {
              headers: {
                'Content-Type': 'application/json',
              },
            });
        } catch (error) {
          console.error('Error:', error);
        }
    }
    const openPost = ()=>{
      setVis(!vis)
      setVisibleOverlay(true)
     }
     const openPost2 = (username)=>{
      setUsername2(username)
      getUserDataav(username)
      // console.log(username)
      // loader2 = true
      setViss(!viss)
      setLoader2(true); // Correct way to update state in React
      setVisibleOverlay(true)
      if(newMessagess && newMessagess.length!==0){
        window.location.href = `#${newMessagess[newMessagess.length-1].id}`
      }
     }
  const [loader2, setLoader2] = useState(false); // Define loader2 state

// useEffect(() => {
//       let data;
//       // console.log(11)
//       if (res && username!=="") {
//         data = { id_exp: res.data.response.id, username: username };
//         if (!loader2 && viss && msg.current) {
//           if(newMessagess && newMessagess.length!==0)
//             {
//               // console.log(111)
//               window.location.href = `#${newMessagess[newMessagess.length-1].id}`
//               setLoader2(false);
//             }
//         }
//         if (msg.current) {
//           observer.observe(msg.current, config)
//         }
//         const fetch = async () => {
//           try {
//             let newMessagess2 = await axios.post('https://soc-net.info/api/checkNewMessage3.php', data, {
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//             });
              // console.log(142)
  
//             // console.log('API Response:', response);
//             newMessagess = newMessagess2.data
//             if (newMessagess) {
//                 console.log("ok")
//               // console.log('Data exists:', newMessagess);
//               // window.location.href = `#${response.data[response.data.length-1].id}`
              
//               //   window.location.href = `#${newMessagess[newMessagess.length-1].id}`
  
//               if (Array.isArray(newMessagess) && newMessagess.length !== 0) {
//                 console.log("okno")
                
//                 // console.log('Before updating state:', newMessagess); // Log before state update
//                 setNewMessagess(newMessagess); // Update state properly
              
//                 // console.log('State updated:', newMessagess); // Log after state update
//                 // if(!isArrayEmpty(newMessagess))X

//                   // window.location.href = `#${newMessagess[newMessagess.length-1].id}`

//                 setLoader2(false);  // Correctly update loader state
//               }
//             } 
//           } catch (error) {
//             console.error('Error occurred during API call:', error);
//           }
//         };
  
//         // Set an interval to keep fetching new messages
//         checkNewMessages2 = setInterval(fetch, 1000);
//         return () => {
//           clearInterval(checkNewMessages2); // Cleanup the interval on component unmount or dependency change
//         };
//       }
//     }, [username, viss]);
    
     const openFollowers = ()=>{
      setFollowers(!followers)
      setVisibleOverlay(true)
     }
     const openFollowers2 = ()=>{
      setFollowers2(!followers2)
      setVisibleOverlay(true)
     }
     const openFollowing = ()=>{
      setFollowing(!following)
      setVisibleOverlay(true)
     }
     const openFollowing2 = ()=>{
      setFollowing2(!following2)
      setVisibleOverlay(true)
     }

  useEffect(() => {
    if (!res) return; // Early return if `res` is not available

    const data = { id_exp: res.data.response.id }; 
    const checkNewMessagess = setInterval(async () => {
      try {
        const response = await axios.post('https://soc-net.info/api/checkNewMessages2.php', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        setNewMessageffs(response.data); // Save the new messages to state
        // console.log(response.data);
        if(response.data!==0) // Log the messages to the console
          setFlag(true)
      } catch (error) {
        console.error('Error:', error);
      }
    }, 1000);

    // Cleanup function to clear the interval
    return () => clearInterval(checkNewMessagess);

  }, [res]); // Run effect again if `res` changes
     const closePost = ()=>{
      // setVis(!vis)
      setVisibleOverlay(false)
      popup2.current.style.animation = 'fadeOut 0.2s ease'
      // setViss(!viss)
      // alert(popup23.current.style.animation)
      popup2.current.addEventListener('animationend', () => {
        popup2.current.style.display = 'none'; // Remove the element from the layout after the animation ends
        setVis(!vis)
      });
     }  
      const closePost2 = ()=>{
    clearInterval(checkNewMessages)
    setLoader(true)
    // loader2 = false
    setLoader2(false); // Correct way to update state in React
    setVisibleOverlay(false)
    popup23.current.style.animation = 'fadeOut 0.2s ease'
    // alert(popup23.current.style.animation)
    popup23.current.addEventListener('animationend', () => {
      popup23.current.style.display = 'none'; // Remove the element from the layout after the animation ends
      setViss(!viss)
    });
   }

     const closePost23 = ()=>{
      setVisibleOverlay(false)
      popup234.current.style.animation = 'fadeOut 0.2s ease'
      popup234.current.addEventListener('animationend', () => {
        popup234.current.style.display = 'none'; 
        setFollowers(!followers)
      });
     }

     const closePost232 = ()=>{
      setVisibleOverlay(false)
      popup2342.current.style.animation = 'fadeOut 0.2s ease'
      popup2342.current.addEventListener('animationend', () => {
        popup2342.current.style.display = 'none'; 
        setFollowers2(false)
      });
     }

     const closePost234 = ()=>{
      setVisibleOverlay(false)

      popup2344.current.style.animation = 'fadeOut 0.2s ease'
      // alert(popup23.current.style.animation)
      popup2344.current.addEventListener('animationend', () => {
        popup2344.current.style.display = 'none'; // Remove the element from the layout after the animation ends
        setFollowing(!following)
      });
     }
     const closePost2342 = ()=>{
      setVisibleOverlay(false)
      popup23442.current.style.animation = 'fadeOut 0.2s ease'
      // alert(popup23.current.style.animation)
      popup23442.current.addEventListener('animationend', () => {
        popup23442.current.style.display = 'none'; // Remove the element from the layout after the animation ends
        setFollowing2(false)
      });
     }
    //  const closePost2349 = ()=>{
    //   setVisibleOverlay(false)
    //   popup2345.current.style.animation = 'fadeOut 0.2s ease'
    //   // alert(popup23.current.style.animation)
    //   popup2345.current.addEventListener('animationend', () => {
    //     popup2345.current.style.display = 'none'; // Remove the element from the layout after the animation ends
    //     setFollowerss(!followerss)
    //   });
    //  }
     
    const openNav2 = async ()=>{
        setStyle2(opened)
        setStyle1(closed)
        setVisibleOverlay(true)
        document.body.style.overflow = "hidden"
        try {
            await axios.get('https://soc-net.info/api/removeFlagTwo.php', {
              headers: {
                'Content-Type': 'application/json',
              },
            });
        } catch (error) {
          console.error('Error:', error);
        }
    }
    const handleUpdate = async () => {
      
      setGood1(false)
      setGood2(false)
      setGood33(false)

     if(formData.firstName===''){
        setGood1(true)
        getUserData(localStorage.getItem("email"))

      }else if(formData.lastName===''){
          setGood2(true)
          getUserData(localStorage.getItem("email"))

        }else if(formData.username===""){
            setGood33(true)
            getUserData(localStorage.getItem("email"))

          }else{
      try {
        const response = await axios.post('https://soc-net.info/api/updateProfile.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response.status === 200) {
          // console.log(response.data)
          setGood3(true)
        }
      } catch (error) {
        console.error('Error updating profile:', error);
      }
     }
     

    
    };
    useEffect(() => {
      document.body.style.overflow='unset'
    // cons:ole.log(`Count changed: ${count}`);
  }, []); // Runs when `count` changes
    useEffect(() => {
   
      (async () => {
        // e.preventDefault();
    
        const email = { email: localStorage.getItem("email") }; // Example data to send to PHP script
        try {
          const rsa = await axios.post('https://soc-net.info/api/getUsers.php', email, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
         setUsers(rsa.data)
        } catch (error) {
          console.error('Error:', error);
        }
       
      })();

      const handleClickOutside = (event) => {
        let commentsBox = document.querySelectorAll('.allp') 
        
        commentsBox.forEach((element) => {
          // console.log(element,)
          if(element.style.display == 'flex' && event.target.parentElement.parentElement.parentElement!==element && event.target.parentElement.parentElement.parentElement.parentElement!==element && event.target.tagName !== 'SPAN'){
            // console.log('ok')
            // console.log(event.target)
            element.style.display = 'none'
            setVisibleOverlay(false)
          }
        });
        // console.log(event.target)
        if(event.target.classList.value=='overlay' || popup2.current && !popup2.current.contains(event.target)){
          setVisibleOverlay(false)
        }
        if(event.target.classList.value=='overlay' || popup2344.current && !popup2344.current.contains(event.target)){
          setVisibleOverlay(false)
        }
        const elements = document.querySelectorAll('.dropdown-conten');
        
      //   likesElemeents = document.querySelectorAll('[class*="likes"]') 
      //   // console.log(event.target.classList.value)
      //   if(event.target.classList.value!=='slikes'){
      //   likesElemeents.forEach((element) => {
      //     if(element.style.display !== 'none' && element.id===event.target.id && !element.contains(event.target)){
      //       closeLikes(element.id)
      //     }
      //   }); 
      // }
       
        elements.forEach((element) => {
          if(!regex.test(event.target.id) && event.target!=element.previousElementSibling){
            element.style.display = 'none';
          }
          if((!regex.test(event.target.id) && event.target.id && event.target.nextElementSibling && event.target.id.slice(2)!=event.target.nextElementSibling.id)){
            element.style.display = 'none';
          }
        }); 
        if(!closeBtnSidenave2.current.contains(event.target) && sidenave2.current.contains(event.target)){
          closeNav2()
        }

        if(closeBtnSidenave1.current.contains(event.target) && sidenave1.current){
          setVisibleOverlay(false)
        }
        if(closeBtnSidenave2.current.contains(event.target) && sidenave2.current){
          setVisibleOverlay(false)
        }

        // if(!closeBtnSidenave1.current.contains(event.target) && sidenave1.current.contains(event.target)){
        //   setVisibleOverlay(true)
        //   setStyle1(opened)
        //   setStyle2(closed)
        // }
        // if(!closeBtnSidenave2.current.contains(event.target) && sidenave2.current.contains(event.target)){
        //   setVisibleOverlay(true)
        //   setStyle1(closed)
        //   setStyle2(opened)
        // }
       
        if(dr.current && !dr.current.contains(event.target) && dro.current && !dro.current.contains(event.target)){
          setDrop(false)
        }
        
          if(popup2.current && popup2.current.contains(event.target)){
            setVisibleOverlay(true);  // Hide the div
          }
          // Check if the click was outside the div
          if (sidenave1.current && !sidenave1.current.contains(event.target)) {
            if(popup23.current && popup23.current.contains(event.target))
              {setVisibleOverlay(true);}  // Hide the div
            if(popup234.current && popup234.current.contains(event.target))
              setVisibleOverlay(true);  // Hide the div
            if(popup2344.current && popup2344.current.contains(event.target))
              setVisibleOverlay(true);  // Hide the div
            if(popup2342.current && popup2342.current.contains(event.target))
              setVisibleOverlay(true);  // Hide the div
            if(popup23442.current && popup23442.current.contains(event.target))
              setVisibleOverlay(true);  // Hide the div
            if(popup2345.current && popup2345.current.contains(event.target))
              setVisibleOverlay(true);  // Hide the div
            // else
            //   setVisibleOverlay(false);  // Hide the div
              setStyle1(closed)
              setStyle2(closed)
          if(popup4.current && popup4.current!==event.target && popup23.current && !popup23.current.contains(event.target))
            {setLoader2(false);setLoader(true);upsd.current.style.display='none'}
          if(popup4.current && popup4.current!==event.target && popup234.current && !popup234.current.contains(event.target))
            upsd.current.style.display='none'
          if(popup4.current && popup4.current!==event.target && popup2344.current && !popup2344.current.contains(event.target))
            upsd.current.style.display='none'
          if(popup4.current && popup4.current!==event.target && popup2342.current && !popup2342.current.contains(event.target))
            upsd.current.style.display='none'
          if(popup4.current && popup4.current!==event.target && popup23442.current && !popup23442.current.contains(event.target))
            upsd.current.style.display='none'
          if(popup4.current && popup4.current!==event.target && popup2345.current && !popup2345.current.contains(event.target))
            upsd.current.style.display='none'


          
          
          if(popup90.current && popup90.current!==event.target && popup2344.current && !popup2344.current.contains(event.target))
            upsd.current.style.display='none'
          if(popup90.current && popup90.current!==event.target && popup23442.current && !popup23442.current.contains(event.target))
            upsd.current.style.display='none'
          if(popup90.current && popup90.current!==event.target && popup2345.current && !popup2345.current.contains(event.target))
            upsd.current.style.display='none'

          if(popup.current && popup.current!==event.target && popup23.current && !popup23.current.contains(event.target))
            {setLoader2(true);setLoader(true);upsd.current.style.display='none';}
          if(popup.current && popup.current!==event.target && popup234.current && !popup234.current.contains(event.target))
            upsd.current.style.display='none'
          if(popup.current && popup.current!==event.target && popup2344.current && !popup2344.current.contains(event.target))
            upsd.current.style.display='none'
          if(popup.current && popup.current!==event.target && popup2342.current && !popup2342.current.contains(event.target))
            upsd.current.style.display='none'
          if(popup.current && popup.current!==event.target && popup23442.current && !popup23442.current.contains(event.target))
            upsd.current.style.display='none'
          if(popup.current && popup.current!==event.target && popup2345.current && !popup2345.current.contains(event.target))
            upsd.current.style.display='none'
        }
          if (sidenave1.current  && !sidenave1.current.contains(event.target)) {
            if(popup2.current && popup2.current.contains(event.target))
              setVisibleOverlay(true);  // Hide the div
            // else
            //   setVisibleOverlay(false);  // Hide the div
              setStyle1(closed)
              setStyle2(closed)
          if(popup4.current && popup4.current!==event.target && popup2.current && !popup2.current.contains(event.target))
            upsd.current.style.display='none'
          if(popup90.current && popup90.current!==event.target && popup2.current && !popup2.current.contains(event.target))
            upsd.current.style.display='none'
          if(popup.current && popup.current!==event.target && popup2.current && !popup2.current.contains(event.target))
            upsd.current.style.display='none'
        }
        if (sidenave1.current  && !sidenave1.current.contains(event.target)) {
          if(popup23.current && popup23.current.contains(event.target))
            {setVisibleOverlay(true);}  // Hide the div
          if(popup234.current && popup234.current.contains(event.target))
            setVisibleOverlay(true);  // Hide the div
          if(popup2344.current && popup2344.current.contains(event.target))
            setVisibleOverlay(true);  // Hide the div
          if(popup2342.current && popup2342.current.contains(event.target))
            setVisibleOverlay(true);  // Hide the div
          if(popup23442.current && popup23442.current.contains(event.target))
            setVisibleOverlay(true);  // Hide the div
          if(popup2345.current && popup2345.current.contains(event.target))
            setVisibleOverlay(true);  // Hide the div
          // else
          //   setVisibleOverlay(false);  // Hide the div
            setStyle1(closed)
            setStyle2(closed)
        if(popup4.current && popup4.current!==event.target && popup23.current && !popup23.current.contains(event.target))
          {setLoader2(true);setLoader(true);upsd.current.style.display='none';}
        if(popup4.current && popup4.current!==event.target && popup234.current && !popup234.current.contains(event.target))
          upsd.current.style.display='none'
        if(popup4.current && popup4.current!==event.target && popup2344.current && !popup2344.current.contains(event.target))
          upsd.current.style.display='none'
        if(popup4.current && popup4.current!==event.target && popup2342.current && !popup2342.current.contains(event.target))
          upsd.current.style.display='none'
        if(popup4.current && popup4.current!==event.target && popup23442.current && !popup23442.current.contains(event.target))
          upsd.current.style.display='none'
        if(popup4.current && popup4.current!==event.target && popup2345.current && !popup2345.current.contains(event.target))
          upsd.current.style.display='none'

        if(popup90.current && popup90.current!==event.target && popup23.current && !popup23.current.contains(event.target))
          {setLoader2(true);setLoader(true);upsd.current.style.display='none';}
        if(popup90.current && popup90.current!==event.target && popup234.current && !popup234.current.contains(event.target))
          upsd.current.style.display='none'
        if(popup90.current && popup90.current!==event.target && popup2342.current && !popup2342.current.contains(event.target))
          upsd.current.style.display='none'
        
        
        
        if(popup.current && popup.current!==event.target && popup23.current && !popup23.current.contains(event.target))
          {setLoader2(true);setLoader(true);upsd.current.style.display='none';}
        if(popup.current && popup.current!==event.target && popup234.current && !popup234.current.contains(event.target))
          upsd.current.style.display='none'
        if(popup.current && popup.current!==event.target && popup2344.current && !popup2344.current.contains(event.target))
          upsd.current.style.display='none'
        if(popup.current && popup.current!==event.target && popup2342.current && !popup2342.current.contains(event.target))
          upsd.current.style.display='none'
        if(popup.current && popup.current!==event.target && popup23442.current && !popup23442.current.contains(event.target))
          upsd.current.style.display='none'
        if(popup.current && popup.current!==event.target && popup2345.current && !popup2345.current.contains(event.target))
          upsd.current.style.display='none'
      }
          if (sidenave2.current && !sidenave2.current.contains(event.target)) {
            if(popup2.current && popup2.current.contains(event.target))
              setVisibleOverlay(true);
            else
              setVisibleOverlay(false); 
              setStyle1(closed)
              setStyle2(closed)
          
          }
          if (sidenave2.current && !sidenave2.current.contains(event.target)) {
            if(popup23.current && popup23.current.contains(event.target))
              {setVisibleOverlay(true);}
            if(popup234.current && popup234.current.contains(event.target))
              setVisibleOverlay(true);
            if(popup2344.current && popup2344.current.contains(event.target))
              setVisibleOverlay(true);
            if(popup2342.current && popup2342.current.contains(event.target))
              setVisibleOverlay(true);
            if(popup23442.current && popup23442.current.contains(event.target))
              setVisibleOverlay(true);
            if(popup2345.current && popup2345.current.contains(event.target))
              setVisibleOverlay(true);
            // else
            //   setVisibleOverlay(false); 
              setStyle1(closed)
              setStyle2(closed)
        
          }
          if(popup4.current && popup4.current!==event.target && event.target===op.current){
            setProfile(!profile)
            setEditTrue(false)
            setEdtTrue(!edt)
            upsd.current.style.display='none'
          }
          if(popup90.current && popup90.current!==event.target && event.target===op.current){
            setProfile(!profile)
            setEditTrue(false)
            setEdtTrue(!edt)
            upsd.current.style.display='none'
          }
          if(popup.current && popup.current!==event.target && event.target===op.current){
            setProfile(!profile)
            setEditTrue(false)
            setEdtTrue(!edt)
            upsd.current.style.display='none'
          }
          if (popup2.current && !popup2.current.contains(event.target)) {
            popup2.current.style.animation = 'fadeOut 0.2s ease'
            popup2.current.addEventListener('animationend', () => {
              popup2.current.style.display = 'none';
              setVis(false)
            });
          }
          if (popup23.current && !popup23.current.contains(event.target)) {
            setLoader2(true)
            setLoader(true)
            popup23.current.style.animation = 'fadeOut 0.2s ease'
            popup23.current.addEventListener('animationend', () => {
              popup23.current.style.display = 'none';
              setViss(false)
            });
          }
          if (popup234.current && !popup234.current.contains(event.target)) {
            popup234.current.style.animation = 'fadeOut 0.2s ease'
            popup234.current.addEventListener('animationend', () => {
              popup234.current.style.display = 'none';
              setFollowers(false)
            });
          }
          if (popup2344.current && !popup2344.current.contains(event.target)) {
            popup2344.current.style.animation = 'fadeOut 0.2s ease'
            popup2344.current.addEventListener('animationend', () => {
              popup2344.current.style.display = 'none';
              setFollowing(false)
            });
          }
          if (popup2342.current && !popup2342.current.contains(event.target)) {
            popup2342.current.style.animation = 'fadeOut 0.2s ease'
            popup2342.current.addEventListener('animationend', () => {
              popup2342.current.style.display = 'none';
              setFollowers2(false)
            });
          }
          if (popup23442.current && !popup23442.current.contains(event.target)) {
            popup23442.current.style.animation = 'fadeOut 0.2s ease'
            popup23442.current.addEventListener('animationend', () => {
              popup23442.current.style.display = 'none';
              setFollowing2(false)
            });
          }
          if (popup2345.current && !popup2345.current.contains(event.target)) {
            popup2345.current.style.animation = 'fadeOut 0.2s ease'
            popup2345.current.addEventListener('animationend', () => {
              popup2345.current.style.display = 'none';
              // setFollowerss(false)
            });
          }
          if((popup90.current && popup90.current!==event.target && upsd.current && !upsd.current.contains(event.target)) ){
            upsd.current.style.display='none'
          }
          if(popup90.current && event.target!==popup90.current && event.target!==popup.current && upsd.current){
            if(event.target===ups.current){
              upsd.current.style.display='none'
              setEditTrue(true)
              setEdtTrue(!edt)
              // setProfile(false)
              setProfile2(false);
            }else {
              if(popup90.current && popup90.current!==event.target && event.target!==log.current && !log.current.contains(event.target)){
                if(event.target===upps.current ){
                  setProfile2(false)
                  setProfile(true)

                  setEditTrue(false)
                  setEdtTrue(false)
                  upsd.current.style.display='none'
                }
              }
            }
          }else{
            if(event.target===popup90.current){
              if(upsd.current.style.display==='none'){
upsd.current.style.display='block'

}else{

upsd.current.style.display='none'
}
            }
          }

          if((popup4.current && popup4.current!==event.target && upsd.current && !upsd.current.contains(event.target)) ){
            upsd.current.style.display='none'
          }
          if(popup4.current && event.target!==popup4.current && event.target!==popup.current && upsd.current){
            if(event.target===ups.current){
              upsd.current.style.display='none'
              setEditTrue(true)
              setEdtTrue(!edt)
              // setProfile(false)
              setProfile2(false);
            }else {
              if(popup4.current && popup4.current!==event.target && event.target!==log.current && !log.current.contains(event.target)){
                if(event.target===upps.current ){
                  setProfile2(false)
                  setProfile(true)

                  setEditTrue(false)
                  setEdtTrue(false)
                  upsd.current.style.display='none'
                }
              }
            }
          }else{
            if(event.target===popup4.current){
              if(upsd.current.style.display==='none'){
upsd.current.style.display='block'

}else{

upsd.current.style.display='none'
}
            }
          }
          if((popup.current && popup.current!==event.target && upsd.current && !upsd.current.contains(event.target)) ){
            upsd.current.style.display='none'
          }
          if(popup.current && event.target!==popup.current && event.target!==popup.current && upsd.current){
            if(event.target===ups.current){
              upsd.current.style.display='none'
              setEditTrue(true)
              setEdtTrue(!edt)
              // setProfile(false)
              setProfile2(false);
            }else {
              if(popup.current && popup.current!==event.target && event.target!==log.current && !log.current.contains(event.target)){
                if(event.target===upps.current ){
                  setProfile2(false)
                  setProfile(true)

                  setEditTrue(false)
                  setEdtTrue(false)
                  upsd.current.style.display='none'
                }
              }
            }
          }else{
            if(event.target===popup.current){
              if(upsd.current.style.display==='none'){
upsd.current.style.display='block'

}else{

upsd.current.style.display='none'
}
            }
          }
          if(!closeBtnSidenave1.current.contains(event.target) && sidenave1.current.contains(event.target)){
            openNav1()
          }

          if(sidenave2.current.contains(event.target) || (gh.current && gh.current.contains(event.target))){
            openNav2()
          }
        };
  
      document.addEventListener('mousedown', handleClickOutside);
      
    
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);

      };
    }, []);
    const observer = new MutationObserver((mutationsList, observer) => {
    mutationsList.forEach(mutation => {
        // console.log(mutation);
        // Example: log specific details
        // console.log(newMessagess)
        if (mutation.type === 'childList') {
          
          if(newMessagess && newMessagess.length!==0)
            {
              window.location.href = `#${newMessagess[newMessagess.length-1].id}`
            }
        } else if (mutation.type === 'attributes') {
            console.log('Attributes changed');
        } else if (mutation.type === 'characterData') {
            console.log('Text content changed');
        }
    });
});

  const config = {
      childList: true,
      attributes: true,
      subtree: true,
      characterData: true
  };
   useEffect(() => {
      let data;
      if (rs && username2!=="") {
      
          
        data = { id_exp: rs.data.response.id, username: username2 };
        if (!loader2 && viss && msg.current) {
            
          if(newMessagess && newMessagess.length!==0)
            {
                
              window.location.href = `#${newMessagess[newMessagess.length-1].id}`
              setLoader2(false);
            }
        }
        if (msg.current) {
          observer.observe(msg.current, config)
        }
        const fetch = async () => {
          try {
          console.log(data)
              
            let newMessagess2 = await axios.post('https://soc-net.info/api/checkNewMessage3.php', data, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
            console.log(newMessagess2)
            newMessagess = newMessagess2.data
            if (newMessagess) {
              console.log(newMessagess)
              if (Array.isArray(newMessagess)) {
                setNewMessagess(newMessagess); // Update state properly
                  console.log(newMessagess)
                setLoader2(false);  // Correctly update loader state
              } else {
                console.error('Response data is empty or not an array:', newMessagess2.data);
              }
            } else {
              console.error('API response did not contain expected data:', newMessagess2);
            }
          } catch (error) {
            console.error('Error occurred during API call:', error);
          }
        };
  
        // Set an interval to keep fetching new messages
        checkNewMessages2 = setInterval(fetch, 1000);
        return () => {
          clearInterval(checkNewMessages2); // Cleanup the interval on component unmount or dependency change
        };
      }
    }, [username2, viss,resc]); 
    useEffect(() => {
      // if(username!=null){
      //   console.log(username)
      // }else{
      //   console.log(username)
      // }
      // if (msg.current) {
      //   // msg.current.scrollTop = msg.current.scrollHeight;
      // }
      
      // username =  searchParams.get('username'); // Get the 'myParam' query parameter
      // console.log(username)

      getUserData(localStorage.getItem("email"))
      setFollowers(false)
      setFollowing(false)
      setVisibleOverlay(false)
      getUserDataa(username)

      if(sessionStorage.getItem('flag')==0){
        sessionStorage.setItem('flag', 1);
        // window.location.reload()
      }else{
        sessionStorage.setItem('flag', 0);
        window.location.reload()
      }
    
    }, [username]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch user data
          const res = await getUserDataak(localStorage.getItem("email"));
          const data = { 
            email: localStorage.getItem("email"), 
            id: res.data.response.id 
          };
  
          // Fetch notifications
          const notigp = await axios.post('https://soc-net.info/api/getNotifications.php', data, {
            headers: { 'Content-Type': 'application/json' }
          });
  
          console.log('Notifications response:', notigp.data);
  
          // Set notifications state
          setNotig(notigp.data);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchData();
    }, []); // Empty dependency array ensures this runs once when the component mounts
    
    useEffect(() => {
        setTrigger(!trigger);
        // console.log(11)
        // loader = !loader
        setContentt("")
      }, [checkNewComments]);
  return (
    <>
    {visibleOverlay && <div className="overlay"></div>}
    <header id="section1">
        <div style={{textAlign:'center'}}><Link to="/feed"><span id="logo">eSantePlus</span></Link></div>
        <div id="second">
        <div className="dropdown">
                  <input autocomplete="off" value={user} onChange={handle} onClick={()=>{search.current.style.display='block'}} type="text" placeholder='looking for someone...'/>
                  <div id="myDropdown" ref={search} className="dropdown-contentt">
                  <div style={{textAlign:'right',marginRight:'10px',marginTop:'10px'}}><i onClick={()=>{search.current.style.display='none'}} id="close"  className="fa-solid fa-x"></i></div>
        
                  {user==="" && <span style={{display:'inline-block',fontSize:'1.2em',marginBottom:'15px',opacity:'0.6'}}>Enter name or username</span>} 
          {user!=="" && usrs.length===0 && <span style={{display:'inline-block',fontSize:'1.2em',marginBottom:'15px',opacity:'0.6'}}>no user found !</span>} 
           {user!=="" && usrs.length>0 && <div style={{width:'100%',marginTop:'5px'}}>
            
            {usrs.map((item, index) => {
              return (
                  <div style={{display:'flex',marginBottom:'10px',justifyContent:'space-between'}} key={index}>
                    <div style={{display:'flex'}}>
                      {item.image!==null && <img onLoad={handleImageLoad2} onLoad={handleImageLoad2}
                          src={`https://soc-net.info/api/${item.image}`} 
                          alt="Preview" 
                          style={{
                              marginLeft: '1px',
                              marginBottom: '6px',
                              maxWidth: '100%',
                              marginRight: '15px',
                              height: '40px',
                              width: '40px',
                              verticalAlign: 'middle',
                              borderRadius: '50%',
                              cursor:'initial'
                          }} 
                      />}
                      {item.image===null && <i id="profile10" className="dropbtn fa-solid fa-user"></i>}
                      <div style={{overflow:'hidden',display:'flex',flexDirection:'column'}}>
                      <Link style={{color:"black"}} onClick={()=>{setProfile(!profile);setProfile2(false);setEditTrue(false);search.current.style.display='none'}} to={`/profile?username=${item.username}`}><span style={{display:'inline-block',fontWeight:'500',fontSize:'0.8em'}}>{item.first_name} {item.last_name}</span></Link>
                      <span style={{cursor:'initial',color:'rgba(0,0,0,0.5'}}>@{item.username}</span>
          
                    </div>
                    </div>
                    
                  </div>
              ); })}
  
              </div>}
            </div>
          </div>
        <nav>
            <Link to='/feed'><i className="fa-solid fa-house"></i></Link>
            <i onClick={openPost} className="fa-solid fa-circle-plus"></i>
            <div style={{display:'inline-block',position:'relative'}}>
            {notig!==null && notig.cou > 0 ? <div style={{borderRadius:'50%',backgroundColor:'red',width:'10px',height:'10px',position:'absolute',left:'30px',top:'16px'}}></div>:""}
            <i onClick={openNav1} className="fa-solid fa-bell"></i>
            </div>
            <div style={{display:'inline-block',position:'relative'}}>
              {notgpv!==null && notgpv.cou>0 ? <div style={{borderRadius:'50%',backgroundColor:'red',width:'10px',height:'10px',position:'absolute',left:'30px',top:'16px'}}></div>:""}
              <i onClick={openNav2} className="fa-solid fa-message"></i>
            </div>
            <div className="dropdown">
            {!image2 && formData.image && <img onLoad={handleImageLoad2} onLoad={handleImageLoad2} loading="lazy" ref={popup4}
            src={`https://soc-net.info/api/${formData.image}`} 
            alt="Preview" 
            style={{ marginLeft:'7px',marginBottom:'6px',maxWidth: '100%',marginRight:'15px', height: '35px' ,width:'35px',verticalAlign:'middle',borderRadius:'50%'}} 
          />}

            {image2 && <img onLoad={handleImageLoad2} onLoad={handleImageLoad2} loading="lazy"
              src={image2} 
              ref={popup90}
              alt="Preview" 
              style={{marginLeft:'7px',marginBottom:'6px',maxWidth: '100%',marginRight:'15px', height: '35px' ,width:'35px',verticalAlign:'middle',borderRadius:'50%'}} 
            />}
          
                {!formData.image && <i ref={popup} id="profile" className="dropbtn fa-solid fa-user"></i>}
                {true && <div ref={upsd} style={{display:'none'}} className="dropdown-content">
                    <div ref={upps} onClick={() => {setUsername(formData.username);setProfile2(false);setProfile(true);setEdtTrue(false);}}><i className="fa-solid fa-address-book"></i>My Profile</div>               
                    <div ref={ups}  onClick={() => {setProfile2(!profile2);setEditTrue(!edit)}}><i className="fa-solid fa-pen-to-square"></i>Edit Profile</div>
                    <hr/>
                    <Link ref={log} style={{color:'black'}} to='/'><div><i className="fa-solid fa-right-from-bracket"></i>Logout</div></Link>
                </div>}
            </div>

        </nav>
        </div>
    </header>
    <div ref={sidenave1} style={style1} className="sidenav">
    <a ref={closeBtnSidenave1} className="closebtn" onClick={closeNav1}>&times;</a>
    <h1>Notifications</h1>
    {notig != null && Array.isArray(notig.notifications) && notig.notifications.map((item, index) => {
  return (
    <div key={index} style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex',alignItems:'center',marginLeft:'20px'}}>
        {/* Display the profile image */}
        
        {item.profile_pic == null ? 
  <i id="profile11" className="dropbtn fa-solid fa-user"></i> :
  <img onLoad={handleImageLoad2} loading="lazy" style={{
    marginLeft: '1px',
    marginBottom: '6px',
    maxWidth: '100%',
    marginRight: '5px',
    height: '35px',
    width: '35px',
    verticalAlign: 'middle',
    borderRadius: '50%'
}} src={`https://soc-net.info/api/${item.profile_pic}`} alt="Profile" />
}

        <div>
          <Link style={{display:'inline-block',padding:'0',color:'black',fontSize:'1em'}} to={`/profile?username=${item.username}`}><p style={{fontWeight:'500'}}>{item.name}</p></Link> 
          <p style={{color:'rgba(0,0,0,0.5)',fontSize:'0.9em',fontWeight:'500'}}>@{item.username} {item.texte} !</p>
          <p style={{color:'rgba(0,0,0,0.5)',fontSize:'0.8em',fontWeight:'500'}}>{item.moment}</p>
        </div>
        {
          item.flag == 1 && <div style={{borderRadius:'50%',backgroundColor:'rgba(0,0,255,0.6)',width:'10px',height:'10px',position:'relative',left:'10px'}}></div>
        }
      </div>
      <hr/>
    </div>
  );
})}
  </div>
  <div ref={sidenave2} style={style2} className="sidenav">
    <a ref={closeBtnSidenave2} className="closebtn" onClick={closeNav2}>&times;</a>
    <h1>Messages</h1>
    {notgpv != null && Array.isArray(notgpv.notifications) && notgpv.notifications.map((item, index) => {
  return (
    <>
      <div key={index} style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{position:'relative',display: 'flex',alignItems:'center',marginLeft:'20px'}}>
          {item.profile_pic == null ? 
            <i id="profile11" className="dropbtn fa-solid fa-user"></i> :
            <img onLoad={handleImageLoad2} loading="lazy" style={{
              marginLeft: '1px',
              marginBottom: '6px',
              maxWidth: '100%',
              marginRight: '5px',
              height: '35px',
              width: '35px',
              verticalAlign: 'middle',
              borderRadius: '50%'
            }} src={`https://soc-net.info/api/${item.profile_pic}`} alt="Profile" />
          }
          <div>
            <p ref={gh} onClick={() => {openPost2(item.username);getUserDataav(item.username);closeNav2();}} style={{display:'inline-block',padding:'0',color:'black',fontSize:'1em',fontWeight:'500'}}>{item.name}</p> 
            <p style={{color:'rgba(0,0,0,0.5)',fontSize:'0.9em',fontWeight:'500'}}>{item.content}</p>
            <p style={{color:'rgba(0,0,0,0.5)',fontSize:'0.8em',fontWeight:'500'}}>{item.moment}</p>
          </div>
          {item.flag == 1 && <div style={{borderRadius:'50%',backgroundColor:'rgba(0,0,255,0.6)',width:'10px',height:'10px',position:'relative',left:'40px'}}></div>}
        </div>
        <hr/>
      </div>
    </>
  );
})}
  </div>
  {edit && <div id="edit">

      <p style={{padding:'10px 20px',fontSize:'1.3em',fontWeight:'400'}}>Edit Profile</p>
      {good3 && <span style={{margin:'10px 20px',color:'green'}}>Profile is updated !</span>}<br/>
      {!good4 && !image2 && <i ref={popup} style={{display:'inline-block',margin:'10px 20px'}} id="profile2" className="dropbtn fa-solid fa-user"></i>}
      {image2 && (
        <div style={{border:'1px solid rgb(200,200,200)',padding:'2px',margin:'30px 20px',width:'150px',height:'auto'}}>
          <img onLoad={handleImageLoad2} loading="lazy"
            src={image2} 
            alt="Previewa" 
            style={{ maxWidth: '100%', height: 'auto' }} 
          />
        </div>
      )}
      {!image2 && good4 && (
        <div style={{border:'1px solid rgb(200,200,200)',padding:'2px',margin:'30px 20px',width:'150px',height:'auto'}}>
          <img onLoad={handleImageLoad2} loading="lazy"
            src={`https://soc-net.info/api/${formData.image}`} 
            alt="Previeww" 
            style={{ maxWidth: '100%', height: 'auto' }} 
          />
        </div>
      )}
      <p style={{padding:'10px 20px',fontSize:'1.1em',fontWeight:'400'}}>Change Profile Picture</p>

      <input autocomplete="off" accept="image/*"
        onChange={handleFileChange2} className="put" type="file"/><br/>

      <input autocomplete="off" value={formData.firstName} onChange={handleChange1} placeholder='first name' id="firstName" type="text" name="firstName"/>
      
      <input autocomplete="off" value={formData.lastName} onChange={handleChange2} type="text" id="lastName" placeholder='last name' name="lastName"/>
      {good1 && <span style={{margin:'10px 20px',display:'inline-block',color:'rgb(243, 10, 100)',border:'1px solid rgb(203, 184, 190)',padding:'15px 10px',backgroundColor:'#f8d7da',width:'90%'}}>first name is not given</span>}
      {good2 && <span style={{margin:'10px 20px',display:'inline-block',color:'rgb(243, 10, 100)',border:'1px solid rgb(203, 184, 190)',padding:'15px 10px',backgroundColor:'#f8d7da',width:'90%'}}>last name is not given</span>}<br/>
<div id="dio" style={{margin:'0px 10px 0px 20px',display:'flex',alignItems:'center'}}>
      <input autocomplete="off" checked={formData.gender === 'male'} onChange={handleChange6} disabled style={{marginRight:'10px'}} type="radio" id="male" value='male' name="gender"/><label style={{marginRight:'10px'}} htmlFor='male'>Male</label>
            <input autocomplete="off" checked={formData.gender === 'female'} onChange={handleChange6} disabled style={{marginRight:'10px'}} type="radio" id="female" value='female' name="gender"/><label htmlFor='female' style={{marginRight:'10px'}}>Female</label>
            <input autocomplete="off" checked={formData.gender === 'other'} onChange={handleChange6} disabled type="radio" id="other" value='other' name="gender" style={{marginRight:'10px'}}/><label htmlFor='other' style={{marginRight:'10px'}}>Other</label>
            </div>
            <input autocomplete="off" value={formData.e_mail} disabled onChange={handleChange3} placeholder='email' style={{margin:'0px 10px 0px 20px',height:'50px',width:'90%'}} type="email" name="e_mail"/>
            <input autocomplete="off" value={formData.username} onChange={handleChange4} placeholder='username' style={{margin:'15px 10px 0px 20px',height:'50px',width:'90%'}} type="text" name="username"/>
            {good33 && <span style={{margin:'10px 20px',display:'inline-block',color:'rgb(243, 10, 100)',border:'1px solid rgb(203, 184, 190)',padding:'15px 10px',backgroundColor:'#f8d7da',width:'90%'}}>username is not given</span>}
            <input autocomplete="off" value={formData.password} onChange={handleChange5} placeholder='new password' style={{margin:'15px 10px 0px 20px',height:'50px',width:'90%'}} type="password" name="password"/>
            <a href='#section1'><button onClick={handleUpdate} style={{padding:'7px',fontSize:'1.1em',outine:'none',border:'none',borderRadius:'5px',margin:'20px 10px 0px 20px',color:'white',backgroundColor:'#0b5ed7'}}>Update Profile</button></a>
</div>}
  {vis && <div className='all'>
  <div ref={popup2} className="postp">
    <div style={{marginBottom:'20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <h3>Add New Post</h3>
      <i id="close" onClick={closePost} className="fa-solid fa-x"></i>
    </div>
    <hr style={{marginBottom:'20px',width:'100%',opacity:'0.4'}}/>
    <form action='' onSubmit={addNewPost} method="post">
    {image && (
        <div>
          <img onLoad={handleImageLoad2} loading="lazy"
            src={image} 
            alt="Preview" 
            style={{ maxWidth: '100%', height: 'auto',width:'100%'}} 
          />
        </div>
      )}
      <input autocomplete="off" accept="image/*" 
        onChange={handleFileChange} className="put" type="file"/><br/>
      <label htmlFor="say">Say Something</label><br/>
      <input autocomplete="off" style={{height:'35px',padding:'5px',width:'100%',marginTop:'10px',marginBottom:'10px'}} type="text" name="say" id="say"/><br/>
      <input type="submit" autocomplete="off" value="Post" style={{padding:'10px',color:'white',backgroundColor:'#0b5ed7'}}/>
    </form>
  </div>
  </div>}
  
    {!edit && !profile2 && profile && <div id="kol">
      <div id="pol">

      {!image2 && formDataa.imagea && (<img onLoad={handleImageLoad2} loading="lazy"
            src={`https://soc-net.info/api/${formDataa.imagea}`} 
            alt="Preview" 
            id="image30" 
          />)}
          {image2 && (<img onLoad={handleImageLoad2} loading="lazy"
            src={image2} 
            alt="Preview" 
            id="image30" 
          />)}
          {!formDataa.imagea && <i id="profile30" style={{marginRight:'15px'}} className="dropbtn fa-solid fa-user"></i>}
        <div id="alg">
          <div style={{display:'flex',width:'100%',justifyContent:'space-between',alignItems:'center'}}><span style={{fontSize:'2em'}}>{formDataa.firstNamea} {formDataa.lastNamea}</span>


          <div style={{position:'relative',display:'flex',flexDirection:'column'}}>{res && res.data.response.blocked2===0 && rs && res.data.response.id!==rs.data.response.id && res.data.response.blocked!==1 && <i onClick={()=>setDrop(!drop)} ref={dr} style={{fontSize:'2em'}} className="fa-solid fa-ellipsis"></i>}
          {drop && <div ref={dro} className="dropdown-contenp">
                    <div onClick={()=>{openPost2(res.data.response.username);setDrop(false);}}><i className="fa-solid fa-message"></i><span>Message</span></div>               
                    <div onClick={()=>block()}><i style={{marginLeft:'4px',display:'inline-block'}} className="fa-solid fa-x"></i><span>Block</span></div>
                </div>}</div>
          </div>
          <span style={{marginTop:'10px',fontSize:'1.1em',opacity:'0.6'}}>@{formDataa.usernamea}</span>
          {res && res.data.response.blocked2===0 && res.data.response.blocked!==1 && <div id="manque">
    <button className='follo'><i style={{marginRight:'5px'}} className="fa-solid fa-signs-post"></i>{res && res.data.response.n_posts} Posts</button>
          <button onClick={()=>{openFollowers();}} className='follo'><i style={{marginRight:'5px'}} className="fa-solid fa-people-arrows"></i>{res && res.data.response.num_of_followers} Followers</button>
          <button onClick={()=>{openFollowing();}} className='follo'><i style={{marginRight:'5px'}} className="fa-solid fa-address-book"></i>{res && res.data.response.num_of_following} Following</button>
          </div>}
          {
            res && rs && res.data.response.blocked2===0 && res.data.response.id!==rs.data.response.id && res.data.response.blocked!==1 && 
            <>
            {res && res.data.response.blocked2===0 &&res.data.response.number===0 && <button onClick={(e,id)=>follow(e,res.data.response.id)} className='follo'>Follow</button>}
            {res && res.data.response.blocked2===0 &&res.data.response.number>0 && <button onClick={(e)=>unfollow(e,res.data.response.id)} className='unfollo'>Unfollow</button>}
            </>
          }

          {
            res && res.data.response.blocked2===0 && res.data.response.blocked!==0 &&  
            <button onClick={()=>unblock()} className='unblock'>Unblock</button>
          }
          {
            res && res.data.response.blocked2!==0 &&  
            <span style={{marginTop:'10px',border:'1px solid rgba(150, 1, 1,0.3)',padding:'15px 10px',fontSize:'1.1em',borderRadius:'5px',color:'rgb(150, 1, 1)',backgroundColor:'rgba(235,80,80,0.5)'}}>@{formDataa.usernamea} blocked you !</span>
          }
          
        </div>
        </div>
      </div> }
      


      {viss && <div ref={po} className='all'>
  <div ref={popup23} style={{overflowY:'hidden',overflowX:'hidden',height:'90vh',display:'flex',flexDirection:'column',justifyContent:'space-around'}} className="post">
  <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
    <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>{formDataav.imageav && (<img onLoad={handleImageLoad2} loading="lazy"
            src={`https://soc-net.info/api/${formDataav.imageav}`} 
            alt="Preview" 
            // id="image30" 
            style={{marginRight:'10px',objectFit: 'cover',width:'45px',height:'45px',borderRadius:'50%'}}
          />)}{!formDataav.imageav && <i id="profile31" className="dropbtn fa-solid fa-user"></i>}<span style={{fontSize:'1.3em'}}>{formDataav.firstNameav} {formDataav.lastNameav}(@{formDataav.usernameav})</span>
         </div>
                <i id="close" style={{fontSize:'1.2em',left:'20px'}} onDoubleClick={closePost2} onClick={closePost2} className="fa-solid fa-x"></i>

                </div>
                <hr style={{width:'100%',opacity:'0.4'}}/>

    
    <form ref={form} style={{height:'90%',overflowX:'hidden',verticalAlign:'top',display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'center'}} onSubmit={addMsg} method="post">
      <div ref={msg} style={{overflowX:'hidden',wordWrap:'break-word',position:'relative',zIndex:'1',overflowY:'scroll',height:'100%',width:'100%',display:'flex',flexDirection:'column',alignSelf:'flex-start'}}>
       {loader2 && <div className="loader"></div>}
      {!loader2 && newMessagess!==null && newMessagess.map((item,index) => {
          return (
            rs.data.response.id === item.id_dest ? 
              <div key={index} id={item.id} style={{fontSize:'0.9em',wordWrap:'break-word',alignSelf:'flex-end',width:'60%',color:'white',borderRadius:'5px',margin:'10px 10px',padding:'10px',backgroundColor:'#0c6dfd'}}>
                <span>{item.content}</span><br/>
                <span style={{fontSize:'0.8em'}}>{item.moment}</span>
              </div> :
              <div key={index} id={item.id} style={{fontSize:'0.9em',alignSelf:'flex-start',width:'60%',color:'black',borderRadius:'5px',margin:'10px 10px',padding:'10px',border:'1px solid rgba(0,0,0,0.5)',backgroundColor:'#FFF'}}><span>{item.content}</span><br/>
              <span style={{fontSize:'0.8em',color:'rgba(0,0,0,0.6)'}}>{item.moment}</span>
              </div> 
          );
        })}
      </div>
      <div style={{width:'100%',padding:'5px',display:'flex',justifyContent:'space-around',alignItems:'center'}}>
        <input autocomplete="off" value={content} onChange={handleContentChange} placeholder='say something...' type="text" name="say" id="say"/>
        <button className="send" type="submit">Send</button>
        </div>
    </form>
  </div>
  </div>}

  {followers && <div className='all'>
  <div ref={popup234} className="postp">
    <div style={{marginBottom:'20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <h3>Followers</h3>
      <i id="close" onClick={closePost23} className="fa-solid fa-x"></i>
    </div>
    <hr style={{marginBottom:'20px',width:'100%',opacity:'0.4'}}/>
    {res && res.data && <div style={{width:'100%',marginTop:'20px'}}>
                  
      {res.data.followers != [] && res.data.followers.map((item) => {
  return (
    <div style={{ display: 'flex', marginBottom: '10px', justifyContent: 'space-between' }} key={item.id}>
      <div style={{ display: 'flex' }}>
        {item.image ? (
          <img
            src={`https://soc-net.info/api/${item.image}`}
            alt="Profile Preview"
            style={{
              marginLeft: '1px',
              marginBottom: '6px',
              maxWidth: '100%',
              marginRight: '15px',
              height: '45px',
              width: '45px',
              verticalAlign: 'middle',
              borderRadius: '50%',
            }}
          />
        ) : (
          <i id="profile10" className="dropbtn fa-solid fa-user"></i>
        )}
        <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <Link style={{ color: 'black' }} to={`/profile?username=${item.username}`}>
            <span style={{ display: 'inline-block', fontWeight: '500' }}>
              {item.first_name} {item.last_name}
            </span>
          </Link>
          <span style={{ color: 'rgba(0,0,0,0.5)' }}>@{item.username}</span>
        </div>
      </div>
      {item.ok===0 && <button onClick={(e) => follow(e, item.id)} className='follo'>Follow</button>}

      {item.ok!==0  && <button onClick={(e)=>unfollow(e,item.id)} className='unfollo'>Unfollow</button>}
    </div>
  );
})}

      
                </div>}
  </div>
  </div>}

  {following && <div className='all'>
  <div ref={popup2344} className="postp">
    <div style={{marginBottom:'20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <h3>Following</h3>
      <i id="close" onClick={closePost234} className="fa-solid fa-x"></i>
    </div>
    <hr style={{marginBottom:'20px',width:'100%',opacity:'0.4'}}/>
    <div>
      {res && res.data && <div style={{width:'100%',marginTop:'20px'}}>
                  
      {res.data.following!=[] && res.data.following.map((item) => {
  return (
    <div style={{ display: 'flex', marginBottom: '10px', justifyContent: 'space-between' }} key={item.id}>
      <div style={{ display: 'flex' }}>
        {item.image ? (
          <img
            src={`https://soc-net.info/api/${item.image}`}
            alt="Profile Preview"
            style={{
              marginLeft: '1px',
              marginBottom: '6px',
              maxWidth: '100%',
              marginRight: '15px',
              height: '45px',
              width: '45px',
              verticalAlign: 'middle',
              borderRadius: '50%',
            }}
          />
        ) : (
          <i id="profile10" className="dropbtn fa-solid fa-user"></i>
        )}
        <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <Link style={{ color: 'black' }} to={`/profile?username=${item.username}`}>
            <span style={{ display: 'inline-block', fontWeight: '500' }}>
              {item.first_name} {item.last_name}
            </span>
          </Link>
          <span style={{ color: 'rgba(0,0,0,0.5)' }}>@{item.username}</span>
        </div>
      </div>
      {item.ok===0 && <button onClick={(e) => follow(e, item.id)} className='follo'>Follow</button>}

      {item.ok!==0  && <button onClick={(e)=>unfollow(e,item.id)} className='unfollo'>Unfollow</button>}
    </div>
  );
})}

      
                </div>}
    </div>
  </div>
  </div>}




  {followers2 && <div className='all'>
  <div ref={popup2342} className="postp">
    <div style={{marginBottom:'20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <h3>Followers</h3>
      <i id="close" onClick={closePost232} className="fa-solid fa-x"></i>
    </div>
    <hr style={{marginBottom:'20px',width:'100%',opacity:'0.4'}}/>
    
    {rs && rs.data && <div style={{width:'100%',marginTop:'20px'}}>
                  
      {rs.data.followers != [] && rs.data.followers.map((item) => {
  return (
    <div style={{ display: 'flex', marginBottom: '10px', justifyContent: 'space-between' }} key={item.id}>
      <div style={{ display: 'flex' }}>
        {item.image ? (
          <img
            src={`https://soc-net.info/api/${item.image}`}
            alt="Profile Preview"
            style={{
              marginLeft: '1px',
              marginBottom: '6px',
              maxWidth: '100%',
              marginRight: '15px',
              height: '45px',
              width: '45px',
              verticalAlign: 'middle',
              borderRadius: '50%',
            }}
          />
        ) : (
          <i id="profile10" className="dropbtn fa-solid fa-user"></i>
        )}
        <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              
              <Link style={{ color: 'black' }} onClick={()=>{setProfile2(false);setProfile(!profile);setFollowers2(false);setVisibleOverlay(false);}} to={`/profile?username=${item.username}`}>
            <span style={{ display: 'inline-block', fontWeight: '500' }}>
              {item.first_name} {item.last_name}
            </span>
          </Link>
          <span style={{ color: 'rgba(0,0,0,0.5)' }}>@{item.username}</span>
        </div>
      </div>
      {item.ok===0 && <button onClick={(e) => follow(e, item.id)} className='follo'>Follow</button>}

      {item.ok!==0  && <button onClick={(e)=>unfollow(e,item.id)} className='unfollo'>Unfollow</button>}
    </div>
  );
})}

      
                </div>}
  </div>
  </div>}

  {following2 && <div className='all'>
  <div ref={popup23442} className="postp">
    <div style={{marginBottom:'20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <h3>Following</h3>
      <i id="close" onClick={closePost2342} className="fa-solid fa-x"></i>
    </div>
    <hr style={{marginBottom:'20px',width:'100%',opacity:'0.4'}}/>
    <div>
      {rs && rs.data && <div style={{width:'100%',marginTop:'20px'}}>
                  
      {rs.data.following!=[] && rs.data.following.map((item) => {
  return (
    <div style={{ display: 'flex', marginBottom: '10px', justifyContent: 'space-between' }} key={item.id}>
      <div style={{ display: 'flex' }}>
        {item.image ? (
          <img
            src={`https://soc-net.info/api/${item.image}`}
            alt="Profile Preview"
            style={{
              marginLeft: '1px',
              marginBottom: '6px',
              maxWidth: '100%',
              marginRight: '15px',
              height: '45px',
              width: '45px',
              verticalAlign: 'middle',
              borderRadius: '50%',
            }}
          />
        ) : (
          <i id="profile10" className="dropbtn fa-solid fa-user"></i>
        )}
        <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <Link style={{ color: 'black' }} onClick={()=>{setProfile2(false);setProfile(!profile);setFollowers2(false);setFollowing2(false);setVisibleOverlay(false);}} to={`/profile?username=${item.username}`}>
            <span style={{ display: 'inline-block', fontWeight: '500' }}>
              {item.first_name} {item.last_name}
            </span>
          </Link>
          <span style={{ color: 'rgba(0,0,0,0.5)' }}>@{item.username}</span>
        </div>
      </div>
      {item.ok===0 && <button onClick={(e) => follow(e, item.id)} className='follo'>Follow</button>}

      {item.ok!==0  && <button onClick={(e)=>unfollow(e,item.id)} className='unfollo'>Unfollow</button>}
    </div>
  );
})}

      
                </div>}
    </div>
  </div>
  </div>}

  {<div style={{textAlign:'center',marginBottom:'20px'}}>
        <h1 style={{marginBottom:'10px'}}>Posts</h1>
        {(res && (res.data.response.blocked2!==0 || res.data.response.blocked!==0)) ? <p style={{width:'70%',margin:'auto',padding:'15px',backgroundColor:'rgba(0,0,0,0.2)'}}><i style={{marginRight:'10px',color:'#FFF',borderRadius:'50%',padding:'10px',backgroundColor:'rgba(0,0,0,0.7)'}} className="fa-solid fa-x"></i>You are not allowed to see posts !</p> :
        <div style={{textAlign:'center',display:'flex',flexWrap:'wrap',width:'70%',margin:'auto'}}>
        {redss!==null && redss.length!=0 ? redss.map((item, index) => {
      return (
          <div id={`sen_${item.id_post}`} className="edcctp" key={index}>
            
            <img onLoad={handleImageLoad2} loading="lazy"
                onClick={()=>openComments(item.id_post)}
                src={`https://soc-net.info/api/${item.photo}`} 
                alt="Preview" 
                style={{
                    // marginLeft: '1px',
                    objectFit:'cover',
                    marginBottom: '6px',
                    maxWidth: '100%',
                    marginRight: '15px',
                    display:'inline-block',
                    height: '200px',
                    width: '300px',
                    verticalAlign: 'middle',
                }} 
            />
            
          </div>
      );
  }):<p style={{width:'70%',margin:'auto',padding:'15px',backgroundColor:'rgba(0,0,0,0.2)'}}><i style={{marginRight:'10px',color:'#FFF',borderRadius:'50%',padding:'10px',backgroundColor:'rgba(0,0,0,0.7)'}} className="fa-solid fa-x"></i>You don't have any post</p>}  </div>}</div>}
  {redss!==null && redss.length!=0 && redss.map((item,index)=>{
          return(
            <div style={{display:'none'}} className={`allp comments boxC_${item.id_post}`} key={item.id_post}>
                <div className='postg'>
                  <div className='maroc'><img onLoad={handleImageLoad2} loading="lazy" src={`https://soc-net.info/api/${item.photo}`}/></div>
                  <div className="senegal">
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                      <div style={{display:'flex',alignItems:'center'}}>
                      {item.profile_pic==null && <i id="profile111" className="dropbtn fa-solid fa-user"></i>}
            {item.profile_pic!=null && <img onLoad={handleImageLoad2} loading="lazy"
                src={`https://soc-net.info/api/${item.profile_pic}`} 
                alt="Preview" 
                style={{
                    marginLeft: '1px',
                    marginBottom: '6px',
                    maxWidth: '100%',
                    marginRight: '5px',
                    height: '55px',
                    width: '55px',
                    verticalAlign: 'middle',
                    borderRadius: '50%'
                }} 
            />}
                        <div style={{marginLeft:'10px',display:'flex',flexDirection:'column'}}>
                          <span style={{fontWeight:'500',fontSize:'1em'}}>{item.first_name} {item.last_name}</span>
                          <span style={{color:'rgba(0,0,0,0.5)',fontWeight:'500',fontSize:'1em'}}>@{item.username}</span>
                        </div>
                      </div>
                      <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end'}}>
                        <span>{item.num_of_likes} likes</span>
                        <span style={{color:'rgba(0,0,0,0.5)',fontSize:'0.9em'}}>{item.formatted_time}</span>
                      </div>
                    </div>

                    <div>

                    </div>
                    <hr style={{opacity:'0.5',width:'100%'}}/>
                    <div className="france">

       <Comments trigger={trigger} checkNewComments={checkNewComments} />

                    </div>
                    <hr style={{margin:'0px auto',opacity:'0.5',width:'100%'}}/>
                    <div style={{width:'100%',display:'flex',justifyContent:'space-around',alignItems:'center'}}>
                        <input autocomplete="off" placeholder='say something...' type="text" className="sayy"/>
                      <button onClick={(e)=>{postComment(item.id_post,e.target.previousElementSibling.value,item.id);e.target.previousElementSibling.value="";}} className={`send_${item.id_post}`} type="submit">Post</button>
                    </div>
                  </div>
                </div>
            </div> 
          );
         }) }
  </>
  )
}

export default Profile
