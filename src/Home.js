import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const usenavigate = useNavigate();
//   const [customerlist, listupdate] = useState(null);

  useEffect(() => {
    let username = sessionStorage.getItem("username");
    if (username === "" || username === null) {
      usenavigate("/login");
    }
  }, [usenavigate]);

  return (
    <>
      <div className="header">
        <Link to={"/"}>Home</Link>
        <Link style={{ float: "right" }} to={"/login"}>
          Logout
        </Link>
        
      </div>
      <h1>Welcome Anivesh Singh</h1>
    </>
  );
};

export default Home;
