import React from 'react';
import { Typography, Link, Box, Grid, Grid2, Stack } from '@mui/material';
import './Footer.css';


const Footer = () => {
    return (
        <div className="footer-container" sx={{padding:"10px 10px" }}>
            <Box sx={{ backgroundColor: '#211835', color: "white", padding: '40px 20px' }}>
                <Grid2 container spacing={4} sx={{ justifyContent: "space-between", padding:"25px, height: 260px;"}}>
                    <Grid2 item xs={12} md={3}>
                        <Typography variant="h6" gutterBottom>  
                            <Typography variant="h6" sx={{ color: 'White' }}> G a m e H o s t</Typography>
                             Manage your gaming competition the way
                            <Typography variant="h6">you want</Typography>
                        </Typography>
                    </Grid2>
                    <Grid2 item xs={12} md={3}>
                        <Typography variant="h6" gutterBottom>
                            Products
                        </Typography>
                        <Link href="#" color="inherit" underline="hover" className="footer-link">Tournament software</Link><br />
                        <Link href="#" color="inherit" underline="hover" className="footer-link">Website builder</Link><br />
                        <Link href="#" color="inherit" underline="hover" className="footer-link">API</Link><br />
                        <Link href="#" color="inherit" underline="hover" className="footer-link">Platform</Link>
                    </Grid2>
                    <Grid2 item xs={12} md={3}>
                        <Typography variant="h6" gutterBottom>
                            Solutions
                        </Typography>
                        <Link href="#" color="inherit" underline="hover" className="footer-link">Educational organizations</Link><br />
                        <Link href="#" color="inherit" underline="hover" className="footer-link">Agencies</Link><br />
                        <Link href="#" color="inherit" underline="hover" className="footer-link">Game Developers</Link><br />
                        <Link href="#" color="inherit" underline="hover" className="footer-link">Brands</Link><br />
                        <Link href="#" color="inherit" underline="hover" className="footer-link">Tournament Admins</Link>
                    </Grid2>
                    <Grid2 item xs={12} md={3}>
                        <Typography variant="h6" gutterBottom>
                            Legal information
                        </Typography>
                        <Link href="#" color="inherit" underline="hover" className="footer-link">Terms & policies</Link><br />
                        <Link href="#" color="inherit" underline="hover" className="footer-link">Terms of use</Link><br />
                        <Link href="#" color="inherit" underline="hover" className="footer-link">Privacy policy</Link><br />
                        <Link href="#" color="inherit" underline="hover" className="footer-link">Cookies policy</Link>
                    </Grid2>
                </Grid2>
            </Box>
        </div>
    );
};

export default Footer;