import React from "react";
import topvabor_logo from "../../assets/image/topvabor_logo.png";
import profileimg from "../../assets/image/profileimg.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authProvider/AuthProvider";

function Header() {
  const navigate = useNavigate();
  const auth = useAuth();
  const user = auth?.user;
  const avatar = user?.name?.charAt(0) || "A";

  const handleLogout = () => {
    // Clear user data from local storage or state
    localStorage.clear();

    // Redirect to the main page
    navigate("/");
  };
   const handleProfile =()=>{


    window.location.href="/profile"

   }

 

  return (
    <div>
      <header>
        <nav class="navbar  navbar_Topvabor">
          <div class="container">
            <a class="navbar-brand" href="/category">
              <img src={topvabor_logo} alt="" />
            </a>
            <form class="d-flex search_bar" role="search">
              {/* <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                />
                <span class="input-group-text" id="basic-addon2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_75_9692)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.5 4.00001C8.77609 4.00001 7.12279 4.68483 5.90381 5.90382C4.68482 7.1228 4 8.7761 4 10.5C4 12.2239 4.68482 13.8772 5.90381 15.0962C7.12279 16.3152 8.77609 17 10.5 17C12.2239 17 13.8772 16.3152 15.0962 15.0962C16.3152 13.8772 17 12.2239 17 10.5C17 8.7761 16.3152 7.1228 15.0962 5.90382C13.8772 4.68483 12.2239 4.00001 10.5 4.00001ZM2 10.5C2.00012 9.1446 2.32436 7.80887 2.94569 6.60427C3.56702 5.39966 4.46742 4.3611 5.57175 3.57525C6.67609 2.78939 7.95235 2.27902 9.29404 2.08672C10.6357 1.89442 12.004 2.02576 13.2846 2.46979C14.5652 2.91382 15.7211 3.65766 16.6557 4.63925C17.5904 5.62084 18.2768 6.81171 18.6576 8.11252C19.0384 9.41333 19.1026 10.7864 18.8449 12.117C18.5872 13.4477 18.015 14.6975 17.176 15.762L20.828 19.414C21.0102 19.6026 21.111 19.8552 21.1087 20.1174C21.1064 20.3796 21.0012 20.6304 20.8158 20.8158C20.6304 21.0012 20.3796 21.1064 20.1174 21.1087C19.8552 21.111 19.6026 21.0102 19.414 20.828L15.762 17.176C14.5086 18.164 13.0024 18.7792 11.4157 18.9511C9.82905 19.123 8.22602 18.8448 6.79009 18.1482C5.35417 17.4517 4.14336 16.3649 3.29623 15.0123C2.44911 13.6597 1.99989 12.096 2 10.5ZM9.5 7.00001C9.5 6.73479 9.60536 6.48044 9.79289 6.2929C9.98043 6.10537 10.2348 6.00001 10.5 6.00001C11.6935 6.00001 12.8381 6.47412 13.682 7.31803C14.5259 8.16194 15 9.30654 15 10.5C15 10.7652 14.8946 11.0196 14.7071 11.2071C14.5196 11.3947 14.2652 11.5 14 11.5C13.7348 11.5 13.4804 11.3947 13.2929 11.2071C13.1054 11.0196 13 10.7652 13 10.5C13 9.83697 12.7366 9.20108 12.2678 8.73224C11.7989 8.2634 11.163 8.00001 10.5 8.00001C10.2348 8.00001 9.98043 7.89465 9.79289 7.70712C9.60536 7.51958 9.5 7.26523 9.5 7.00001Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_75_9692">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
              </div> */}

             {user ? <div class="dropdown">
                <button
                  class="btn profile-btn bg-success text-white"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {/* <img src={profileimg} alt="" /> */}
                  <span>{avatar.toUpperCase()}</span>
                </button>
                <ul class="dropdown-menu">

                <li>
                    <a class="dropdown-item" onClick={handleProfile}>
                      Profile
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" onClick={handleLogout}>
                      Logout
                    </a>
                    </li>
                  
                </ul>
              </div> : null}
            </form>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
