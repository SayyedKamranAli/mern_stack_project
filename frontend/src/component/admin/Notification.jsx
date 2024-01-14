import React, { useState } from "react";
import {
  Container,
  Grid,
  TextareaAutosize,
  Button,
  Typography,
  MenuItem,
  TextField,
} from "@mui/material";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";

function Notification() {
  const [inputOutputType, setInputOutputType] = useState("");

  const handleSelectChange = (event) => {
    setInputOutputType(event.target.value);
  };

  return (
    <>
      <TopBar />
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12} md={2}>
            <Sidebar />
          </Grid>
          <Grid item xs={12} md={10} style={{ marginRight: "300px" }}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={4}>
                <Typography
                  variant="h3"
                  style={{ marginTop: "80px" }}
                  className="text-light"
                >
                  Notification
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <TextField
                  select
                  label="Select User Type"
                  value={inputOutputType}
                  onChange={handleSelectChange}
                  variant="outlined"
                  fullWidth
                  style={{
                    backgroundColor: "transparent",
                    marginTop: "10px",
                    width: "90%",
                  }}
                >
                  <MenuItem value="input" style={{ color: "grey" }}>
                    All Users
                  </MenuItem>
                  <MenuItem value="output" style={{ color: "grey" }}>
                    Category
                  </MenuItem>
                </TextField>
              </Grid>
            </Grid>

            {inputOutputType !== "" && (
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Typography variant="h4" marginTop="20px">
                    {inputOutputType === "input" ? "All User" : "Category"}
                  </Typography>
                  <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid item xs={12} md={8}>
                      {inputOutputType === "input" ? (
                        <TextareaAutosize
                          fullWidth
                          rowsMin={5}
                          name="all user"
                          placeholder="Enter All User here"
                          style={{
                            resize: "vertical",
                            padding: "40px",
                            fontSize: "15px",
                            width: "100%",
                          }}
                        />
                      ) : (
                        <TextareaAutosize
                          fullWidth
                          rowsMin={5}
                          name="category"
                          placeholder="Enter Category here"
                          style={{
                            resize: "vertical",
                            padding: "40px",
                            fontSize: "15px",
                            width: "100%",
                          }}
                        />
                      )}
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={4}
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        marginTop: "16px",
                      }}
                    ></Grid>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginTop: "13px", marginRight: "90px" }}
                    >
                      Send
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Notification;







// Select four option

// import React, { useState } from "react";
// import {
//   Container,
//   Grid,
//   TextareaAutosize,
//   Button,
//   Typography,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import TopBar from "./TopBar";
// import Sidebar from "./Sidebar";

// function Notification() {
//   const [inputOutputType, setInputOutputType] = useState("");
//   const [textareaPlaceholder, setTextareaPlaceholder] = useState("");

//   const handleSelectChange = (event) => {
//     const selectedValue = event.target.value;
//     setInputOutputType(selectedValue);

//     // Set the corresponding placeholder text for the textarea based on the selected value
//     switch (selectedValue) {
//       case "input":
//         setTextareaPlaceholder("Enter All User here");
//         break;
//       case "output":
//         setTextareaPlaceholder("Enter Category here");
//         break;
//       case "subcategory":
//         setTextareaPlaceholder("Enter Subcategory here");
//         break;
//       case "maincategory":
//         setTextareaPlaceholder("Enter Maincategory here");
//         break;
//       default:
//         setTextareaPlaceholder("");
//         break;
//     }
//   };

//   return (
//     <>
//       <TopBar />
//       <Container maxWidth="md" style={{ marginRight: "330px" }}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} md={2}>
//             <Sidebar />
//           </Grid>
//           <Grid item xs={12} md={10}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={4}>
//                 <Typography
//                   variant="h3"
//                   style={{ marginTop: "20px" }}
//                   className="text-light"
//                 >
//                   Notification
//                 </Typography>
//               </Grid>
//             </Grid>

//             <Grid container spacing={2}>
//               <Grid item xs={12} md={4}>
//                 <Typography
//                   variant="h5"
//                   style={{ marginTop: "10px" }}
//                   className="text-light"
//                 >
//                   User Select Type
//                 </Typography>
//               </Grid>

//               <Grid item xs={12} md={4}>
//                 <Select
//                   value={inputOutputType}
//                   onChange={handleSelectChange}
//                   style={{
//                     background: "transparent",
//                     color: "white",
//                     border: "0px",
//                     width: "100%",
//                   }}
//                 >
//                   <MenuItem value="input" style={{ color: "grey" }}>
//                     All Users
//                   </MenuItem>
//                   <MenuItem value="output" style={{ color: "grey" }}>
//                     Category
//                   </MenuItem>
//                   <MenuItem value="subcategory" style={{ color: "grey" }}>
//                     Subcategory
//                   </MenuItem>
//                   <MenuItem value="maincategory" style={{ color: "grey" }}>
//                     Maincategory
//                   </MenuItem>
//                 </Select>
//               </Grid>
//             </Grid>

