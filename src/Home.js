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
        <Link to={"/imageupload"}> Image Upload</Link>
        <Link to={"/employeedata"}> Empolyee Data</Link>
        
        <Link style={{ float: "right" }} to={"/login"}>
          Logout
        </Link>
        
      </div>
    </>
  );
};

export default Home;
