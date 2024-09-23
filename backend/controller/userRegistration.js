const express = require('express');
const authController = express.Router();
const User = require('../models/user_Schema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailSender=require('./mail')
const chatStatusModel = require('../models/chat_status_model');

// Sign-Up Route
authController.route('/signup')
    .post(async (req, res) => {
        const { username, firstName, lastName, email, password } = req.body; // Destructure the new fields

        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ Error: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const newUser = new User({
                username,      // Added username
                firstName,     // Added firstName
                lastName,      // Added lastName
                email,
                password: hashedPassword,
            });

            await newUser.save();
            
            const newChatStatusModel = new chatStatusModel({
                email: email,
                status: false,
                socketId: "",
            });
            await newChatStatusModel.save();

            const savedUser = await User.findOne({ email });

            return res.status(201).json({ id: savedUser._id ,username:username,email:email});
        } catch (e) {
            return res.status(400).json({ Error: "Error saving data to Database! " + e });
        }
    });

// Sign-In Route
authController.route('/signin')
    .post(async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ Error: "User not found!" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ Error: "Invalid credentials!" });
            }

            // Generate JWT token with user ID and email
            const token = jwt.sign({ username:user.username,userId: user._id, email: user.email}, 'secret', { expiresIn: '1d' });

            res.cookie('jwt', token, {
                httpOnly: true,
                secure: false,
                maxAge: 1000 * 60 * 60 * 24, 
            });

            return res.status(200).json({ message: 'Success',username:user.username,email:user.email});
        } catch (e) {
            return res.status(400).json({ Error: "Error signing in!" });
        }
    });
    // authController.route('/checkmail').post(async(req,res)=>{
    //     try{
          
    //     const id=mailSender.donation_success(req.body.email,req.body.amount);
    //     return res.status(200).json({id:id});}
    //     catch(error){
    //         console.log(error)
    //     }


    // })

// Fetch All Users Route
authController.route('/logout')
    .get(async (req, res) => {

            res.clearCookie("jwt")
            return res.status(200).json({message:"Successfully logged out"});
    
    });

module.exports = authController;
