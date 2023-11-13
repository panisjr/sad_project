import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import Avatar from "react-avatar-edit";
import img from "./icons/profile1.jpg";

function Profile() {
  const navigate = useNavigate();
  const back = () => {
    navigate("/studentDash"); // Define the route for StudentJavaDash
  };
  const [imagecrop, setImageCrop] = useState(false);
  const [image, setImage] = useState("");
  const [src, setSrc] = useState(false);
  const [profile, setProfile] = useState([]);
  const [pview, setpview] = useState(false);

  const profileFinal = profile.map((item) => item.pview);

  const onClose = () => {
    setpview(null);
  };

  const onCrop = (view) => {
    setpview(view);
  };

  const saveCropImage = () => {
    setProfile([...profile, { pview }]);
    setImageCrop(false);
  };
  return (
    <>
      <div className="profile_img text-center p-4">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img
            style={{
              width: "200px",
              height: "200px",
              marginLeft: "40%",
              marginTop: "10%",
              borderRadius: "50%",
              objectFit: "cover",
              border: "4px solid #0a0064",
            }}
            onClick={() => setImageCrop(true)}
            src={profileFinal.length ? profileFinal : img}
            alt=""
          />
          <Button onClick={() => setDialogs(true)}>dialog</Button>
          <label htmlFor="" className="mt-3 font-semibold text-5xl ">
            Ramel O. Panis Jr.{" "}
          </label>

          <Dialog
            visible={imagecrop}
            header={() => (
              <p htmlFor="" className="text-2xl font-semibold textColor ">
                Update Profile
              </p>
            )}
            onHide={() => setImageCrop(false)}
          >
            <div className="confirmation-content flex flex-column align-items-center">
              <Avatar
                width={500}
                height={400}
                onCrop={onCrop}
                onClose={onClose}
                src={src}
                shadingColor={"#474649"}
                backgroundColor={"#474649"}
              />
              <div className="flex flex-column align-items-center mt-5 w-12">
                <div className="flex justify-content-around w-12 mt-4">
                  <Button
                    onClick={saveCropImage}
                    label="Save"
                    icon="pi pi-check"
                  />
                </div>
              </div>
            </div>
          </Dialog>
          <InputText
            type="file"
            accept="/image/*"
            style={{ display: "none" }}
            onChange={(event) => {
              const file = event.target.files[0];
              if (file && file.type.substring(0, 5) === "image") {
                setImage(file);
              } else {
                setImage(null);
              }
            }}
          />
        </div>
      </div>

      <button onClick={back}>back</button>
    </>
  );
}

export default Profile;
