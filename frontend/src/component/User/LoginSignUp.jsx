import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Grid, TextField, Button, Avatar, Typography, IconButton, InputAdornment, MenuItem } from '@mui/material';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux'
import { login, register } from '../../actions/userAction';
import { Link, redirect, useLocation, useNavigate } from 'react-router-dom';
import { getIntrest } from '../../actions/intrestAction';
// import  {useDispatch,useSelector} from 'react-redux'

// import { Visibility, VisibilityOff } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        overflow: 'hidden',
    },
    signUpLink: {
        color: '#0066cc',
        textDecoration: 'none',
        cursor: "pointer", // Add cursor style to indicate clickability
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    image: {
        backgroundImage: 'url(your_image_url_here)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        [theme.breakpoints.down('sm')]: {
            display: 'none', // Hide the image on small screens
        },
    },
    formContainer: {
        padding: theme.spacing(4),
        background: '#f9f9f9',
        borderRadius: theme.spacing(2),
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    loginHeading: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: theme.spacing(3),
        color: '#0066cc',
    },
    userAvatarContainer: {
        margin: theme.spacing(2),
    },
    userAvatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    textField: {
        marginBottom: theme.spacing(2),
    },
    forgotPasswordLink: {
        color: '#0066cc',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
}));

const LoginSignUp = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const { error, isAuthenticated } = useSelector((state) => state.user)
    const { interests } = useSelector((state) => state.allinterest)

    useEffect(() => {
        dispatch(getIntrest())
    }, [])

    console.log('interests 1', interests)



    const [loginName, setLoginName] = useState("")
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [signUpState, setsignUpState] = useState(false)
    const [interestdata, setInterestdata] = useState('')



    const handleInterest = (selectedValue) => {
        console.log('option interests', selectedValue)
        const selectedInterest = interests.find(option => option._id === selectedValue);
        if (selectedInterest) {
            // setInterestdata(selectedValue);
            setInterestdata(selectedInterest.name);
        }

    }

    const loginSubmit = (e) => {
        e.preventDefault();
        console.log("Login Form Submitted")
        dispatch(login(loginEmail, loginPassword))
    }

    const registerSubmit = (e) => {
        e.preventDefault()
        dispatch(register(loginName, loginEmail, loginPassword, interestdata))
    }

    useEffect(() => {

        if (isAuthenticated) {
            // navigate("/account") //Earlier
            console.log("test_loginPage")
            navigate("/") //Now
        }

    }, [dispatch, error, alert, isAuthenticated, navigate, redirect])


    const handleForgotPassword = () => {
        // Implement the logic to handle the "Forgot Password" link click
        // This function could redirect the user to a password recovery page or show a modal with a password reset form, etc.
    };

    //   const randomImage = 'url-to-your-image.jpg';
    const randomImage = "https://picsum.photos/1200/800"
    // const userImage = "https://via.placeholder.com/150";
    const userImage = "https://picsum.photos/150"

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <Grid container component="main" className={classes.root}>
            {/* Left side: Image */}
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                className={classes.image}
                style={{ backgroundImage: `url(${randomImage})` }}
            />

            {/* Right side: Login/Signup Form */}
            <Grid item xs={12} sm={8} md={5} className={classes.formContainer}>
                {
                    !signUpState && (
                        <div className={classes.form}>
                            {/* Place your form content here */}

                            <Typography variant="h4" component="h1" className={classes.loginHeading}>
                                Login
                            </Typography>

                            {/* New: User Avatar */}
                            <div className={classes.userAvatarContainer}>
                                <Avatar alt="User Avatar" src={userImage} className={classes.userAvatar} />
                            </div>
                            <Typography
                                variant="body2"
                                className={classes.signUpLink}
                                onClick={() => setsignUpState(true)}
                            >
                                Don't have an account? Sign up here
                            </Typography>

                            <form onSubmit={loginSubmit}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    autoComplete="email"
                                    autoFocus
                                    type='email'
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    name="password"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" onClick={handleShowPassword}>
                                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Button type="submit" fullWidth variant="contained" color="primary">
                                    Sign In
                                </Button>
                                <Link href="#" onClick={handleForgotPassword} variant="body2" className={classes.forgotPasswordLink}>
                                    Forgot Password?
                                </Link>
                            </form>
                        </div>
                    )
                }
                {
                    signUpState && (
                        <div className={classes.form}>
                            {/* Place your form content here */}

                            <Typography variant="h4" component="h1" className={classes.loginHeading}>
                                SignUp
                            </Typography>

                            {/* New: User Avatar */}
                            <div className={classes.userAvatarContainer}>
                                <Avatar alt="User Avatar" src={userImage} className={classes.userAvatar} />
                            </div>
                            <Typography
                                variant="body2"
                                className={classes.signUpLink}
                                onClick={() => setsignUpState(false)}
                            >
                                Already have an account ? LogIn
                            </Typography>

                            <form onSubmit={registerSubmit}>

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    value={loginName}
                                    onChange={(e) => setLoginName(e.target.value)}
                                    autoComplete="name"
                                    type='text'
                                />

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    autoComplete="email"
                                    autoFocus
                                    type='email'
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    name="password"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" onClick={handleShowPassword}>
                                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                {/* interest  */}
                                {/* <TextField
                                    fullWidth
                                    label="Interests"
                                    variant="outlined"
                                    select
                                    // value={formData.categoryId}
                                    value={interestdata.name}
                                    onChange={(event) => handleInterest(event.target.value)}

                                    required
                                    style={{ marginBottom: "16px" }}
                                >
                                    {interests.map((option) => (
                                        // <MenuItem key={option} value={option} onClick={() => handlecategoryId(option)}>
                                        // <MenuItem key={option._id} value={option._id}>
                                        <MenuItem key={option._id} value={option._id}>


                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField> */}

                                <Button type="submit" fullWidth variant="contained" color="primary">
                                    Sign In
                                </Button>
                                <Link href="#" onClick={handleForgotPassword} variant="body2" className={classes.forgotPasswordLink}>
                                    Forgot Password?
                                </Link>
                            </form>
                        </div>
                    )
                }
            </Grid>
        </Grid>

    );
};

export default LoginSignUp;