//             {inputOutputType !== "" && (
//               <Grid container spacing={3}>
//                 <Grid item xs={12}>
//                   <Typography variant="h4" marginTop="20px">
//                     {inputOutputType === "input"
//                       ? "All User"
//                       : inputOutputType === "output"
//                       ? "Category"
//                       : inputOutputType === "subcategory"
//                       ? "Subcategory"
//                       : "Maincategory"}
//                   </Typography>
//                   <TextareaAutosize
//                     fullWidth
//                     rowsMin={5}
//                     placeholder={textareaPlaceholder}
//                     style={{
//                       resize: "vertical",
//                       padding: "20px",
//                       fontSize: "15px",
//                       width: "100%",
//                     }}
//                   />
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     style={{ marginTop: "10px", width: "100%" }}
//                   >
//                     Send
//                   </Button>
//                 </Grid>
//               </Grid>
//             )}
//           </Grid>
//         </Grid>
//       </Container>
//     </>
//   );
// }

// export default Notification;

// Notification

// import React, { useState } from "react";
// import {
//   Container,
//   Grid,
//   TextField,
//   Button,
//   Typography,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import TopBar from "./TopBar";
// import Sidebar from "./Sidebar";

// function Notification() {
//   const [inputOutputType, setInputOutputType] = useState("");

//   const handleSelectChange = (event) => {
//     setInputOutputType(event.target.value);
//   };

//   return (
//     <>
//       <TopBar />
//       <Container maxWidth="md">
//         <Grid item xs={12} md={2}>
//           <Sidebar />
//         </Grid>
//         <Grid item xs={12} md={10}>
//           <Grid
//             container

//             spacing={2}
//           >
//             <Grid item xs={6} md={4}>
//               <Typography
//                 variant="h3"
//                 style={{ marginTop: "80px" }}
//                 className="text-light"
//               >
//                 Notification
//               </Typography>
//             </Grid>

//           </Grid>

//           <Grid
//             container

//             spacing={2}
//           >
//             <Grid item xs={12} md={8}>
//               <Typography
//                 variant="h5"
//                 style={{ marginTop: "10px" }}
//                 className="text-light"
//               >
//                 User Select Type
//               </Typography>
//             </Grid>

//             <Grid item xs={12} md={8} >
//               <Select
//                 value={inputOutputType}
//                 onChange={handleSelectChange}
//                 style={{
//                   background: "transparent",
//                   color: "white",
//                   border: "0px",
//                   marginTop: "10px",
//                   width:"50%"
//                 }}

//               >
//                 <MenuItem value="input" style={{ color: "grey" }}>
//                   All Users
//                 </MenuItem>
//                 <MenuItem value="output" style={{ color: "grey" }}>
//                   Category
//                 </MenuItem>
//               </Select>
//             </Grid>
//           </Grid>

//           {inputOutputType === "" && (
//             <Grid container spacing={3}>
//               <Grid item xs={12} md={8}>
//                 <Typography variant="h4" marginTop="20px">
//                   Notification
//                 </Typography>
//                 <Grid
//                   container
//                   spacing={2}
//                   justifyContent="center"
//                   alignItems="center"
//                 >
//                   <Grid item xs={12} md={8}>
//                     <TextField
//                       fullWidth
//                       variant="outlined"
//                       label="All User"
//                       name="all user"
//                       placeholder=""
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <Button variant="contained" color="primary">
//                       Add
//                     </Button>
//                   </Grid>
//                 </Grid>

//               </Grid>
//             </Grid>
//           )}

//           {inputOutputType === "input" && (
//             <Grid container spacing={3}>
//               <Grid item xs={12} md={8}>
//                 <Typography variant="h4" marginTop="20px" gutterBottom>
//                   Notification
//                 </Typography>
//                 <Grid
//                   container
//                   spacing={2}
//                   justifyContent="center"
//                   alignItems="center"
//                 >
//                   <Grid item xs={12} md={8}>
//                     <TextField
//                       fullWidth
//                       variant="outlined"
//                       label="All User"
//                       name="all user"
//                       placeholder=""
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <Button variant="contained" color="primary">
//                       Add
//                     </Button>
//                   </Grid>
//                 </Grid>

//               </Grid>
//             </Grid>
//           )}

//           {inputOutputType === "output" && (
//             <Grid container spacing={3}>
//               <Grid item xs={12} md={8}>
//                 <Typography variant="h4" marginTop="20px" gutterBottom>
//                   Category
//                 </Typography>
//                 <Grid
//                   container
//                   spacing={2}
//                   justifyContent="center"
//                   alignItems="center"
//                 >
//                   <Grid item xs={12} md={8}>
//                     <TextField
//                       fullWidth
//                       variant="outlined"
//                       label="Category"
//                       name="category"
//                       placeholder=""
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <Button variant="contained" color="primary">
//                       Add
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </Grid>
//           )}
//         </Grid>
//       </Container>
//     </>
//   );
// }

// export default Notification;
