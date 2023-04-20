
import userCircleIcon from "../../assets/svg/Common/userIconBlack.svg";

export default function StratusUser({
    name,
    email,
    withLink = false,
    link = "",
  }) { 
    return <>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "10px",
            borderBottom: "1px solid #A9A4A4",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={userCircleIcon} alt="UserIcon" width={40} height={40} />
            <div style={{ marginLeft: "5px" }}>
              <p style={{ margin: "0px", fontSize: "18px" }}>{name}</p>
              <small>{email}</small>
              <br></br>
              <small>{link}</small>
            </div>
          </div>
          <div style={{display:"flex", flexDirection:"column", alignItems:"end", }}>
            <p style={{ color: "red" }}>Remove</p>
            <br></br>
            {withLink && <p style={{ color: "#1E3A8A", cursor:"pointer  " }}>Regenrate</p>} 
          </div>
        </div>
    </>
  }