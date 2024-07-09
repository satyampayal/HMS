import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { loginUser, registerUser } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
function UserRegister() {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [registerDetail, setRegisterDetail] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [previewImage, setPreviewImage] = useState("");
  const [loginData,setLoginData]=useState({
    email:'',
    password:'',
  });
  const handleImage = (e) => {
    e.preventDefault();
    const uploadImage = e.target.files[0];
    if (!uploadImage) return;
    setRegisterDetail({
      ...registerDetail,
      avatar: uploadImage,
    });
    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadImage);
    fileReader.addEventListener("load", function () {
      setPreviewImage(this.result);
    });
  };

  const handleUserInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setRegisterDetail({
      ...registerDetail,
      [name]: value,
    });
    setLoginData({
      ...loginData,
      [name]:value
    })
  };
  const registerHandler = async (e) => {
    e.preventDefault();
    if (
      !registerDetail.fullName ||
      !registerDetail.email ||
      !registerDetail.password
    ) {
      toast.error("please enter name,email or password");
      return;
    }
    const formData = new FormData();
    formData.append("fullName", registerDetail.fullName);
    formData.append("email", registerDetail.email);
    formData.append("password", registerDetail.password);
    formData.append("avatar", registerDetail.avatar);

   const response=await  dispatch(registerUser(formData));
   if (response?.payload?.data?.success) {
       
       const responseLogin=await dispatch(loginUser(loginData))
       if(responseLogin?.payload?.data?.success)
           navigate('/');
   }
   setRegisterDetail({
     email: '',
     fullName: '',
     password: '',
     avatar: ''
   }

   )
   setPreviewImage('');
  };
  return (
    <div className="  m-auto w-[100%]  h-[100vh] flex    items-center   justify-evenly  gap-2  bg-gradient-to-r from-cyan-500 to-blue-200 select-none">
      <form
        onSubmit={registerHandler}
        className="    flex  flex-col    text-white      rounded-lg  w-[50%]"
      >
        <h1 className="text-2xl  text-center   "> Register User </h1>
        <label htmlFor="image_upload" className=" cursor-pointer flex justify-center items-center m-auto">
          {previewImage ? (
            <img
              src={previewImage}
              className="w-24 h-24 m-auto rounded-full"
              alt=""
            />
          ) : (
            <BsPersonCircle className="w-24 h-24 m-auto text-white rounded-full" />
          )}
        </label>
        <input
          type="file"
          className="hidden"
          name="image_upload"
          id="image_upload"
          accept=".jpeg,.png,.svg,.jpg"
          onChange={handleImage}
        />
        <input
          type="text"
          placeholder=" please enter full name  "
          name="fullName"
          value={registerDetail.fullName}
          onChange={handleUserInput}
          className="  p-1 m-3  bg-transparent  border-b-2  border-white  placeholder:text-white"
        />
        <input
          type="email"
          name="email"
          placeholder="please enter email"
          value={registerDetail.email}
          onChange={handleUserInput}
          className="  p-1 m-3  bg-transparent  border-b-2  border-white  placeholder:text-white"

        />

        <input
          type="password"
          placeholder="Enter password"
          name="password"
          value={registerDetail.password}
          onChange={handleUserInput}
          className="  p-1 m-3  bg-transparent   border-b-2 border-white placeholder:text-white"
        />
        <button
          type="submit"
          className="text-2xl text-center  m-2 bg-blue-600  border border-blue-600 rounded-lg "
        >
          Register
        </button>

        <p className="text-center">--or--</p>
        <Link
          to={"/login"}
          className="text-2xl text-center  m-2 bg-green-500  border border-green-500 rounded-lg "
        >
          {" "}
          Login
        </Link>
      </form>
    </div>
  );
}

export default UserRegister;
